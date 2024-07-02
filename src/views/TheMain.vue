<template>
	<!-- <MainBanner></MainBanner> -->
	<hr />

	<MatchList></MatchList>
	<hr />
</template>

<script>
import { ref } from 'vue';
import TheNav from '@/components/TheNav.vue';
import MainBanner from '@/components/MainBanner.vue';
import MatchList from '@/components/MatchList.vue';
export default {
	components: { MainBanner, MatchList },
	setup() {
		return {};
	},
};
</script>

<style></style>
