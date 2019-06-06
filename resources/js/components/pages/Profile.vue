<template>
	<div>
		<div class="container">
		    <div class="row profile">
				<div class="col-md-3">
					<div class="profile-sidebar">
						<!-- SIDEBAR USERPIC -->
						<div class="profile-userpic">
							<img :src="'../storage/avatars/' + user.avatar" class="img-responsive" alt="">
						</div>
						<!-- END SIDEBAR USERPIC -->
						<!-- SIDEBAR USER TITLE -->
						<div class="profile-usertitle">
							<div class="profile-usertitle-name">
								{{user.name}}
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
						<!-- END SIDEBAR BUTTONS -->
						<!-- SIDEBAR MENU -->
						<div v-if="authUser.id === user.id" class="profile-usermenu">
							<ul class="nav">
								<li class="active">
									<a href="#">
									<i class="glyphicon glyphicon-home"></i>
									Overview </a>
								</li>
								<li>
									<router-link :to="{path:'/user/' + authUser.id + '/edit'}">
									<i class="glyphicon glyphicon-user"></i>
									Account Settings </router-link>
								</li>
								<li>
									<a href="#" target="_blank">
									<i class="glyphicon glyphicon-ok"></i>
									Tasks </a>
								</li>
								<li>
									<a href="#">
									<i class="glyphicon glyphicon-flag"></i>
									Help </a>
								</li>
							</ul>
						</div>
						<!-- END MENU -->
					</div>
				</div>
				<div class="col-md-9">
					<button type="button" class="btn btn-secondary" @click="following">Following {{user.following}}</button>
					<button type="button" class="btn btn-secondary" @click="followers">Followers {{user.followers}}</button>
		            <div class="profile-content">
					   <Following v-if="status == 'following'"></Following>
					   <Followers v-if="status == 'followers'"></Followers>
		            </div>
				</div>
			</div>
		</div>

		<br>
		<br>
	</div>
</template>

<script>
	import Following from './Following'
	import Followers from './Followers'
	import FollowButton from './FollowButton.vue'
	export default {
		data() {
			return {
				status: 'following',
			}
		},
		methods: {
			following() {
				this.status = 'following'
			},
			followers() {
				this.status = 'followers'
			},
			isFollowing() {
				
				return this.user.isFollowing
			},
			follow(user_id) {
				this.$store.dispatch('followRequest', user_id)
			}

		},
		components: {
			Following,
			Followers,
			FollowButton
		},
		created(){
			
	        this.$store.dispatch( 'loadAuthUser' )
	        this.$store.dispatch( 'loadUser', this.$route.params.id )
	    },
		computed: {
			authUser(){
	          return this.$store.getters.getAuthUser
	        },
	        user(){
	          return this.$store.getters.getUser
	        },
		}
	}
</script>
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
    
.profile-usermenu {
  margin-top: 30px;
}

.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}

.profile-usermenu ul li:last-child {
  border-bottom: none;
}

.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}

.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}

.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}

.profile-usermenu ul li.active {
  border-bottom: none;
}

.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}

/* Profile Content */
.profile-content {
  padding: 20px;
  background: #fff;
  min-height: 460px;
}
</style>
