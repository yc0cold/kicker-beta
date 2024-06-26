<template>
	<!-- <TheNav></TheNav> -->
	<v-app>
		<TheNav></TheNav>
		<hr />
		<!-- <TheMain></TheMain> -->
		<router-view></router-view>
		<!-- <TheMatchDetail></TheMatchDetail> -->
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

export default {
	components: { TheMain, TheNav, TheFooter, TheMatchDetail },
	setup() {
		return {};
	},
};
</script>

<style></style>
