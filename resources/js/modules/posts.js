/*
|-------------------------------------------------------------------------------
| VUEX modules/posts.js
|-------------------------------------------------------------------------------
| The Vuex data store for the posts
*/
 
import PostAPI from '../api/post.js';

export const posts = {
	state: {
		feed: [],
		postsLoadStatus: 0,

        postContent: '',
        commentBody: '',
        replyBody: '',
    },

    actions: {
        
    	loadFeed( context ){
            context.commit( 'setPostsLoadStatus', 1 );

            PostAPI.getFeed()
            .then( function( response ){
                context.commit( 'setFeed', response.data );
                context.commit( 'setPostsLoadStatus', 2 );
            })
            .catch( function(){
                context.commit( 'setFeed', [] );
                context.commit( 'setPostsLoadStatus', 3 );
            }); 
        },
        loadPost( { commit }, data ){
            PostAPI.getPost( data.post_id )
            .then( function( response ){
                commit( 'setPost', response.data )
            })
            .catch( function(){
                commit( 'setPost', {} )
            })
        },
        addPost(context, data) {
            PostAPI.postNewPost(data) 
            .then(response => {
                context.commit('setPost', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        addComment(context, data) {
            PostAPI.postComment(data)
            .then(response => {
                context.commit('setComment', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        addReply(context, data) {
            PostAPI.postReply(data)
            .then(response => {
                context.commit('setReply', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        reactToPost(context, data) {
            PostAPI.postReactionToPost(data)
            .then(response => {
                context.commit('updateReaction', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        reactToComment(context, data) {
            PostAPI.postReactionToComment(data)
            .then(response => {
                context.commit('updateCommentReaction', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        reactToReply(context, data) {
            PostAPI.postReactionToComment(data)
            .then(response => {
                context.commit('updateReplyReaction', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        deletePost(context, post_id){
            PostAPI.deletePost(post_id)
            .then(response => {
                context.commit('deletePost', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteComment(context, comment_id) {
            PostAPI.deleteComment(comment_id)
            .then(response => {
                context.commit('deleteComment', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteReply(context, reply_id) {
            PostAPI.deleteComment(reply_id)
            .then(response => {
                context.commit('deleteReply', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getPostContent(context, post_id) {
            PostAPI.getPost(post_id)
            .then(response => {
                context.commit('setPostContent', response.data.content)
            })
            .catch(error => {
                console.log(error)
            })
        },
        updatePostContent(context, post_id) {
            let content = context.state.postContent
            PostAPI.updatePost(post_id, content)
            .then(response => {
                context.commit('setUpdatedPost', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getCommentBody(context, comment_id) {
            PostAPI.getComment(comment_id)
            .then(response => {
                context.commit('setCommentBody', response.data.body)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getReplyBody(context, reply_id) {
            PostAPI.getComment(reply_id)
            .then(response => {
                context.commit('setReplyBody', response.data.body)
            })
            .catch(error => {
                console.log(error)
            })
        },
        updateCommentBody(context, comment_id) {
            let body = context.state.commentBody
            PostAPI.updateComment(comment_id, body)
            .then(response => {
                context.commit('setUpdatedComment', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        updateReplyBody(context, reply_id) {
            let body = context.state.replyBody
            PostAPI.updateComment(reply_id, body)
            .then(response => {
                context.commit('setUpdatedReply', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
    },

    mutations: {
        setPostsLoadStatus( state, status ){
            state.postsLoadStatus = status
        },

        setFeed( state, feed ){
            state.feed = feed
        },

        setPostLoadStatus( state, status ){
            state.postLoadStatus = status
        },

        setPost( state, post ){
            state.feed.unshift(post)
        },
        setUpdatedPost(state, post) {
            state.feed.find(feedPost => feedPost.id === post.id).content = post.content
        },
        setUpdatedComment(state, comment) {
            state.feed.find(post => post.id === comment.commentable_id).comments.find(feedComment => feedComment.id === comment.id).body = comment.body
        },
        setUpdatedReply(state, reply) {
            state.feed.find(post => post.id === reply.parent_id).comments.find(comment => comment.id === reply.commentable_id).replies.find(feedReply => feedReply.id === reply.id).body = reply.body
        },
        deletePost(state, post) {
            let newFeed = state.feed.filter(feedPost => {
                return feedPost.id != post.id
            })
            state.feed = newFeed
        },
        deleteComment(state, comment) {
            let newComments = state.feed.find(post => post.id === comment.commentable_id).comments.filter(feedComment => {
                return feedComment.id != comment.id
            })
            state.feed.find(post => post.id === comment.commentable_id).comments = newComments
        },
        deleteReply(state, reply) {
            let newReplies = state.feed.find(post => post.id === reply.parent_id).comments.find(comment => comment.id === reply.commentable_id).replies.filter(feedReply => {
                return feedReply.id != reply.id
            })
            state.feed.find(post => post.id === reply.parent_id).comments.find(comment => comment.id === reply.commentable_id).replies = newReplies
        },
        setComment(state, data){
            state.feed.find(post => post.id === data.commentable_id).comments.push(data)
            state.feed.find(post => post.id === data.commentable_id).comment = ""
        },
        setReply(state, data) {
            state.feed.find(post => post.id === data.parent_id).comments.find(comment => comment.id === data.commentable_id).replies.push(data)
            state.feed.find(post => post.id === data.parent_id).comments.find(comment => comment.id === data.commentable_id).reply = ""
        },
        updateReaction(state, post){
            state.feed.find(feedPost => feedPost.id === post.id).likes = post.likes
            state.feed.find(feedPost => feedPost.id === post.id).dislikes = post.dislikes
        },
        updateCommentReaction(state, comment) {
            let post = state.feed.find(feedPost => feedPost.id === comment.commentable_id)
            let feedComment = post.comments.find(feedComment => feedComment.id === comment.id)
            feedComment.likes = comment.likes
            feedComment.dislikes = comment.dislikes
        },
        updateReplyReaction(state, reply) {
            let post = state.feed.find(feedPost => feedPost.id === reply.parent_id)
            let feedComment = post.comments.find(feedComment => feedComment.id === reply.commentable_id)
            let feedReply = feedComment.replies.find(feedReply => feedReply.id === reply.id)
            feedReply.likes = reply.likes
            feedReply.dislikes = reply.dislikes
        },
        setPostContent(state, content) {
            state.postContent = content
        },
        setCommentBody(state, body) {
            state.commentBody = body
        },
        setReplyBody(state, body) {
            state.replyBody = body
        },
        setShowComments(state, post_id) {
            state.feed.find(post => post.id === post_id).commentsShow = true
        },
    },

   getters: {
        getPostsLoadStatus( state ){
          return state.postsLoadStatus
        },

        getFeed( state ){
          return state.feed
        },

        getPostLoadStatus( state ){
          return state.postLoadStatus
        },

        getPost( state ){
          return state.post
        },
        getCommentByPostId: (state) => (post_id) => {
            return state.feed.find(post => post.id === post_id)
        },
        getReplyByComment: (state) => (comment) => {
            let post = state.feed.find(post => post.id === comment.commentable_id)
            return post.comments.find(feedComment => feedComment.id === comment.id)
        },
        getPostContent( state ) {
            return state.postContent
        },
        getCommentBody(state) {
            return state.commentBody
        },
        getReplyBody(state) {
            return state.replyBody
        },
    }
}