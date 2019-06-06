<template>
	<div class="container w-25">
		<validation-errors :errors="validationErrors" v-if="validationErrors"></validation-errors>
		<form action="#" @submit.prevent="register">

			<div class="form-group">
				<label for="name">Name:</label>
				<input type="text" name="name" id="name" class="form-control" placeholder="Enter Your Name" v-model="name" required autofocus>
			</div>

			<div class="form-group">
				<label for="emai">Email:</label>
				<input type="email" name="email" id="email" class="form-control" placeholder="Enter email" v-model="email" required autofocus>
			</div>

			<div class="form-group">
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" class="form-control" placeholder="Enter Passowrd" v-model="password" required autofocus>
			</div>

			<div class="form-group">
				<label for="password">Password Confirmation:</label>
				<input type="password" name="password" id="password_confirmation" class="form-control" placeholder="reenter password" v-model="password_confirmation" required autofocus>
			</div>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">Create Account</button>
			</div>
		</form>
	</div>
</template>

<script>
import ValidationErrors from '../validationErrors.vue'
export default {
	components: {
		'validation-errors': ValidationErrors
	},
	name: 'register',
	data() {
		return {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		}
	},
	methods: {
		register() {
			this.$store.dispatch('register', {
				name: this.name,
				email: this.email,
				password: this.password,
				password_confirmation: this.password_confirmation,
			})
			.then(response => {
				this.$router.push({ name: 'home'})
			})
		}
	},
	computed: {
		validationErrors() {
			return this.$store.getters.getValidationErrors
		}
	}
}
</script>