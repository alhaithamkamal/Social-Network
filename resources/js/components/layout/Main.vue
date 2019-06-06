<template>
  <div>
    <div v-if="isLoggedIn">
      <Nav ></Nav>
    </div>
    <div>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Nav from './Nav.vue'

export default {
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
  },
  components: {
    'Nav': Nav
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
} 
</style>