import { APP_CONFIG } from '../config.js';

export const requests = {

	state: {
        notifications: [],
        unreadNotifications: [],
	},

	actions: {
		loadNotification(context) {
            axios.get( APP_CONFIG.API_URL + '/notifications')
            .then(response => {
                context.commit('setNotifications', response.data)
            })
        },
        loadUnreadNotification(context) {
            axios.get( APP_CONFIG.API_URL + '/notifications/unread')
            .then(response => {
                context.commit('setUnreadNotifications', response.data)
            })
        },
        markAllAsRead(context) {
            axios.post( APP_CONFIG.API_URL + '/notifications/markasread')
            .then(response => {
                context.commit('setUnreadNotifications', response.data)
            })
        },
	},

	mutations: {
		setNotifications(state, notifications) {
            state.notifications = notifications
        },
        setUnreadNotifications(state, unreadNotifications) {
            state.unreadNotifications = unreadNotifications
        },

	},

	getters: {
        getNotifications(state) {
            return state.notifications
        },
        getUnreadNotifications(state) {
            return state.unreadNotifications
        }
	}
}