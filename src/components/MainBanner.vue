<template>
	<v-container class="main-container">
		<div class="banner_frame">
			<v-row>
				<v-col cols="12">
					<v-carousel
						class="custom-carousel"
						height="400"
						cycle
						hide-delimiter-background
						:show-arrows="false"
					>
						<v-carousel-item
							v-for="(image, index) in bannerImages"
							:key="index"
							class="carousel-item"
						>
							<v-img :src="image" class="rounded-lg"></v-img>
						</v-carousel-item>
					</v-carousel>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const bannerImages = ref([
			'/src/assets/main_banner/KICKER BETA OPEN.png',
			'/src/assets/main_banner/beta_open2.png',
		]);
		return { bannerImages };
	},
};
</script>

<style scoped>
.main-container {
	margin-top: 10px;
}
.banner_frame {
	width: auto;
	max-height: 600px;
	background-color: #f2f2f2;
}
.custom-carousel {
}
.carousel-item {
	display: flex;
	justify-content: center;
	align-items: center;
}
.carousel-item .v-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
