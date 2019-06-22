<template>
	<div class=" card-inner">
      <div class="card-body">
          <div class="row">
              <div class="col-md-2">
                  <img :src="'../storage/avatars/' + reply.user.avatar" class="profile-photo-md pull-left"/>
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
</template>
<script>
	export default {
		props: ['reply', 'authUser'],
		methods: {
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
	      deleteReply(reply_id) {
	        this.$store.dispatch('deleteReply', reply_id)
	      },  
	      getReplyBody(reply_id) {
	        this.$store.dispatch('getReplyBody', reply_id)
	      },
	      updateReplyBody(reply_id) {
	        this.$store.dispatch('updateReplyBody', reply_id)
	      },
	    },
	    computed: {
	    	updatedReplyBody: {
	          get() {
	            return this.$store.getters.getReplyBody
	          },
	          set(value) {
	            return this.$store.commit('setReplyBody', value)
	          }
	        },
	    }
	}
</script>