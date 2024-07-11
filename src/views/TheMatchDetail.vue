<template>
	<div>
		<v-container v-if="match" class="main-container">
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
									<v-icon class="mr-2">mdi-account-group</v-icon
									>{{ match.maxPlayers }} players
								</v-col>
								<v-col cols="6">
									<v-icon class="mr-2">mdi-soccer</v-icon>All level
								</v-col>
								<v-col cols="6">
									<v-icon class="mr-2">mdi-gender-male-female</v-icon
									>{{
										match.sex == 'M'
											? 'Men Only'
											: match.sex == 'F'
												? 'Women Only'
												: 'Co-ed'
									}}
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
									<v-icon class="mr-2">mdi-seat</v-icon
									>{{ match.capacity }} capacity
								</v-col>
								<v-col cols="6">
									<v-icon class="mr-2">mdi-map-marker</v-icon
									>{{ match.addressRoad }}
								</v-col>
								<v-col cols="6">
									<v-icon class="mr-2">mdi-shower</v-icon>Showers
									{{ match.showerRoomYn == 'Y' ? 'available' : 'unavailable' }}
								</v-col>
								<v-col cols="6">
									<v-icon class="mr-2">mdi-parking</v-icon>Parking
									{{ match.parkingLotYn == 'Y' ? 'available' : 'unavailable' }}
								</v-col>
								<v-col cols="6">
									<v-icon class="mr-2">mdi-cup</v-icon>Drinks
									{{ match.drinkSoldYn == 'Y' ? 'sold' : 'unsold' }}
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>

					<!-- Manager Details -->
					<v-card class="pa-4 mt-4">
						<v-card-title class="headline font-weight-bold"
							>Manager Details</v-card-title
						>
						<v-card-text>
							<v-row>
								<v-col cols="1">
									<v-avatar size="40">
										<v-img :src="manager.photo || 'default-avatar.png'"></v-img>
									</v-avatar>
								</v-col>
								<v-col cols="9">
									<div class="manager-name">{{ manager.name }}</div>
									<div class="manager-match-count">
										{{ manager.matchCount }} matches played
									</div>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="10"
									><div class="manager-bio">„ {{ manager.bio }} “</div></v-col
								>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>

				<!-- Join the Match -->
				<v-col v-if="!isMobile" cols="12" md="4" class="d-none d-md-block">
					<v-card class="pa-4">
						<v-card-title class="headline font-weight-bold"
							>Join the Match</v-card-title
						>
						<v-card-text>
							<p>
								Sign up now to secure your spot in the upcoming soccer match.
							</p>
							<h3 class="price">
								€{{ match.price.toString().replace('.', ',') }}
							</h3>
							<p class="caption">Limited spots available, sign up today!</p>
							<v-btn color="black" class="book-now-btn" dark>Sign Up</v-btn>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<!-- Bottom Navigation for Mobile -->
		<div v-if="isMobile" class="mobile-bottom-bar">
			<div class="mobile-bottom-bar-content">
				<span class="font-weight-bold">Secure your spot now!</span>
				<v-btn color="black" class="book-now-btn" dark>Sign Up</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import MainBanner from '@/components/MainBanner.vue';
import BookingDialog from '@/components/BookingDialog.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
	components: { MainBanner, BookingDialog },
	setup() {
		const router = useRoute();
		const match = ref(null);
		const matchId = router.params.id;

		const getMatch = async id => {
			try {
				const response = await axios.get(`/api/getMatchDetail`, {
					params: {
						id: id,
					},
				});
				console.log('response: ', response);
				match.value = response.data;
			} catch (error) {
				console.error('Error fetching match data:', error);
			}
		};

		const isMobile = ref(false);

		const manager = ref({
			name: 'John Doe',
			photo: '', // URL to the manager's photo or empty for default
			matchCount: 15,
			bio: `Hi guys, let's play fun!`,
		});

		const checkIfMobile = () => {
			isMobile.value = window.innerWidth <= 960; // Vuetify's breakpoint for smAndDown
		};

		onMounted(() => {
			checkIfMobile();
			window.addEventListener('resize', checkIfMobile);

			if (matchId) {
				getMatch(matchId);
			} else {
				router.push({
					name: 'TheMain',
				});
			}
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', checkIfMobile);
		});

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
		return {
			match,
			isMobile,
			matchDetail,
			pitchDetail,
			managerDetail,
			manager,
		};
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
/* .manager-info {
	display: flex;
	font-size: 15px;
	height: 100%;
}
.manager-info > span {
	margin-right: 20px;
	height: 100%;
} */
.manager-name {
	font-size: 18px;
	font-weight: bold;
}

.manager-match-count {
	font-size: 14px;
	color: gray;
}

.manager-bio {
	font-size: 14px;
	margin-top: 10px;
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
/* 
@media (min-width: 961px) {
	.mobile-bottom-bar {
		display: none;
	}
}
@media (max-width: 960px) {
	.desktop-join-card {
		display: none;
	}
} */
.mobile-bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: white;
	padding: 10px;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
	z-index: 1000;
	display: flex;
	justify-content: center;
}

.mobile-bottom-bar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	max-width: 1000px;
}

.book-now-btn {
	min-width: 100px;
	min-height: 40px;
	height: 40px;
	background-color: black !important;
}
</style>
