/*
    Imports the API URL from the config.
*/
import { APP_CONFIG } from '../config.js';

export default {

	/*
        GET     /api/v1/myfeed
    */
    getFeed: function() {
        return axios.get( APP_CONFIG.API_URL + '/myfeed')
    },

    getUserFeed: (user_id) => {
    	return axios.get(APP_CONFIG.API_URL + '/user/' + user_id + '/feed')
    },
    /*
	  GET   /api/v1/posts/{post}
	*/
	getPost: function( post_id ) {
	  return axios.get( APP_CONFIG.API_URL + '/posts/' + post_id)
	},
	/*
	  GET   /api/v1/comments/{comment}
	*/
	getComment: function( comment_id ) {
	  return axios.get( APP_CONFIG.API_URL + '/posts/comments/' + comment_id)
	},

	/*
  		POST  /api/v1/posts
	*/
	postNewPost: function( data ) {
		let formData = new FormData()
		if (data.image) { formData.append('image', data.image, data.image.name) }
        if (data.content) { formData.append('content', data.content) }
	  return axios.post( APP_CONFIG.API_URL + '/posts', formData)
	},

	postComment: function( data ) {
		return axios.post(APP_CONFIG.API_URL + '/comments/' + data.post_id, {
				body: data.body
			})
	},

	postReply: function( data ) {
		return axios.post(APP_CONFIG.API_URL + '/replies/' + data.comment_id, {
				body: data.body
			})
	},

	postReactionToPost: function( data ) {
		return axios.post(APP_CONFIG.API_URL + '/posts/reaction/' + data.post_id, {
				action: data.action
			})
	},

	postReactionToComment: function( data ) {
		return axios.post(APP_CONFIG.API_URL + '/comments/reaction/' + data.comment_id, {
				action: data.action
			})
	},

	deletePost: post_id => {
		return axios.delete(APP_CONFIG.API_URL + '/posts/' + post_id )
	},

	deleteComment: comment_id => {
		return axios.delete(APP_CONFIG.API_URL + '/comments/' + comment_id )
	},
	updatePost: (post_id, content) => {
		return axios.put(APP_CONFIG.API_URL + '/posts/' + post_id, {
				content: content
			})
	},
	updateComment: (comment_id, body) => {
		return axios.patch(APP_CONFIG.API_URL + '/comments/' + comment_id, {
				body: body
			})
	},
}
