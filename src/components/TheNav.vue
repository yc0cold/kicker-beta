<template>
	<v-app-bar :elevation="2">
		<template v-slot:prepend>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</template>

		<v-app-bar-title>Kicker-beta</v-app-bar-title>
		<div class="flex-container">
			<button class="nav-menu" @click="goToMain">Home</button>
			<button @click="goToUserGuide" class="nav-menu">
				User Guide
				<!-- <a href="{{ userGuideUrl }}">User Guide</a> -->
			</button>
			<!-- <div class="nav-menu">
				<v-switch label="Switch"></v-switch>
			</div> -->
			<div>
				<button>
					<v-avatar color="info">
						<v-icon icon="mdi-account-circle"></v-icon>
					</v-avatar>
				</button>
			</div>
		</div>
	</v-app-bar>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
	setup() {
		const router = useRouter();
		const goToMain = () => {
			router.push({ name: 'TheMain' });
		};

		const goToUserGuide = () => {
			window.location.href =
				'https://www.notion.so/Footie-f2044095c7f14231be9f67be50492e72';
		};
		return { goToMain, goToUserGuide };
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
</style>
