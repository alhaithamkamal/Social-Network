<template>
	<div class="container w-25">
		<div v-if="errorMessage">
	        <li class="alert alert-danger">{{errorMessage}}</li>
	    </div>
		<form action="#" @submit.prevent="login">
			<div card-body>
				<div class="form-group">
					<label for="email">Email address:</label>
					<input type="email" name="username" id="username" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="username" required autofocus>
					<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				
				<div class="form-group">
					<label for="password">Password:</label>
					<input type="password" name="password" id="password" class="form-control" placeholder="Password" v-model="password" required autofocus>
				</div>
			</div>
				<button type="submit" class="btn btn-primary">Login</button>
		</form>
		<br>
		<div>
			<h4>Or Register</h4>
			<router-link to="/register">Register</router-link>
		</div>

	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		login() {
			this.$store.dispatch('retrieveToken', {
				username: this.username,
				password: this.password
			})
			.then(response => {
				this.$store.dispatch( 'loadAuthUser' )
				this.$router.push('/')
			})
		}
	},
	computed: {
		errorMessage() {
			return this.$store.getters.getErrorMessage
		}
	},
}
</script>