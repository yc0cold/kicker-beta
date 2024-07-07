<template>
	<v-container class="main-container">
		<v-row>
			<v-col cols="12">
				<h1 class="text-center">Upcoming Football Matches</h1>
			</v-col>
		</v-row>
		<v-row class="align-center">
			<v-col cols="1" class="text-center">
				<v-btn icon @click="prevDate">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-col>
			<v-col cols="10" class="text-center">
				<v-row class="no-gutters justify-center">
					<v-col v-for="(date, index) in displayDates" :key="index" cols="auto">
						<v-btn
							:class="{ 'selected-date': date === selectedDate }"
							@click="selectDate(date)"
						>
							<div class="date-btn">
								<div>{{ formatMonth(date) }}</div>
								<!-- {{ formatCalender(date) }} -->
								<div>{{ formatDay(date) }}</div>
							</div>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="1" class="text-center">
				<v-btn icon @click="nextDate">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
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
							<span class="font-weight-bold">{{ match.name }}</span>
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
							<span>{{ formatDate(match.date) }}</span>
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
import axios from 'axios';

export default {
	setup() {
		const router = useRouter();

		const matches = ref([
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
		]);

		const dates = ref([
			'All',
			'20240901',
			'20240902',
			'20240903',
			'20240904',
			'20240905',
			'20240906',
		]);
		const selectedDate = ref(dates.value[0]);
		const displayDates = ref(dates.value.slice(0, 4));

		// const formatCalender = date => {
		// 	if (date.length != 8) {
		// 		return date;
		// 	}
		// 	const options = { month: 'short', day: 'numeric' };
		// 	return new Date(
		// 		date.slice(0, 4),
		// 		date.slice(4, 6) - 1,
		// 		date.slice(6, 8),
		// 	).toLocaleDateString('en-GB', options);
		// };
		const formatMonth = date => {
			if (!date || date.length !== 8) {
				return date;
			}
			const monthNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];
			const month = parseInt(date.slice(4, 6), 10) - 1; // 월은 0부터 시작
			return monthNames[month];
		};

		const formatDay = date => {
			if (!date || date.length !== 8) {
				return '';
			}
			return date.slice(6, 8);
		};

		const formatDate = date => {
			if (!date) {
				return '';
			}
			const year = date.slice(0, 4);
			const month = date.slice(4, 6) - 1; // 월은 0부터 시작
			const day = date.slice(6, 8);
			const hour = date.slice(8, 10);

			const formattedDate = new Date(year, month, day, hour);
			const options = {
				weekday: 'short',
				day: '2-digit',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			};

			return formattedDate.toLocaleDateString('en-US', options);
		};

		const selectDate = async date => {
			selectedDate.value = date;
			console.log('selectDate: ', date);
			const result = await getMatches(date);
			console.log('Matches for selected date: ', result);
			matches.value = result.data;
		};

		const prevDate = () => {
			const index = dates.value.indexOf(selectedDate.value) - 3;
			if (index > 0) {
				selectedDate.value = dates.value[index - 1];
				updateDisplayDates();
			}
		};

		const nextDate = () => {
			const index = dates.value.indexOf(selectedDate.value) + 3;
			if (index < dates.value.length - 1) {
				selectedDate.value = dates.value[index + 1];
				updateDisplayDates();
			}
		};

		const updateDisplayDates = () => {
			const index = dates.value.indexOf(selectedDate.value);
			displayDates.value = dates.value.slice(index, index + 4);
		};

		const getMatches = async date => {
			try {
				const response = await axios.get('/api/getMatches', {
					params: {
						date: date,
					},
				});
				console.log('getMatches response: ', response);

				return response;
				//const result = response.data.length ? response.data[0] : null;
				//console.log('getMatches result: ', result);
			} catch (error) {
				console.error('There was a problem with the axios request:', error);
			}
		};
		//getMatches();
		const bookMatch = id => {
			router.push({
				name: 'TheMatchDetail',
				params: {
					id: id,
				},
			});
		};
		return {
			matches,
			bookMatch,
			dates,
			selectedDate,
			displayDates,
			formatMonth,
			formatDay,
			formatDate,
			selectDate,
			prevDate,
			nextDate,
			getMatches,
		};
	},
};
</script>

<style scoped>
.date-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
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
.selected-date {
	font-weight: bold;
}
</style>
