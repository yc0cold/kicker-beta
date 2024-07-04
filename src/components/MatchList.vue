<template>
	<v-container class="main-container">
		<v-row>
			<v-col cols="12">
				<h1 class="text-center">Upcoming Football Matches</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="(match, index) in matches"
				:key="index"
				cols="12"
				md="6"
				lg="3"
			>
				<v-card class="mx-auto my-2" max-width="400" min-width="300" outlined>
					<v-card-title>
						<div class="d-flex justify-space-between w-100">
							<span class="font-weight-bold">{{ match.venue }}</span>
							<v-chip
								v-if="match.isNew"
								class="ml-2"
								color="green"
								text-color="white"
								label
							>
								New
							</v-chip>
						</div>
					</v-card-title>
					<v-card-subtitle>
						<div class="d-flex justify-space-between w-100">
							<span>{{ match.time }}</span>
							<span class="price">€{{ match.price }} </span>
						</div>
					</v-card-subtitle>
					<v-card-text>
						<div class="d-flex justify-space-between w-100 align-center">
							<span>{{ match.spots }} spots available</span>
							<v-btn
								color="black"
								class="book-now-btn"
								dark
								@click="bookMatch(match.id)"
								>Book Now</v-btn
							>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
	setup() {
		const router = useRouter();

		const matches = [
			{
				id: 1,
				venue: 'Acme Sports Center',
				time: 'Wed, Jun 28, 6:00 PM',
				price: 20,
				spots: 10,
				isNew: true,
			},
			{
				id: 2,
				venue: 'Central Park Field',
				time: 'Thu, Jun 29, 2:00 PM',
				price: 25,
				spots: 8,
				isNew: false,
			},
			{
				id: 3,
				venue: 'Riverside Stadium',
				time: 'Fri, Jun 30, 4:30 PM',
				price: 18,
				spots: 12,
				isNew: true,
			},
			{
				id: 4,
				venue: 'Sunny Sports Complex',
				time: 'Sat, Jul 1, 11:00 AM',
				price: 22,
				spots: 6,
				isNew: false,
			},
			{
				id: 5,
				venue: 'Meadow Park',
				time: 'Sun, Jul 2, 7:00 PM',
				price: 15,
				spots: 14,
				isNew: false,
			},
		];

		const bookMatch = id => {
			router.push({
				name: 'TheMatchDetail',
				params: {
					id: id,
				},
			});
		};
		return { matches, bookMatch };
	},
};
</script>

<style scoped>
.text-center {
	text-align: center;
	font-family: 'Inter', sans-serif;
}
.mx-auto {
	margin-left: auto;
	margin-right: auto;
}
.my-2 {
	margin-top: 8px;
	margin-bottom: 8px;
}
.w-100 {
	width: 100%;
}
.font-weight-bold {
	font-weight: bold;
	font-family: 'Inter', sans-serif;
}
.price {
	font-size: 16px;
	font-weight: bold;
	color: black;
}
v-card-title,
v-card-subtitle,
v-card-text {
	font-family: 'Inter', sans-serif;
}
.book-now-btn {
	min-width: 100px;
	min-height: 40px;
	height: 40px;
	background-color: black !important;
}
.main-container {
	max-width: 1400px;
	margin: 0 auto;
	/* margin-top: 30px; */
	padding-left: 16px;
	padding-right: 16px;
}
</style>
