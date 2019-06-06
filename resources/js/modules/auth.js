import { APP_CONFIG } from '../config.js';

export const auth = {

	state: {
		token: localStorage.getItem('access_token') || null,
		authUser: {},
		user: {},
		message: '',
		errorMessage: '',
		validationErrors: '',
        followingUsers: [],
        followers: [],
	},

	actions: {
		register(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post( APP_CONFIG.API_URL + '/register', {
					name: credentials.name,
					email: credentials.email,
					password: credentials.password,
					password_confirmation: credentials.password_confirmation,
				})
				.then(response => {
					const token = response.data.token
					localStorage.setItem('access_token', token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
					context.commit('retrieveToken', token)
					resolve(response)
				})
				.catch(error => {
					if (error.response.status == 422){
				       context.state.validationErrors = error.response.data.errors;
				     }
					reject(error)
				})
			})
		},
		destroyToken(context) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

			if (context.getters.isLoggedIn) {
				return new Promise((resolve, reject) => {
					axios.post( APP_CONFIG.API_URL + '/logout' )
					.then(response => {
						localStorage.removeItem('access_token')
						context.commit('destroyToken')
						resolve(response)
					})
					.catch(error => {
						localStorage.removeItem('access_token')
						context.commit('destroyToken')
						reject(error)
					})
				})
			}
		},
		retrieveToken(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post( APP_CONFIG.API_URL + '/login', {
					username: credentials.username,
					password: credentials.password
				})
				.then(response => {
					const token = response.data.token
					localStorage.setItem('access_token', token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
					context.commit('retrieveToken', token)
					resolve(response)
				})
				.catch(error => {
					if (error.response.status == 422){
				       context.state.errorMessage = error.response.data.message;
				     }
					reject(error)
				})
			})
		},
		loadAuthUser(context){
            axios.get( APP_CONFIG.API_URL + '/user')
            .then(response => {
                context.commit('setAuthUser', response.data)
                Echo.private('App.User.' + response.data.id)
                .notification((notification) => {
                context.state.notifications.push(notification)
                })
            })
            .catch(error => {
                console.log(error)
            })
        },
        loadUser(context, user_id){
            axios.get( APP_CONFIG.API_URL + '/user/' + user_id)
            .then(response => {
                context.commit('setUser', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        updateUser(context, data) {
        	let formData = new FormData()
			if (data.avatar) { formData.append('avatar', data.avatar, data.avatar.name) }
			formData.append('name', context.state.authUser.name)
			formData.append('email', context.state.authUser.email)
			formData.append('_method', 'PATCH')
        	axios.post(APP_CONFIG.API_URL + '/users/' + data.id, formData)
		    .then(response => {
		    	context.commit('setUser', response.data)
		    	if (response.status == 200){
			       context.state.message = 'Updatd Successfully';
			    }
		    })
		    .catch(error => {
                if (error.response.status == 422){
			       context.state.validationErrors = error.response.data.errors;
			    }
            })
        },
                loadFollowingUsers(context, user_id) {
            axios.get(APP_CONFIG.API_URL + '/user/' + user_id + '/following')
            .then(response => {
                context.commit('setFollowingUsers', response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        },
        loadFollowers(context, user_id) {
            axios.get(APP_CONFIG.API_URL + '/user/' + user_id + '/followers')
            .then(response => {
                context.commit('setFollowers', response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        },
        followRequest(context, user_id) {
            axios.post(APP_CONFIG.API_URL + '/user/follow/' + user_id,)
            .then(response => {
                context.commit('setFollow', response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        },
        unfollowRequest(context, user_id) {
            axios.delete(APP_CONFIG.API_URL + '/user/unfollow/' + user_id)
            .then(response => {
                context.commit('setUnfollow', response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        },
	},
	mutations: {
		retrieveToken(state, token) {
			state.token = token
		},
		destroyToken(state) {
			state.token = null
		},
		setAuthUser( state, user ){
            state.authUser = user
        },
        setUser( state, user ){
            user.followersIds.forEach(id => {
                    if(id === state.authUser.id) {
                        user.isFollowing = true
                    }
                })
            state.user = user
        },
        setUserName(state, value) {
        	state.authUser.name = value
        },
        setUserEmail(state, value) {
        	state.authUser.email = value
        },
        setFollowingUsers(state, data) {
            data.forEach(user => {
                user.followersIds.forEach(id => {
                    if(id === state.authUser.id) {
                        user.isFollowing = true
                    }
                })
            })
            state.followingUsers = data
        },
        setFollowers(state, data) {
            data.forEach(user => {
                user.followersIds.forEach(id => {
                    if(id === state.authUser.id) {
                        user.isFollowing = true
                    }
                })
            })
            state.followers = data
        },
        setFollow(state, user) {
            if(state.followingUsers.find(followingUser => followingUser.id === user.id)){
                state.followingUsers.find(followingUser => followingUser.id === user.id).isFollowing = true
            }
            if(state.followers.find(follower => follower.id === user.id)) {
                state.followers.find(follower => follower.id === user.id).isFollowing = true
            }
            if(state.user.id === user.id) {
                state.user.isFollowing = true
            }
        },
        setUnfollow(state, user) {
            if(state.followingUsers.find(followingUser => followingUser.id === user.id)){
                state.followingUsers.find(followingUser => followingUser.id === user.id).isFollowing = false
            }
            if(state.followers.find(follower => follower.id === user.id)) {
                state.followers.find(follower => follower.id === user.id).isFollowing = false
            }
            if(state.user.id === user.id) {
                state.user.isFollowing = false
            }
        },
	},
	getters: {
		isLoggedIn(state) {
			return state.token !== null
		},
		getAuthUser( state ){
          return state.authUser
        },
        getUser( state ){
          return state.user
        },
        getUserName(state) {
            return state.authUser.name
        },
        getUserEmail(state) {
            return state.authUser.email
        },
        getUserAvatar(state) {
        	return state.authUser.avatar
        },
        getErrorMessage(state) {
        	return state.errorMessage
        },
        getValidationErrors(state) {
        	return state.validationErrors
        },
        getMessage(state) {
        	return state.message
        },
                getFollowingUsers(state) {
            return state.followingUsers
        },
        getFollowers(state) {
            return state.followers
        },
        getIsFollowing: (state) => (user) => {
            let followingUser = state.followingUsers.find(followingUser => followingUser.id === user.id)
            
            return followingUser.isFollowing
        },
        getIsFollowingForFollowers: (state) => (user) => {
            let follower = state.followers.find(follower => follower.id === user.id)
            
            return follower.isFollowing
        },
	}
}