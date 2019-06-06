<template>
	<div class="container">
	  	<div class="row profile">
		    <div class="col-4" v-for="user in followers">
		      <div class="profile-sidebar ">
				<!-- SIDEBAR USERPIC -->
				<div class="profile-userpic">
					<img :src="'../storage/avatars/' + user.avatar" class="img-responsive" alt="user">
				</div>
				<!-- END SIDEBAR USERPIC -->
				<!-- SIDEBAR USER TITLE -->
				<div class="profile-usertitle">
					<div class="profile-usertitle-name">
						<router-link :to="{path:'/user/' + user.id}">{{user.name}}</router-link>
					</div>	
					<div class="profile-usertitle-email">
						{{user.email}}
					</div>
					<div class="profile-usertitle-job">
						...
					</div>
				</div>
				<!-- END SIDEBAR USER TITLE -->
				<!-- SIDEBAR BUTTONS -->
				<div v-if="authUser.id !== user.id" class="profile-userbuttons">
					<FollowButton :user="user" :following="user.isFollowing"></FollowButton>
					<button type="button" class="btn btn-danger btn-sm">Message</button>
				</div>
			  </div>
			  <br>
			</div>
	    </div>
	</div>
</template>

<script>
	import FollowButton from './FollowButton.vue'
	export default {
		components: {
			FollowButton
		},
		created() {
			this.$store.dispatch('loadFollowers', this.$route.params.id)
			this.$store.dispatch( 'loadAuthUser' )
		},
		computed: {
			followers() {
				return this.$store.getters.getFollowers
			},
			authUser(){
	          return this.$store.getters.getAuthUser
	        },
		},
		methods: {
			isFollowing(user) {
				user.followersIds.forEach(id => {
					if(id === this.authUser.id){
						user.isFollowing = true
					}
				})
				return user.isFollowing
			},
			follow(user) {
				this.$store.dispatch('followRequest', user.id).then((res) => {
					user.isFollowing = true
				})
			},
			unfollow(user_id) {
				this.$store.dispatch('unfollowRequest', user_id)
			}
		}
	}
</script>

<style scoped>
<style scoped>
	body {
  background: #F1F3FA;
}

/* Profile container */
.profile {
  margin: 20px 0;
}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  background: #fff;
}

.profile-userpic img {
  float: none;
  margin-left: 20%;
  width: 150px;
  height: 150px;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}


</style>