<template>
	<!-- 상단 네비게이션 바 -->
	<v-app-bar app>
		<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
		<v-toolbar-title class="d-flex align-center" @click="goToMain">
			<span>Kicker</span>
			<span class="beta-text ml-2">beta</span>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon @click="goToLogin">
			<v-icon>mdi-login</v-icon>
		</v-btn>
	</v-app-bar>

	<!-- 네비게이션 드로어 -->
	<v-navigation-drawer v-model="drawer" app temporary>
		<v-list>
			<v-list-item v-for="(item, index) in items" :key="index">
				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
	<!-- <v-app-bar :elevation="2">
		<template v-slot:prepend>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</template>

		<v-app-bar-title>Kicker-beta</v-app-bar-title>
		<div class="flex-container">
			<button class="nav-menu" @click="goToMain">Home</button>
			<button @click="goToUserGuide" class="nav-menu">
				User Guide
			</button>
			<button @click="logout">Log out</button>

			<div v-if="isAuthenticated">
				<button>
					<v-avatar color="info">
						<v-icon icon="mdi-account-circle"> </v-icon>
					</v-avatar>
				</button>
			</div>
			<div v-else>
				<v-btn variant="flat" color="indigo" @click="goToLogin">Login</v-btn>
			</div>
		</div>
	</v-app-bar> -->
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ref, reactive, computed } from 'vue';

export default {
	setup() {
		const isMobile = ref(false);
		const drawer = ref(false);

		const items = [
			{ title: 'Home' },
			{ title: 'Matches' },
			{ title: 'Teams' },
			{ title: 'Contact' },
		];

		const authStore = useAuthStore();
		const { user } = authStore;

		const isAuthenticated = computed(() => authStore.isAuthenticated);
		const router = useRouter();
		const goToMain = () => {
			router.push({ name: 'TheMain' });
		};

		const goToUserGuide = () => {
			window.location.href =
				'https://www.notion.so/Footie-f2044095c7f14231be9f67be50492e72';
		};

		const goToLogin = () => {
			router.push({ name: 'Login' });
		};

		const logout = () => {
			authStore.logout();
			console.log(
				'logout!! & authStore.isAuthenticated',
				authStore.isAuthenticated,
			);
			router.push({ name: 'TheMain' });
		};

		console.log('Nav: isAuthenticated: ', isAuthenticated);
		return {
			drawer,
			items,
			goToMain,
			goToUserGuide,
			goToLogin,
			user,
			isAuthenticated,
			logout,
		};
	},
};
</script>

<style scoped>
.flex-container {
	display: flex;
}
.nav-menu {
	margin: 5px;
	width: 200px;
}

.book-now-btn {
	min-width: 100px;
	min-height: 40px;
	height: 40px;
	background-color: black !important;
}

.beta-text {
	color: grey;
	font-size: 14px;
	margin-left: 8px;
}
</style>
