<template>
	<div class="position-relative">
		<svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
			class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
			preserveAspectRatio="none">
			<path class="wavePath-haxJK1 animationPaused-2hZ4IO"
				d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
				fill="#ff9654"></path>
		</svg>
		<div class="container myPadding">
			<h3>
				Admin - Orders' Statistics
			</h3>

			<canvas id="myChart" width="400" height="200"></canvas>
		</div>
	</div>
</template>

<script>
import { store } from "../../store.js";
// import axios from "axios";
import { initChart } from '../../orderStatistics.js';
export default {
	data() {
		return {
			store,
		}
	},

	components: {

	},

	props: {


	},

	mounted() {
		this.chartInstance = initChart(this.$route.params.monthlySales, this.$route.params.orderCount);
		console.log(this.$route.params.orderCount)
	},

	created() {
		this.store.isFooterVisible = false;
	},

	methods: {

	}
}
</script>

<style lang="scss" scoped>.myPadding {
	padding: 6rem 0;
}</style>