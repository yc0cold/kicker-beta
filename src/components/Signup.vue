<template>
	<v-container class="signup-container">
		<v-row justify="center">
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title class="headline">Sign Up</v-card-title>
					<v-card-text>
						<v-form @submit.prevent="sendVerificationEmail">
							<v-text-field
								v-model="form.email"
								label="Email"
								:disabled="showSignupForm"
								required
								type="email"
							></v-text-field>
							<v-btn v-if="!showSignupForm" type="submit" color="primary"
								>Send Verification Code</v-btn
							>
						</v-form>
						<v-text-field
							v-model="verificationCode"
							label="Verification Code"
							v-if="showVerificationCodeInput"
							required
						></v-text-field>
						<v-btn
							color="primary"
							@click="verifyCode"
							v-if="showVerificationCodeInput"
							>Verify Code</v-btn
						>
						<div v-if="showSignupForm">
							<v-form @submit.prevent="submitForm">
								<v-text-field
									v-model="form.firstname"
									label="First Name"
									:rules="[rules.required]"
									required
								></v-text-field>
								<v-text-field
									v-model="form.lastname"
									label="Last Name"
									:rules="[rules.required]"
									required
								></v-text-field>
								<v-text-field
									v-model="form.password"
									label="Password"
									:rules="[rules.passLength, rules.required]"
									required
									type="password"
								></v-text-field>
								<span class="password-rules"
									>Password must be at least 8 characters long and include at
									least one special character.</span
								>
								<v-text-field
									v-model="form.confirmPassword"
									label="Confirm Password"
									required
									type="password"
								></v-text-field>
								<v-btn type="submit" color="primary">Sign Up</v-btn>
							</v-form>
						</div>
						<div class="login-link">
							<a href="#" @click.prevent="goToLogin"
								>Already have an account? Log in here</a
							>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
	setup() {
		const form = ref({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		});
		const verificationCode = ref('');
		const showVerificationCodeInput = ref(false);
		const showSignupForm = ref(false);

		const rules = ref({
			required: value => !!value || 'Field is required',
			passLength: value =>
				value.length > 6 || 'Password must be longer than 6 digits',
		});
		const router = useRouter();

		const sendVerificationEmail = async () => {
			try {
				await axios.post('/api/send-verification-email', {
					email: form.value.email,
				});
				showVerificationCodeInput.value = true;
				alert('Verification code sent to your email.');
			} catch (error) {
				console.error('Error sending verification email:', error);
			}
		};

		const verifyCode = async () => {
			try {
				const response = await axios.post('/api/verify-code', {
					email: form.value.email,
					code: verificationCode.value,
				});
				if (response.data.success) {
					showSignupForm.value = true;
					showVerificationCodeInput.value = false;
				} else {
					alert('Invalid or expired verification code.');
				}
			} catch (error) {
				console.error('Error verifying code:', error);
			}
		};

		const isPasswordValid = computed(() => {
			const passwordValue = form.value.password;
			const minLength = passwordValue.length >= 8;
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
			return minLength && hasSpecialChar;
		});

		const submitForm = () => {
			if (form.value.password !== form.value.confirmPassword) {
				alert('Passwords do not match!');
				return;
			}
			// 여기서 폼 데이터를 처리하거나 서버에 전송할 수 있습니다.
			console.log('Form submitted:', form.value);

			// 회원가입 후 홈 페이지로 이동
			router.push({ name: 'Home' });
		};

		const goToLogin = () => {
			router.push({ name: 'Login' });
		};

		return {
			form,
			verificationCode,
			showVerificationCodeInput,
			showSignupForm,
			isPasswordValid,
			sendVerificationEmail,
			verifyCode,
			submitForm,
			goToLogin,
			rules,
		};
	},
};
</script>

<style scoped>
.signup-container {
	margin-top: 50px;
}
.login-link {
	margin-top: 20px;
	text-align: center;
}
</style>
