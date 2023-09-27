<template>
    <h3>
        Admin - Orders' Statistics
    </h3>

	<canvas id="myChart" width="400" height="200"></canvas>
   
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";
    import { initChart } from '../../orderStatistics.js';
	export default {
		data() {
			return {
				
				// store
			}
		},

		components: {
           
		},

		props: {
			
			
		},

		mounted () {
			this.chartInstance = initChart(this.$route.params.monthlySales, this.$route.params.orderCount);
			console.log(this.$route.params.orderCount)
		},

		created () {

		},

		methods: {
             
		}
	}
</script>

<style lang="scss" scoped>

</style>