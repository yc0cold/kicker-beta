<template>
	<!-- 상단 네비게이션 바 -->

	<v-app-bar app>
		<v-container class="main-container">
			<v-row>
				<v-col cols="auto" class="d-flex align-center">
					<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
					<v-toolbar-title @click="goToMain" class="ml-2">
						<span>Kicker</span>
						<span class="beta-text ml-2">beta</span>
					</v-toolbar-title>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="auto" class="d-flex align-center">
					<v-btn v-if="!isAuthenticated" icon @click="goToLogin">
						<v-icon>mdi-login</v-icon>
					</v-btn>
					<!-- <v-btn v-if="isAuthenticated" icon @click="">
			<v-icon>mdi-account</v-icon>
		</v-btn> -->
					<v-menu
						v-if="isAuthenticated"
						v-model="menu"
						:close-on-content-click="false"
						location="bottom"
						offset-y
					>
						<template v-slot:activator="{ props }">
							<v-btn icon v-bind="props">
								<v-icon>mdi-account</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="goToProfile">
								<v-list-item-title>My Account</v-list-item-title>
							</v-list-item>
							<v-list-item @click="goToBookings">
								<v-list-item-title>Reservation</v-list-item-title>
							</v-list-item>
							<v-list-item @click="logout">
								<v-list-item-title>Log Out</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-col>
			</v-row>
		</v-container>
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

		const menu = ref(false);

		const goToProfile = () => {
			// 내정보 페이지로 이동하는 로직
			console.log('내정보 페이지로 이동');
		};

		const goToBookings = () => {
			// 예약현황 페이지로 이동하는 로직
			console.log('예약현황 페이지로 이동');
		};

		const logout = () => {
			authStore.logout();
			console.log(
				'logout!! & authStore.isAuthenticated',
				authStore.isAuthenticated,
			);
			menu.value = !menu.value;
			router.push({ name: 'TheMain' });
		};

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

		console.log('Nav: isAuthenticated: ', isAuthenticated);
		return {
			drawer,
			items,
			goToMain,
			goToUserGuide,
			goToLogin,
			goToProfile,
			goToBookings,
			menu,
			user,
			isAuthenticated,
			logout,
		};
	},
};
</script>

<style scoped>
.main-container {
	max-width: 1200px;
	margin: 0 auto;
	/* margin-top: 30px; */
	padding-left: 16px;
	padding-right: 16px;
}

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
