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
import axios from 'axios';
import { reactive } from 'vue';

export default {
	setup(props) {
		const userData = reactive({
			email: '',
			userType: '',
			firstName: '',
			lastName: '',
			picture: '',
		});
		const authStore = useAuthStore();
		const isUser = async () => {
			try {
				const response = await axios.get('/api/getUser', {
					params: {
						email_id: 'yc0cold@gmail.com',
					},
				});
				console.log('getUser response: ', response);
				const result = response.data.length ? response.data[0] : null;
				console.log('getUser result: ', result);
				//executeLogin(result.email_id);
				if (result != null) {
					userData.email = result.email_id;
					userData.userType = result.user_type;
					userData.firstName = result.first_name;
					userData.lastName = result.last_name;
					userData.picture = result.picture;
					console.log('true');
					return true;
				} else {
					console.log('false');
					return false;
				}
			} catch (error) {
				console.error('There was a problem with the axios request:', error);
			}
		};

		const getAllUsers = async () => {
			try {
				const response = await axios.get('/api/getAllUsers');
				console.log('getAllUser response: ', response);
				const result = response.data.length ? response.data[0] : null;
				console.log('getAllUser result: ', result);
			} catch (error) {
				console.error('There was a problem with the axios request:', error);
			}
		};

		const signUp = async userData => {
			try {
				console.log('signUp 내부 진입');
				console.log('userData: ', userData);
				//기존 db에 email_id가 있으면
				// 유저정보 등록
				const response = await axios.post('/api/signUp', userData);
				console.log('reponse: ' + response);
			} catch (error) {
				console.error('There was a problem with the axios request:', error);
			}
		};

		const callback = async response => {
			// This callback will be triggered when the user selects or login to
			// his Google account from the popup
			console.log(response);
			const googleUserData = decodeCredential(response.credential);
			console.log('Handle the userData', googleUserData);
			console.log('Login Email: ', googleUserData.email);
			console.log('Login name: ', googleUserData.name);

			userData.email = googleUserData.email;
			userData.userType = '2'; // Google Login
			userData.firstName = googleUserData.given_name;
			userData.lastName = googleUserData.family_name;
			userData.picture = googleUserData.picture;

			const userExists = await isUser();
			if (userExists) {
				console.log('여기 찍힘?!');
				//router.push({ name: 'TheMain' });
				const authStoreObj = {
					email: userData.email,
					userType: userData.userType,
					firstName: userData.firstName,
					lastName: userData.lastName,
					picture: userData.picture,
				};

				//store에 등록
				authStore.login(authStoreObj);
				console.log('authStore: ', authStore);
				console.log('isAuthenticated: ', authStore.isAuthenticated);
				router.push({ name: 'TheMain' });
			} else {
				console.log('여기 찍힘?');
				signUp(userData);
			}
			//getAllUsers();
			//router.push({ name: 'TheMain' });
		};
		return { callback, isUser };
	},
};
</script>
