<template>
    <div class="my_background position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
		<main class="container">
      <div class="row">
        <div class="d-none d-sm-flex col-4 col-md-6 justify-content-center align-content-center">
          <img src="../../images/success.png" alt="" class="my-auto successDuck">
        </div>
        <div class="container col-12 col-sm-8 col-md-6">
                <div class="printer-top"></div>
                    
                <div class="paper-container">
                    <div class="printer-bottom"></div>

                    <div class="paper">
                    <div class="main-contents">
                        <div class="success-icon">&#10004;</div>
                        <div class="success-title">
                        Pagamento Completato
                        </div>
                        <div class="success-description">
                        Ti ringraziamo per aver ordinato con Deliveboo, il ristorante sta già lavorando per preparare il ordine!
                        </div>
                        <div class="order-details">
                        <div class="order-number-label">Ordine Numero</div>
                        <div class="order-number">{{ store.orderId }}</div>
                        </div>
                        <div class="order-footer">Grazie!</div>
                    </div>
                    <div class="jagged-edge"></div>
                    </div>
                </div>
            </div>
          </div>
		</main>
    </div>
</template>

<script>
	import {store} from "../../store.js";
	// import axios from "axios";

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

		mounted () {

		},

		created () {

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as *;

.successDuck{
  width: 80%;
}
@media (max-width: 991px) {
  .successDuck{
  width: 110%;
  }
}
@media (max-width: 767px) {
  .successDuck{
  width: 140%;
  }
}
.my_background{
		background-color: $secondarysoft;
	}

	main{
		height: 800px;
		padding: 3rem 0;
        font-size: 24px;
		.row{
			height: 100%;
		}
	}

    body {
  background: #999;
}

.row .container {
  max-width: 380px;
  margin: 130px auto;
  overflow: hidden;
}

.printer-top {
  z-index: 1;
  border: 6px solid #666666;
  height: 6px;
  border-bottom: 0;
  border-radius: 6px 6px 0 0;
  background: #333333;
}

.printer-bottom {
  z-index: 0;
  border: 6px solid #666666;
  height: 6px;
  border-top: 0;
  border-radius: 0 0 6px 6px;
  background: #333333;
}

.paper-container {
  position: relative;
  overflow: hidden;
  height: 467px;
}

.paper {
  background: #ffffff;
  height: 447px;
  position: absolute;
  z-index: 2;
  margin: 0 12px;
  margin-top: -12px;
  animation: print 1800ms cubic-bezier(0.68, -0.55, 0.265, 0.9);
  -moz-animation: print 1800ms cubic-bezier(0.68, -0.55, 0.265, 0.9);
}

.main-contents {
  margin: 0 12px;
  padding: 24px;
}

// Paper Jagged Edge
.jagged-edge {
  position: relative;
  height: 20px;
  width: 100%;
  margin-top: -1px;
}

.jagged-edge:after {
  content: "";
  display: block;
  position: absolute;
  //bottom: 20px;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient( 45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%), linear-gradient( -45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%);
  background-size: 16px 40px;
  background-position: 0 -20px;
}

.success-icon {
  text-align: center;
  font-size: 48px;
  height: 72px;
  background: #359d00;
  border-radius: 50%;
  width: 72px;
  height: 72px;
  margin: 16px auto;
  color: #fff;
}

.success-title {
  font-size: 22px;
  text-align: center;
  color: #666;
  font-weight: bold;
  margin-bottom: 16px;
}

.success-description {
  font-size: 15px;
  line-height: 21px;
  color: #999;
  text-align: center;
  margin-bottom: 24px;
}

.order-details {
  text-align: center;
  color: #333;
  font-weight: bold;
  .order-number-label {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .order-number {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 48px;
    font-size: 48px;
    padding: 8px 0;
    margin-bottom: 24px;
  }
}

.order-footer {
  text-align: center;
  line-height: 18px;
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #999;
}
@keyframes print {
  0% {
    transform: translateY(-90%);
  }
  100% {
    transform: translateY(0%);
  }
}
@-webkit-keyframes print {
  0% {
    -webkit-transform: translateY(-90%);
  }
  100% {
    -webkit-transform: translateY(0%);
  }
}

@-moz-keyframes print {
  0% {
    -moz-transform: translateY(-90%);
  }
  100% {
    -moz-transform: translateY(0%);
  }
}

@-ms-keyframes print {
  0% {
    -ms-transform: translateY(-90%);
  }
  100% {
    -ms-transform: translateY(0%);
  }
}
</style>