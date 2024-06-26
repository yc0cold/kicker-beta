<template>
	<MainBanner></MainBanner>
	<hr />

	<!-- Pitch Detail -->
	<div style="margin-left: 40px; margin-right: 40px">
		<div class="pitch-info">
			<div style="font-size: 30px; font-weight: bold; margin-bottom: 10px">
				Pitch Info
			</div>
			<ul class="no_dot">
				<li>📍 {{ pitchDetail.location }}</li>
				<li>
					🥅 <span>{{ pitchDetail.size }}</span>
				</li>
				<li>🚗 Parking</li>
				<!-- <li>🚽 {{ pitchDetail.isToilet }}</li> -->
				<li>🚿 Shower</li>
			</ul>
		</div>
	</div>

	<hr />
	<!-- Manager Detail -->
	<div style="margin-left: 40px; margin-right: 40px">
		<div class="">
			<div style="font-size: 20px; font-weight: bold; margin-bottom: 10px">
				Match's manager
			</div>
			<div class="manager-info">
				<span>{{ managerDetail.name }}</span>
				<span>{{ managerDetail.matchCount }} matches</span>
			</div>
		</div>
	</div>

	<hr />
	<!-- Price Detail -->
	<div style="margin-left: 40px; margin-right: 40px">
		<div class="booking_bar">
			<div>{{ matchDetail.date }}</div>
			<div class="match-join-div-2">
				<div class="pitch-name">
					{{ matchDetail.name }}
				</div>
				<div class="pitch-location">
					{{ matchDetail.location }}
				</div>
			</div>
			<div><BookingDialog :matchDetail="matchDetail"></BookingDialog></div>
			<!-- <div><button class="match-join-button">Join</button></div> -->
		</div>
	</div>
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
