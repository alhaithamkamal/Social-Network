<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{path:'/user/' + authUser.id}"> <img class="profile-img" :src="'../storage/avatars/' + authUser.avatar" alt="Profile"></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="dropdown">
            <button type="button" id="notifications" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Notifications <span class="badge badge-danger" v-show="unreadNotifications.length">{{unreadNotifications.length}}</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="notificationsMenu" id="notificationsMenu" >
                <li class="dropdown-header" v-for="notification in notifications"><router-link :to="{path:'/user/' + notification.data.follower_id}">{{notification.data.follower_name}} has followed you</router-link> </li>
                <small> <a href="#" @click.prevent="markAllAsRead">Mark all as read</a></small>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Something</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>              
              <router-link class="dropdown-item" to="/logout">Logout</router-link>
            </div>
          </li>
        </ul>
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
	</div>
</template>
<script>
  export default {
    created() {
      this.$store.dispatch('loadAuthUser')
      this.$store.dispatch('loadNotification')
      this.$store.dispatch('loadUnreadNotification')
    },
    computed: {
      authUser(){
        return this.$store.getters.getAuthUser
      },
      notifications() {
        return this.$store.getters.getNotifications
      },
      unreadNotifications() {
        return this.$store.getters.getUnreadNotifications
      }
    },
    methods: {
      markAllAsRead() {
        this.$store.dispatch('markAllAsRead');
      }
    },
  }
</script>

<style>
.profile-img{
    margin-left: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>