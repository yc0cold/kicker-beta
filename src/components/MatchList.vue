<template>
	<v-container class="main-container">
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
								<!-- <div>{{ formatMonth(date) }}</div> -->
								<div :class="getDayClass(formatWeekDay(date))">
									{{ formatDay(date) }}
								</div>
								<div :class="getDayClass(formatWeekDay(date))">
									{{ formatWeekDay(date) }}
								</div>
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
			<v-col cols="12" class="text-center" v-if="matches.length === 0">
				<div class="no-matches">
					<v-icon color="grey" size="64">mdi-calendar-remove</v-icon>
					<p>No matches available on this date. Check other dates!</p>
				</div>
			</v-col>
			<v-col
				v-for="(match, index) in matches"
				:key="index"
				cols="12"
				md="6"
				lg="4"
			>
				<v-card class="mx-auto my-2" max-width="400" min-width="300" outlined>
					<v-card-title>
						<div class="d-flex justify-space-between w-100">
							<span class="font-weight-bold">{{ match.fieldName }}</span>
							<v-chip
								v-if="match.newYn == 'Y'"
								class="ml-2"
								color="green"
								variant="flat"
								text-color="white"
								label
							>
								NEW
							</v-chip>
						</div>
					</v-card-title>
					<v-card-text>
						<div class="d-flex justify-space-between w-100">
							<span class="timestamp">{{ formatDate(match.date) }}</span>
							<!-- <span class="price"
								>€{{ match.price.toString().replace('.', ',') }}
							</span> -->
						</div>
						<div class="address">
							<a :href="match.mapUrl" target="_blank">{{
								match.addressRoad
							}}</a>
							, Hamburg
						</div>
						<div class="d-flex justify-space-between w-100 align-center">
							<div class="spots">
								<span
									><v-icon class="mr-2">mdi-gender-male-female</v-icon
									>{{
										match.sex == 'M'
											? 'Men Only'
											: match.sex == 'F'
												? 'Women Only'
												: 'Co-ed'
									}}</span
								>
								<span> · {{ match.matchType }}</span>
								<span v-if="match.spots < 5">{{ match.spots }} spots left</span>
							</div>
							<v-btn
								color="black"
								class="book-now-btn"
								dark
								@click="bookMatch(match.matchId)"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
	setup() {
		const router = useRouter();

		const matches = ref([]);

		const dates = ref([
			'20240901',
			'20240902',
			'20240903',
			'20240904',
			'20240905',
			'20240906',
			'20240907',
			'20240908',
		]);

		const selectedDate = ref(dates.value[0]);
		const displayDates = ref(dates.value.slice(0, 7));

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

		const getDayClass = day => {
			return {
				'red-text': day === 'Sat' || day === 'Sun',
			};
		};

		const formatDay = date => {
			if (!date || date.length !== 8) {
				return date;
			}
			return date.slice(6, 8);
		};

		const formatWeekDay = dateString => {
			if (!dateString || dateString.length !== 8) {
				return '';
			}
			const year = dateString.slice(0, 4);
			const month = dateString.slice(4, 6) - 1; // 월은 0부터 시작
			const day = dateString.slice(6, 8);

			const date = new Date(year, month, day);

			// 요일 이름 배열
			const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

			// Date 객체의 getDay() 메서드로 요일 인덱스 가져오기
			const weekdayIndex = date.getDay();

			return weekdays[weekdayIndex];
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
			const index = dates.value.indexOf(selectedDate.value) - 1;
			if (index < 0) {
				return;
			}
			if (selectedDate.value == displayDates.value[0]) {
				displayDates.value = dates.value.slice(
					index,
					index + displayDates.value.length,
				);
			}

			selectedDate.value = dates.value[index];
			selectDate(selectedDate.value);
		};

		const nextDate = () => {
			const index = dates.value.indexOf(selectedDate.value) + 1;
			if (index > dates.value.length - 1) {
				return;
			}
			if (
				selectedDate.value == displayDates.value[displayDates.value.length - 1]
			) {
				displayDates.value = dates.value.slice(
					index - displayDates.value.length + 1,
					index + 1,
				);
			}
			selectedDate.value = dates.value[index];
			selectDate(selectedDate.value);
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

		onMounted(() => {
			selectDate('20240901'); // 페이지 로드 시 처음으로 호출
		});

		return {
			matches,
			bookMatch,
			dates,
			selectedDate,
			displayDates,
			formatMonth,
			formatDay,
			formatWeekDay,
			formatDate,
			selectDate,
			prevDate,
			nextDate,
			getMatches,
			getDayClass,
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
	margin-left: 10px;
	margin-right: 10px;
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
.timestamp {
	font-size: 16px;
	color: black;
}
.price {
	font-size: 16px;
	font-weight: bold;
	color: black;
}
.address {
	margin-top: 10px;
	margin-bottom: 10px;
}
v-card-title,
v-card-subtitle,
v-card-text {
	font-family: 'Inter', sans-serif;
}
.spots {
	flex: 1 1 60%;
}
.book-now-btn {
	flex: 1 1 40%;
	min-width: 100px;
	min-height: 40px;
	height: 40px;
	background-color: black !important;
}
.main-container {
	max-width: 1200px;
	margin: 0 auto;
	/* margin-top: 30px; */
	padding-left: 16px;
	padding-right: 16px;
}
.selected-date {
	font-weight: bold;
	background-color: lightgrey;
}
.red-text {
	color: red;
}
.map-link {
	color: blue;
	text-decoration: underline;
	cursor: pointer;
}
.no-matches {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 200px;
	color: grey;
	font-size: 18px;
}

.no-matches p {
	margin-top: 10px;
}
</style>
