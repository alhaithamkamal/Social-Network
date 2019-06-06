<template>
  <div>
    <div v-if="isLoggedIn">
      <Nav ></Nav>
    </div>
    <div>
      <router-view :key="$route.fullPath"></router-view>
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