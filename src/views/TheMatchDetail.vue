<template>
	<v-container class="main-container">
		<!-- 상단 이미지 및 제목 -->
		<v-row>
			<v-col cols="12">
				<v-img
					src="https://via.placeholder.com/1200x400.png?text=Soccer+Match"
					aspect-ratio="2.5"
					class="mb-4"
				>
					<v-row class="fill-height">
						<v-col
							class="d-flex align-center justify-center"
							cols="12"
							style="background: rgba(0, 0, 0, 0.4)"
						>
							<div class="text-center text-white">
								<h1 class="display-2 font-weight-bold">Soccer Match</h1>
								<h2 class="subtitle-1">
									Join us for an exciting soccer match!
								</h2>
							</div>
						</v-col>
					</v-row>
				</v-img>
			</v-col>
		</v-row>

		<!-- 경기 상세 정보 -->
		<v-row>
			<!-- Match Details -->
			<v-col cols="12" md="8">
				<v-card class="pa-4">
					<v-card-title class="headline font-weight-bold"
						>Match Details</v-card-title
					>
					<v-card-text>
						<v-row>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-account-group</v-icon>12 players
							</v-col>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-football</v-icon>Intermediate
							</v-col>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-gender-male-female</v-icon>Co-ed
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>

				<!-- Venue Details -->
				<v-card class="pa-4 mt-4">
					<v-card-title class="headline font-weight-bold"
						>Venue Details</v-card-title
					>
					<v-card-text>
						<v-row>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-seat</v-icon>2,500 capacity
							</v-col>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-map-marker</v-icon>123 Main St, Anytown
								USA
							</v-col>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-shower</v-icon>Showers available
							</v-col>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-parking</v-icon>Free parking
							</v-col>
							<v-col cols="6">
								<v-icon class="mr-2">mdi-cup</v-icon>Drinks sold
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- Join the Match -->
			<v-col cols="12" md="4">
				<v-card class="pa-4">
					<v-card-title class="headline font-weight-bold"
						>Join the Match</v-card-title
					>
					<v-card-text>
						<p>Sign up now to secure your spot in the upcoming soccer match.</p>
						<h3 class="price">$20</h3>
						<p class="caption">Limited spots available, sign up today!</p>
						<v-btn color="black" class="book-now-btn" dark>Sign Up</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { reactive, ref } from 'vue';
import MainBanner from '@/components/MainBanner.vue';
import BookingDialog from '@/components/BookingDialog.vue';
export default {
	components: { MainBanner, BookingDialog },
	setup() {
		const matchDetail = reactive({
			id: 1001,
			name: 'Wandsbek', // pitch name
			date: '25.06.2024',
			matchType: '5 vs 5',
			language: 'English',
			maxBookingNum: 18,
			currentBookingNum: 10,
			price: 10,
			location: 'bundesStrase',
		});
		const pitchDetail = reactive({
			id: 1001,
			photo: ['url1', 'url2', 'url3'],
			location: 'bundesStrase',
			size: '35m x 24m',
			isParkinglot: true,
			isIndoor: false,
			isToilet: true,
			isShowerroom: true,
		});

		const managerDetail = reactive({
			name: 'YC',
			language: ['English', 'German'],
			matchCount: 5,
			rating: 5,
		});
		return { matchDetail, pitchDetail, managerDetail };
	},
};
</script>

<style>
.no_dot {
	list-style-type: none;
	padding-left: 0px;
}
.pitch-info > ul > li {
	display: inline-block;
	font-size: 15px;
	position: relative;
	height: 100%;
	width: 50%;
}
.manager-info {
	display: flex;
	font-size: 15px;
	height: 100%;
}
.manager-info > span {
	margin-right: 20px;
	height: 100%;
}
.booking_bar {
	display: flex;
	align-items: center;
	background-color: antiquewhite;
	margin-bottom: 10px;
	flex-direction: row;
	justify-content: space-around;
	font-size: 20px;
	text-align: center;
}
.match-join-div-1 {
}
.match-join-div-2 {
}
.match-join-div-2 .pitch-name {
}
.match-join-div-2 .pitch-location {
	font-size: 15px;
	color: grey;
}
.match-join-button {
	background-color: white;
	font-size: 15px;
	padding: 7px 25px;
	border-radius: 4px;
	border: 2px solid #04aa6d; /* Green */
}
.match-join-button:hover {
	background-color: #04aa6d; /* Green */
	color: white;
}
</style>
