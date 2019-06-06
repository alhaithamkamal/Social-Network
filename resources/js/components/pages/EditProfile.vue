<template>
	<div>
		<div class="container">
		    <h1>Edit Profile</h1>
		  	<hr>
			<div class="row">
		      <!-- left column -->
		      <div class="col-md-3">
		        <div class="text-center profile-userpic">
		          <img v-if="!loadingImage" :src="'../../storage/avatars/' + authUser.avatar" class="avatar img-circle" alt="avatar" style="border-radios:50%">
		          <img v-if="loadingImage" :src="loadingImage" class="avatar img-circle" alt="avatar" style="max-width:100%;height: 150px;">
		          <h6>Upload a different photo...</h6>
		          
		          <input type="file" class="form-control" @change="onFileSelected" accept="image/*">
		        </div>
		      </div>
		      
		      <!-- edit form column -->
		      <div class="col-md-9 personal-info">
		        <div class="alert alert-info alert-dismissable">
		          <a class="panel-close close" data-dismiss="alert">×</a> 
		          <i class="fa fa-coffee"></i>
		          <validation-errors :errors="validationErrors" v-if="validationErrors"></validation-errors>
		          {{message}}
		        </div>
		        <h3>Personal info</h3>
		        
		        <form class="form-horizontal" role="form">
		          <div class="form-group">
		            <label class="col-lg-3 control-label">Full name:</label>
		            <div class="col-lg-8">
		              <input class="form-control" type="text" v-model="getUserName" required>
		            </div>
		          </div>
		          <div class="form-group">
		            <label class="col-lg-3 control-label">Email:</label>
		            <div class="col-lg-8">
		              <input class="form-control" type="text" v-model="getUserEmail" required>
		            </div>
		          </div>
		          <div class="form-group">
		            <label class="col-md-3 control-label"></label>
		            <div class="col-md-8">
		              <input type="button" class="btn btn-primary" value="Save Changes" @click="update">
		              <span></span>
		              <router-link  :to="{path:'/user/' + authUser.id}">Cancel</router-link>
		            </div>
		          </div>
		        </form>
		      </div>
		  </div>
		</div>
		<hr>
	</div>
</template>
<script>
	import ValidationErrors from '../validationErrors.vue'
	export default {
		components: {
			'validation-errors': ValidationErrors
		},
		created(){
	        this.$store.dispatch( 'loadAuthUser' )
	    },
		data() {
				return {
					loadingImage: null,
					selectedFile: null
				}
			},
		computed: {
			getUserName: {
				get() {
					return this.$store.getters.getUserName
				},
				set(value) {
					return this.$store.commit('setUserName', value)
				}
			},
			getUserEmail: {
				get() {
					return this.$store.getters.getUserEmail
				},
				set(value) {
					return this.$store.commit('setUserEmail', value)
				}
			},
			authUser(){
		      return this.$store.getters.getAuthUser
		    },
		    validationErrors() {
				return this.$store.getters.getValidationErrors
			},
			message() {
				return this.$store.getters.getMessage
			},
		},
		methods: {
			onFileSelected(e) {
				let image = e.target.files[0]
		        let reader = new FileReader()
		        reader.readAsDataURL(image)
		        reader.onload = e => {
		          this.loadingImage = e.target.result
		        }
		        this.selectedFile = image
			},
			update(){
				this.$store.dispatch('updateUser', {
					id: this.authUser.id,
					avatar: this.selectedFile
				})
			}
		}
	}
</script>
<style>
.profile-userpic img {
  float: none;
  width: 150px;
  height: 150px;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}	
</style>