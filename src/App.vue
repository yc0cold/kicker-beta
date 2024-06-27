<template>
	<!-- <TheNav></TheNav> -->
	<v-app>
		<TheNav></TheNav>

		<hr />
		<!-- <TheMain></TheMain> -->
		<router-view></router-view>
		<!-- <TheMatchDetail></TheMatchDetail> -->
		<div>fdsf</div>
		<GoogleLogin :callback="callback" />
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
		console.log('client ID:', process.env.VUE_APP_OAUTH_CLIENT);
		const callback = response => {
			// This callback will be triggered when the user selects or login to
			// his Google account from the popup
			console.log('Handle the response', response);
		};

		return { callback };
	},
};
</script>

<style></style>
