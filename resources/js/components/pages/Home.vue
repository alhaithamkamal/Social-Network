<template>
    <div class="container">
        <div class="row">
            <span v-if="postsLoadStatus == 1">Loading</span>
            <span v-if="postsLoadStatus == 3">Posts loaded unsuccessfully!</span>
            <div class="col-md-8">
                  <div class="card gedf-card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
                                    a publication</a>
                            </li> 
                            <li class="nav-item">
                                <a class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="post">post</label>
                                    <textarea class="form-control" id="post" rows="3" placeholder="What are you thinking?" v-model="postContent"></textarea>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                <div class="form-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected" accept="image/*">
                                        <label class="custom-file-label" for="customFile">Upload image</label>
                                        <img v-if="loadingImage" class="img-fluid" :src="loadingImage" alt="Image" style="max-width:100%;height: 150px;">
                                    </div>
                                </div>
                                <div class="py-4"></div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary" @click="addPost">share</button>
                            </div>
                        </div>
                    </div>
                  </div>
                <div class="post-content"  v-for="post in feed" >
                  
                  <div class="post-container">
                    <img :src="'storage/avatars/' + post.user.avatar" alt="user" class="profile-photo-md pull-left">
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
                      <img v-if="post.image" :src="'storage/post_images/' + post.image" alt="post-image" class="img-responsive post-image">
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

                      <div class="card-body" v-for="comment in post.comments">
                        <div class="row">
                            <div class="col-md-2">
                                <img :src="'storage/avatars/' + comment.user.avatar" class="profile-photo-md pull-left"/>
                                <p class="text-secondary float-left ">{{ comment.created_at | moment("from", "now", true) }}</p>
                            </div>
                            <div class="col-md-10">
                                <p>
                                    <div class="btn btn-sm dropleft float-right" v-if="comment.user_id == authUser.id">
                                      <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
                                      </a>
                                      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button class="dropdown-item" type="button" data-toggle="modal"       :data-target="'#exampleModalCenter'+ comment.id" @click="getCommentBody(comment.id)">Edit</button>
                                        <button class="dropdown-item" type="button" @click="deleteComment(comment.id)">Delete</button>
                                      </div>
                                    </div>
                                    <router-link :to="{path:'/user/' + comment.user.id}" class="profile-link">{{comment.user.name}}</router-link>
                                    <a href="#" @click.prevent="dislikeComment(comment.id)" class="btn text-red float-right"><i class="fa fa-thumbs-down"></i> {{comment.dislikes}} </a>
                                    <a href="#" @click.prevent="likeComment(comment.id)" class="btn text-green float-right"><i class="fa fa-thumbs-up"></i> {{comment.likes}} </a>
                               </p>
                               <div class="clearfix"></div>
                               <p>{{ comment.body }}</p>                               
                            </div>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade" :id="'exampleModalCenter'+ comment.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">

                              <div class="modal-body">
                                <textarea class="form-control" v-model= "updatedCommentBody">  </textarea>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="updateCommentBody(comment.id)" data-dismiss="modal">Update</button>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div class=" card-inner"  v-for="reply in comment.replies">
                              <div class="card-body">
                                  <div class="row">
                                      <div class="col-md-2">
                                          <img :src="'storage/avatars/' + reply.user.avatar" class="profile-photo-md pull-left"/>
                                          <p class="text-secondary float-left ">{{ reply.created_at | moment("from", "now", true) }}</p>
                                      </div>
                                      <div class="col-md-10">
                                        <p>
                                            <div class="btn btn-sm dropleft float-right" v-if="reply.user_id == authUser.id">
                                              <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
                                              </a>
                                              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <button class="dropdown-item" type="button" data-toggle="modal"       :data-target="'#exampleModalCenter'+ reply.id" @click="getReplyBody(reply.id)">Edit</button>
                                                <button class="dropdown-item" type="button" @click="deleteReply(reply.id)">Delete</button>
                                              </div>
                                            </div>                                            
                                            <a href="#" @click.prevent="dislikeReply(reply.id)" class="btn text-red float-right"><i class="fa fa-thumbs-down"></i> {{reply.dislikes}} </a>
                                            <a href="#" @click.prevent="likeReply(reply.id)" class="btn text-green float-right"><i class="fa fa-thumbs-up"></i> {{reply.likes}} </a>
                                      </p>
                                          <p><router-link :to="{path:'/user/' + reply.user.id}" class="profile-link">{{reply.user.name}}</router-link></p>
                                          <p> {{reply.body}} </p>
                                      </div>
                                  </div>
                              </div>
                              <!-- Modal -->
                              <div class="modal fade" :id="'exampleModalCenter'+ reply.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                  <div class="modal-content">

                                    <div class="modal-body">
                                      <textarea class="form-control" v-model= "updatedReplyBody">  </textarea>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary" @click="updateReplyBody(reply.id)" data-dismiss="modal">Update</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                        </div>
                        <div class="post-comment">
                          <input type="text" class="form-control" placeholder="Add a reply" v-model="$store.getters['getReplyByComment'](comment).reply" @keyup.enter="addReply(comment)">
                        </div>
                      </div>  
                      <div class="post-comment">
                        <input type="text" class="form-control" placeholder="Add a comment" v-model="$store.getters['getCommentByPostId'](post.id).comment" @keyup.enter="addComment(post.id)">
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        postContent: '',
        selectedFile: null,
        loadingImage: null,
      }
    },
    methods: {
      onFileSelected(event) {
        let image = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = event => {
          this.loadingImage = event.target.result
        }
        this.selectedFile = image
      },
      addPost() {
        this.$store.dispatch('addPost', {
          content: this.postContent,
          image: this.selectedFile
        })
        this.postContent = ''
        this.loadingImage = null
      },
      addComment(post_id) {
        this.$store.dispatch('addComment', {
          body: this.$store.getters['getCommentByPostId'](post_id).comment,
          post_id: post_id
        })
      },
      addReply(comment) {
        this.$store.dispatch('addReply', {
          body: this.$store.getters['getReplyByComment'](comment).reply,
          comment_id: comment.id
        })
      },
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
      likeComment(comment_id){
        this.$store.dispatch('reactToComment', {
          comment_id: comment_id,
          action: 'like'
        })
      },
      dislikeComment(comment_id){
        this.$store.dispatch('reactToComment', {
          comment_id: comment_id,
          action: 'dislike'
        })
      },
      likeReply(reply_id){
        this.$store.dispatch('reactToReply', {
          comment_id: reply_id,
          action: 'like'
        })
      },
      dislikeReply(reply_id){
        this.$store.dispatch('reactToReply', {
          comment_id: reply_id,
          action: 'dislike'
        })
      },
      deletePost(post_id){
        this.$store.dispatch('deletePost', post_id)
      },
      deleteComment(comment_id) {
        this.$store.dispatch('deleteComment', comment_id)
      },
      deleteReply(reply_id) {
        this.$store.dispatch('deleteReply', reply_id)
      },
      getPostContent(post_id) {
        this.$store.dispatch('getPostContent', post_id)
      },
      updatePostContent(post_id) {
        this.$store.dispatch('updatePostContent', post_id)
      },
      getCommentBody(comment_id) {
        this.$store.dispatch('getCommentBody', comment_id)
      },
      updateCommentBody(comment_id) {
        this.$store.dispatch('updateCommentBody', comment_id)
      },
      getReplyBody(reply_id) {
        this.$store.dispatch('getReplyBody', reply_id)
      },
      updateReplyBody(reply_id) {
        this.$store.dispatch('updateReplyBody', reply_id)
      },
    },

    created(){
        this.$store.dispatch( 'loadFeed' )
        this.$store.dispatch( 'loadAuthUser' )
    },

    computed: {
        authUser(){
          return this.$store.getters.getAuthUser
        },
        postsLoadStatus(){
          return this.$store.getters.getPostsLoadStatus
        },

        feed(){
          return this.$store.getters.getFeed
        },
        
        updatedPostContent: {
          get(){
            return this.$store.getters.getPostContent
          },
          set(value){
            return this.$store.commit('setPostContent', value)
          }
        },
        updatedCommentBody: {
          get() {
            return this.$store.getters.getCommentBody
          },
          set(value) {
            return this.$store.commit('setCommentBody', value)
          }
        },
        updatedReplyBody: {
          get() {
            return this.$store.getters.getReplyBody
          },
          set(value) {
            return this.$store.commit('setReplyBody', value)
          }
        },
    },
  }
</script>

<style scoped>

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

.following {
    color: #8dc63f;
    font-size: 12px;
    margin-left: 20px;
} 
.card-inner{
    margin-left: 4rem;
}
@media (min-width: 992px) {
    .gedf-card {
        margin-bottom: 2.77rem;
    }
}
</style>