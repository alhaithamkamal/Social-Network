import Vue from 'vue'
import VueRouter from 'vue-router'
import store   from './store.js'


Vue.use( VueRouter )


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Vue.component( 'Layout', require( './components/layout/Main.vue' ).default ),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Vue.component( 'Home', require( './components/pages/Home.vue' ).default ),
                    meta: {
                        requiresAuth: true,
                    }
                },
                {
                    path: 'user/:id',
                    name: 'profile',
                    component: Vue.component( 'Profile', require( './components/pages/Profile.vue' ).default ),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: 'user/:id/edit',
                    name: 'editProfile',
                    component: Vue.component( 'EditProfile', require( './components/pages/EditProfile.vue' ).default ),
                    meta: {
                        requiresAuth: true,
                    }
                },
                {
                    path: 'posts/:id',
                    name: 'post',
                    component: Vue.component( 'Post', require( './components/pages/Post.vue' ).default )
                },
                {
                    path: 'login',
                    name: 'login',
                    component: Vue.component( 'Login', require( './components/auth/Login.vue' ).default ),
                    meta: {
                        requiresGuest: true,
                    }
                },
                {
                    path: 'register',
                    name: 'register',
                    component: Vue.component( 'Register', require( './components/auth/Register.vue' ).default ),
                    meta: {
                        requiresGuest: true,
                    }
                },
                {
                    path: 'logout',
                    name: 'logout',
                    component: Vue.component( 'Logout', require( './components/auth/Logout.vue' ).default )
                },
            ]
        },
        
    ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    
    if (store.getters.isLoggedIn) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
