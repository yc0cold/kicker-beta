<template>
	<!-- <TheNav></TheNav> -->
	<v-app class="app-container">
		<TheNav></TheNav>
		<v-container class="mt-5">
			<router-view></router-view>
		</v-container>
		<TheFooter></TheFooter>
	</v-app>
</template>

<script>
import { ref } from 'vue';
import TheNav from '@/components/TheNav.vue';
import TheMain from './views/TheMain.vue';

import TheFooter from '@/components/TheFooter.vue';
import TheMatchDetail from './views/TheMatchDetail.vue';

//import TheNav from '../components/TheNav.vue';
import { useAuthStore } from '@/stores/auth';

export default {
	components: { TheMain, TheNav, TheFooter, TheMatchDetail },
	setup() {
		return {};
	},
};
</script>

<style scoped>
.app-container {
}
.mt-5 {
	margin-top: 40px; /* Adjust the value as needed */
}
</style>
