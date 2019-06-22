<template>
	<div class="post-content">                  
      <div class="post-container">
        <img :src="'../storage/avatars/' + post.user.avatar" alt="user" class="profile-photo-md pull-left">
        <div class="post-detail">
          <div class="user-info">
            <h5><router-link :to="{path:'/user/' + post.user.id}" class="profile-link">{{post.user.name}}</router-link> <span class="following">following</span></h5>
            <p class="text-muted">{{  post.created_at | moment("from", "now", true) }}</p>
          </div>
          <div class="reaction">
            <a href="#" @click.prevent="likePost(post.id)" class="btn text-green"><i class="fa fa-thumbs-up"></i> {{post.likes}} </a>
            <a href="#" @click.prevent="dislikePost(post.id)" class="btn text-red"><i class="fa fa-thumbs-down"></i> {{post.dislikes}} </a>
            <div class="btn btn-sm dropleft" v-if="post.user_id == authUser.id">
              <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button data-toggle="modal" :data-target="'#exampleModal'+ post.id" class="dropdown-item" type="button" @click="getPostContent(post.id)">Edit</button>
                <button class="dropdown-item" type="button" @click="deletePost(post.id)">Delete</button>
              </div>
            </div>
          </div>
          
          <div class="line-divider"></div>
          <div class="post-text">
            <p> {{ post.content }} <i class="em em-anguished"></i> <i class="em em-anguished"></i> <i class="em em-anguished"></i></p>
          </div>
          <img v-if="post.image" :src="'../storage/post_images/' + post.image" alt="post-image" class="img-responsive post-image">
          <div class="line-divider"></div>

          

          <!-- Modal -->
          <div class="modal fade" :id="'exampleModal'+ post.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Edit your Post</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <textarea class="form-control" v-model= "updatedPostContent">  </textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="updatePostContent(post.id)" data-dismiss="modal">Update</button>
                </div>
              </div>
            </div>
          </div>
          <div v-for="comment in post.comments">
            <view-comment :comment="comment" :authUser="authUser"></view-comment>
          </div>
          <div class="post-comment">
            <input type="text" class="form-control" placeholder="Add a comment" v-model="$store.getters['getCommentByPostId'](post.id).comment" @keyup.enter="addComment(post.id)">
          </div>
        </div>
      </div>
	</div>
</template>
<script>
import Comment from './Comment.vue'
	export default {
    components: {
      'view-comment': Comment
    },
		props: ['post', 'authUser'],
		methods: {
			likePost(post_id) {
		        this.$store.dispatch('reactToPost', {
		          post_id: post_id,
		          action: 'like'
		        })
		    },
		    dislikePost(post_id) {
		        this.$store.dispatch('reactToPost', {
		          post_id: post_id,
		          action: 'dislike'
		        })
		    },
		    getPostContent(post_id) {
		        this.$store.dispatch('getPostContent', post_id)
		    },
		    deletePost(post_id){
		        this.$store.dispatch('deletePost', post_id)
		    },
		    updatePostContent(post_id) {
		        this.$store.dispatch('updatePostContent', post_id)
		    },
        addComment(post_id) {
            this.$store.dispatch('addComment', {
              body: this.$store.getters['getCommentByPostId'](post_id).comment,
              post_id: post_id
            })
        },
		},
		computed: {
			updatedPostContent: {
        get(){
          return this.$store.getters.getPostContent
        },
        set(value){
          return this.$store.commit('setPostContent', value)
        }
	    },
		}
	}
</script>
<style>
	body{margin-top:20px;}

/*==================================================
  Post Contents CSS
  ==================================================*/

.post-content{
  background: #f8f8f8;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #f1f2f2;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.post-content img.post-image, video.post-video, .google-maps{
  width: 100%;
  height: auto;
}

.post-content .google-maps .map{
  height: 300px;
}

.post-content .post-container{
  padding: 20px;
}

.post-content .post-container .post-detail{
  margin-left: 65px;
  position: relative;
}

.post-content .post-container .post-detail .post-text{
  line-height: 24px;
  margin: 0;
}

.post-content .post-container .post-detail .reaction{
  position: absolute;
  right: 0;
  top: 0;
}

.post-content .post-container .post-detail .post-comment{
  display: inline-flex;
  margin: 10px auto;
  width: 100%;
}

.post-content .post-container .post-detail .post-comment img.profile-photo-sm{
  margin-right: 10px;
}

.post-content .post-container .post-detail .post-comment .form-control{
  height: 30px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  margin: 7px 0;
  min-width: 0;
}

img.profile-photo-md {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

img.profile-photo-sm {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.text-green {
    color: #8dc63f !important;
}

.text-red {
    color: #ef4136 !important;
}

.card-inner{
    margin-left: 4rem;
}
.following {
    color: #8dc63f;
    font-size: 12px;
    margin-left: 20px;
}
@media (min-width: 992px) {
    .gedf-card {
        margin-bottom: 2.77rem;
    }
}
</style>