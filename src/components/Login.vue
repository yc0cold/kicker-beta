<template>
	<div>
		<hr />
		<p>Join Kicker!!</p>

		<v-card
			class="mx-auto pa-12 pb-8"
			elevation="8"
			max-width="448"
			rounded="lg"
		>
			<div class="text-subtitle-1 text-medium-emphasis">Account</div>

			<v-text-field
				density="compact"
				placeholder="Email address"
				prepend-inner-icon="mdi-email-outline"
				variant="outlined"
			></v-text-field>

			<div
				class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
			>
				Password

				<a
					class="text-caption text-decoration-none text-blue"
					href="#"
					rel="noopener noreferrer"
					target="_blank"
				>
					Forgot login password?</a
				>
			</div>

			<v-text-field
				:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
				:type="visible ? 'text' : 'password'"
				density="compact"
				placeholder="Enter your password"
				prepend-inner-icon="mdi-lock-outline"
				variant="outlined"
				@click:append-inner="visible = !visible"
			></v-text-field>

			<v-card class="mb-12" color="surface-variant" variant="tonal">
				<v-card-text class="text-medium-emphasis text-caption"> </v-card-text>
			</v-card>

			<v-btn class="mb-8" color="blue" size="large" variant="tonal" block>
				Log In
			</v-btn>
			<div style="display: block">
				<GoogleLogin :callback="callback" />
			</div>

			<v-card-text class="text-center">
				<a
					class="text-blue text-decoration-none"
					href="#"
					rel="noopener noreferrer"
					target="_blank"
				>
					Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
				</a>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { useAuthStore } from '../stores/auth';
import router from '@/router';

export default {
	setup(props) {
		const authStore = useAuthStore();

		const callback = response => {
			// This callback will be triggered when the user selects or login to
			// his Google account from the popup
			console.log(response);
			const googleUserData = decodeCredential(response.credential);
			console.log('Handle the userData', googleUserData);
			console.log('Login Email: ', googleUserData.email);
			console.log('Login name: ', googleUserData.name);
			const userData = {
				email: googleUserData.email,
				name: googleUserData.name,
			};
			authStore.login(userData);
			console.log('authStore: ', authStore);
			console.log('isAuthenticated: ', authStore.isAuthenticated);

			router.push({ name: 'TheMain' });
		};
		return { callback };
	},
};
</script>
