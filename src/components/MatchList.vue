<template>
	<v-card class="mx-auto" max-width="700" min-width="300">
		<ul class="no_dot">
			<li v-for="matchInfo in matchInfoList" style="margin: 10px">
				<div class="flex-container">
					<div class="match-info-div-1">
						<span>{{ matchInfo.matchTime }}</span>
						<span
							v-if="matchInfo.status === 'new'"
							class="badge text-bg-secondary"
							style="margin-left: 5px"
							>{{ matchInfo.status }}</span
						>
					</div>
					<div class="match-info-div-2" style="flex: 3">
						<div class="pitch-name">
							{{ matchInfo.pitchName }}
						</div>
						<div class="pitch-location">
							{{ matchInfo.pitchLocation }}
						</div>
					</div>
					<div class="match-info-div-3">
						<div>
							<button class="match-join-button">Join</button>
						</div>
						<span class="participants" style="font-size: 15px">10/18</span>
					</div>
				</div>
				<hr />
			</li>
		</ul>
	</v-card>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const matchInfoList = [
			{
				matchTime: '00:00',
				pitchName: 'Alster Lake',
				pitchLocation: 'BundesStrase 17',
				status: 'new',
			},
			{
				matchTime: '02:00',
				pitchName: 'StadtPark',
				pitchLocation: 'BundesStrase 17',
				status: '',
			},
			{
				matchTime: '04:00',
				pitchName: 'Haupbanhof',
				pitchLocation: 'BundesStrase 17',
				status: 'new',
			},
		];
		return { matchInfoList };
	},
};
</script>

<style scoped>
.no_dot {
	list-style-type: none;
	padding-left: 0px;
}
.flex-container {
	display: flex;
	align-items: center;
	margin: 10px;
	flex-direction: row;
}
.flex-container > div {
	width: 500px;
	margin: 10px;
	text-align: center;
	font-size: 20px;
}
.match-info-div-1 {
	flex: 1;
	margin: 10px;
}
.match-info-div-2 {
	flex: 3;
}
.match-info-div-3 {
	flex: 1;
}
.match-info-div-2 .pitch-name {
}
.match-info-div-2 .pitch-location {
	font-size: 15px;
	color: grey;
}
.match-join-button {
	background-color: white;
	font-size: 20px;
	padding: 7px 25px;
	border-radius: 4px;
	border: 2px solid #04aa6d; /* Green */
}
.match-join-button:hover {
	background-color: #04aa6d; /* Green */
	color: white;
}
</style>
