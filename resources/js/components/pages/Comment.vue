<template>
	<div class="card-body">
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

        <div v-for="reply in comment.replies">
        	<view-reply :reply="reply" :authUser="authUser"></view-reply>
        </div>
        
        <div class="post-comment">
          <input type="text" class="form-control" placeholder="Add a reply" v-model="$store.getters['getReplyByComment'](comment).reply" @keyup.enter="addReply(comment)">
        </div>
      </div>  
      
</template>
<script>
import Reply from './Reply.vue'
	export default {
		components: {
			'view-reply': Reply
		},
		props: ['comment', 'authUser'],
		methods: {
			getCommentBody(comment_id) {
		        this.$store.dispatch('getCommentBody', comment_id)
		    },
		    deleteComment(comment_id) {
		        this.$store.dispatch('deleteComment', comment_id)
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
		    updateCommentBody(comment_id) {
		        this.$store.dispatch('updateCommentBody', comment_id)
		    },
		    addReply(comment) {
		        this.$store.dispatch('addReply', {
		          body: this.$store.getters['getReplyByComment'](comment).reply,
		          comment_id: comment.id
		        })
		    },
		},
		computed: {
			updatedCommentBody: {
	          get() {
	            return this.$store.getters.getCommentBody
	          },
	          set(value) {
	            return this.$store.commit('setCommentBody', value)
	          }
	        },
		}
	}
</script>