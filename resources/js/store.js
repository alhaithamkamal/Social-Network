/*
  Adds the promise polyfill for IE 11
*/
require('es6-promise').polyfill();

/*
    Imports Vue and Vuex
*/
import Vue from 'vue'
import Vuex from 'vuex'

/*
    Initializes Vuex on Vue.
*/
Vue.use( Vuex )

/*
    Imports all of the modules used in the application to build the data store.
*/
import  {posts}  from './modules/posts.js'
import  {auth}  from './modules/auth.js'
import 	{requests}  from './modules/requests.js'


/*
  Exports our data store.
*/
export default new Vuex.Store({
    modules: {
    	posts,
    	auth,
    	requests
    }
});