<template>
	<!-- <TheNav></TheNav> -->
	<v-app>
		<TheNav></TheNav>
		<hr />
		<TheMain></TheMain>
	</v-app>
</template>

<script>
import { ref } from 'vue';
import TheNav from '@/components/TheNav.vue';
import TheMain from './views/TheMain.vue';

//import TheNav from '../components/TheNav.vue';

export default {
	components: { TheMain, TheNav },
	setup() {
		return {};
	},
};
</script>

<style></style>
