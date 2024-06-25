<template>
	<MainBanner></MainBanner>
	<hr />
	<MatchList></MatchList>
	<hr />
	<TheFooter></TheFooter>
</template>

<script>
import { ref } from 'vue';
import TheNav from '@/components/TheNav.vue';
import MainBanner from '@/components/MainBanner.vue';
import MatchList from '@/components/MatchList.vue';
import TheFooter from '@/components/TheFooter.vue';
export default {
	components: { MainBanner, MatchList, TheFooter },
	setup() {
		return {};
	},
};
</script>

<style></style>
