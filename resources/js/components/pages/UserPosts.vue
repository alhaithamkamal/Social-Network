<template>
	<div class="container">
		<create-post></create-post>
        <div v-for="post in feed" :key="post.id">
          <view-post :post="post" :authUser="authUser"></view-post>
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
        this.$store.dispatch( 'loadUserFeed', this.$route.params.id)
    },
    props: ['authUser', 'user'],
    computed: {
    	feed(){
          return this.$store.getters.getFeed
        },
    }
}
</script>