<template>
    <div class="container">
        <div class="row">
            <span v-if="postsLoadStatus == 1">Loading</span>
            <span v-if="postsLoadStatus == 3">Posts loaded unsuccessfully!</span>
            <div class="col-md-8">
                <create-post></create-post>
                <div v-for="post in feed" :key="post.id">
                  <view-post :post="post" :authUser="authUser"></view-post> 
                </div>   
            </div>
        </div>
    </div>
</template>

<script>
import CreatePost from './CreatePost.vue'
import Post from './Post.vue'
  export default {
    components: {
      'create-post': CreatePost,
      'view-post': Post,
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
    },
  }
</script>
