<template>
	<v-container>
		<v-dialog max-width="800">
			<template v-slot:activator="{ props: activatorProps }">
				<v-btn
					v-bind="activatorProps"
					color="surface-variant"
					text="Join"
					variant="flat"
				></v-btn>
			</template>

			<template v-slot:default="{ isActive }">
				<v-card class="mx-auto large-dialog">
					<v-img
						height="200px"
						src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
						cover
					></v-img>

					<v-card-title>
						{{ matchDetail.name }}
					</v-card-title>

					<v-card-subtitle> {{ matchDetail.location }} </v-card-subtitle>

					<v-card-actions>
						<v-btn color="orange-lighten-2" text="Match Info"></v-btn>

						<v-spacer></v-spacer>

						<v-btn
							:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
							@click="show = !show"
						></v-btn>
					</v-card-actions>

					<v-expand-transition>
						<div v-show="show">
							<v-divider></v-divider>

							<v-card-text> Play fun </v-card-text>
						</div>
					</v-expand-transition>
					<v-card-actions>
						<v-spacer></v-spacer>
						<div style="margin-right: 10px">
							<span style="font-weight: bold; font-size: larger"
								>{{ matchDetail.price }}€</span
							>
							<span style="color: gray; font-weight: lighter; margin-left: 5px"
								>/ 2 hours</span
							>
						</div>
						<v-btn elevation="2" color="primary" text="Join"></v-btn>
						<v-btn text="Cancel" @click="isActive.value = false"></v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</v-dialog>
	</v-container>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
	props: {
		matchDetail: {
			type: Object,
			default: () => {
				return {
					// id: 1001,
					// name: 'Wandsbek',
					// date: '25.06.2024',
					// matchType: '5 vs 5',
					// language: 'English',
					// maxBookingNum: 18,
					// currentBookingNum: 10,
					// price: 10,
					// location: 'bundesStrase',
				};
			},
		},
	},
	setup() {
		const show = ref(false);
		//const matchDetail = matchDetail;
		//console.log(matchDetail);
		return { show };
	},
};
</script>

<style scoped>
/* .v-application__wrap {
	min-height: 0vh !important;
} */
.large-dialog {
	max-width: 400px !important;
	width: 400px !important;
}
</style>
