<template>
    <div class="position-relative customCursorPage">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo"
            version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <div class="container myPadding px-3 px-sm-0">
            <div class="row px-3 px-sm-0">
                <p class="fw-semibold ms-3">Carrello / <span class="fw-bold">Checkout</span></p>
                <!-- ---Shopping Cart Section--- -->
                <div class="col-12 mb-3 mb-lg-0 col-lg-7 mx-auto cart position-relative">
                    <h2 class="m-3">Carrello</h2>
                    <!-- ---Dishes header--- -->
                    <div class="row d-flex">
                        <div class="col-3 col-md-4 col-lg-6">
                            <h5 class="text-center">Prodotto</h5>
                            <hr>
                        </div>
                        <div class="col">
                            <h5>Quantità</h5>

                        </div>
                        <div class="col ms-3">
                            <h5>Prezzo</h5>

                        </div>
                        <div class="col-1"></div>
                        <div class="col-12"><!-- ---Make sure that it goes on the next line--- --></div>
                        <!-- ---Dishes section--- -->
                        <div class="row" v-for="dish in cart">
                            <div class="col-2 col-md-4 col-lg-6">
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <img :src="dish.photo" :alt="dish.name" class="w-100"
                                            v-if="dish.photo.startsWith('http')">
                                        <img :src="getImageUrl(dish.photo)" :alt="dish.name" class="w-100" v-else>
                                    </div>
                                    <div class="col-12 d-none d-sm-block col-md my-auto ">
                                        <h6 class="my-2">{{ dish.name }}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col my-auto">
                                <input type="number" v-model="dish.quantity" @input="updateTotalPrice(dish)">
                            </div>
                            <div class="col d-flex align-items-center position-relative">
                                <h6 class="d-inline mb-0">$ {{ calculateTotalPrice(dish) }}</h6>
                                <i class="fa-solid fa-xmark position-absolute" @click="removeDish(dish)"></i>
                            </div>
                            <hr class="mt-3 liner">

                        </div>
                        <!-- ---Total and update section--- -->
                        <div class="col-12 spacer"><!-- ---Spacer to avoid bottom overlap of total--- --></div>
                        <div class="row update position-absolute">
                            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div class="row">
                                    <div class="col-8">
                                        <h5 class="d-inline">Subtotale:</h5>
                                        <br>
                                        <h5 class="d-inline">Spedizione:</h5>
                                        <hr>
                                        <h5 class="d-inline">Totale:</h5>
                                    </div>
                                    <div class="col-4 text-end">
                                        <span>$ {{ calculateGrandTotal(cart) }}</span>
                                        <br>
                                        <span>$ {{ shippingCost.toFixed(2) }}</span>
                                        <hr style="color: transparent;">
                                        <span class="fw-semibold">$ {{ finalPrice() }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ---Payment info section--- -->
                <div class="col-12 col-lg-4 mx-auto payment position-relative">
                    <h2 class="m-3 text-white">Checkout</h2>
                    <!-- ---Card data--- -->
                    <div class="row">
                        <div class="col-12">
                            <form class="form">
                                <!-- ---Other Payments buttons--- -->
                                <div class="payment--options">
                                    <button name="paypal" type="button" class="paypal customCursor">
                                        <svg xml:space="preserve" viewBox="0 0 124 33" height="33px" width="124px" y="0px"
                                            x="0px" id="Layer_1" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454  h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z"
                                                fill="#253B80"></path>
                                            <path
                                                d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332  c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031  c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95  c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449  c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301  c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z"
                                                fill="#253B80"></path>
                                            <path
                                                d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425  c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811  c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z"
                                                fill="#253B80"></path>
                                            <path
                                                d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658  h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5  c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454  h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704  C95.809,11.668,95.918,12.292,95.781,13.154z"
                                                fill="#179BD7"></path>
                                            <path
                                                d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332  c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031  c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949  c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449  c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301  c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z"
                                                fill="#179BD7"></path>
                                            <path
                                                d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803  l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z"
                                                fill="#179BD7"></path>
                                            <path
                                                d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1  c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917  c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812  c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183  c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73  c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215  c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
                                                fill="#253B80"></path>
                                            <path
                                                d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55  c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533  c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32  c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622  C24.022,8.286,23.573,7.945,23.048,7.667z"
                                                fill="#179BD7"></path>
                                            <path
                                                d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117  c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605  l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55  c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z"
                                                fill="#222D65"></path>
                                            <path
                                                d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352  c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15  c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392  C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791  l1.454-9.225L9.614,7.699z"
                                                fill="#253B80"></path>
                                        </svg>
                                    </button>
                                    <button name="apple-pay" type="button" class="customCursor">
                                        <svg xml:space="preserve" viewBox="0 0 512 210.2" y="0px" x="0px" id="Layer_1"
                                            version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9  C103.4,10,99.5,19.8,93.6,27.1 M102.3,40.9c-13.9-0.8-25.8,7.9-32.4,7.9c-6.7,0-16.8-7.5-27.8-7.3c-14.3,0.2-27.6,8.3-34.9,21.2  c-15,25.8-3.9,64,10.6,85c7.1,10.4,15.6,21.8,26.8,21.4c10.6-0.4,14.8-6.9,27.6-6.9c12.9,0,16.6,6.9,27.8,6.7  c11.6-0.2,18.9-10.4,26-20.8c8.1-11.8,11.4-23.3,11.6-23.9c-0.2-0.2-22.4-8.7-22.6-34.3c-0.2-21.4,17.5-31.6,18.3-32.2  C123.3,42.9,107.7,41.3,102.3,40.9 M182.6,11.9v155.9h24.2v-53.3h33.5c30.6,0,52.1-21,52.1-51.4c0-30.4-21.1-51.2-51.3-51.2H182.6z   M206.8,32.3h27.9c21,0,33,11.2,33,30.9c0,19.7-12,31-33.1,31h-27.8V32.3z M336.6,169c15.2,0,29.3-7.7,35.7-19.9h0.5v18.7h22.4V90.2  c0-22.5-18-37-45.7-37c-25.7,0-44.7,14.7-45.4,34.9h21.8c1.8-9.6,10.7-15.9,22.9-15.9c14.8,0,23.1,6.9,23.1,19.6v8.6l-30.2,1.8  c-28.1,1.7-43.3,13.2-43.3,33.2C298.4,155.6,314.1,169,336.6,169z M343.1,150.5c-12.9,0-21.1-6.2-21.1-15.7c0-9.8,7.9-15.5,23-16.4  l26.9-1.7v8.8C371.9,140.1,359.5,150.5,343.1,150.5z M425.1,210.2c23.6,0,34.7-9,44.4-36.3L512,54.7h-24.6l-28.5,92.1h-0.5  l-28.5-92.1h-25.3l41,113.5l-2.2,6.9c-3.7,11.7-9.7,16.2-20.4,16.2c-1.9,0-5.6-0.2-7.1-0.4v18.7C417.3,210,423.3,210.2,425.1,210.2z"
                                                id="XMLID_34_"></path>
                                        </svg>
                                    </button>
                                    <button name="google-pay" type="button" class="customCursor">
                                        <svg fill="none" viewBox="0 0 80 39" height="39" width="80"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#5F6368"
                                                d="M37.8 19.7V29H34.8V6H42.6C44.5 6 46.3001 6.7 47.7001 8C49.1001 9.2 49.8 11 49.8 12.9C49.8 14.8 49.1001 16.5 47.7001 17.8C46.3001 19.1 44.6 19.8 42.6 19.8L37.8 19.7ZM37.8 8.8V16.8H42.8C43.9 16.8 45.0001 16.4 45.7001 15.6C47.3001 14.1 47.3 11.6 45.8 10.1L45.7001 10C44.9001 9.2 43.9 8.7 42.8 8.8H37.8Z">
                                            </path>
                                            <path fill="#5F6368"
                                                d="M56.7001 12.8C58.9001 12.8 60.6001 13.4 61.9001 14.6C63.2001 15.8 63.8 17.4 63.8 19.4V29H61V26.8H60.9001C59.7001 28.6 58 29.5 56 29.5C54.3 29.5 52.8 29 51.6 28C50.5 27 49.8 25.6 49.8 24.1C49.8 22.5 50.4 21.2 51.6 20.2C52.8 19.2 54.5 18.8 56.5 18.8C58.3 18.8 59.7 19.1 60.8 19.8V19.1C60.8 18.1 60.4 17.1 59.6 16.5C58.8 15.8 57.8001 15.4 56.7001 15.4C55.0001 15.4 53.7 16.1 52.8 17.5L50.2001 15.9C51.8001 13.8 53.9001 12.8 56.7001 12.8ZM52.9001 24.2C52.9001 25 53.3001 25.7 53.9001 26.1C54.6001 26.6 55.4001 26.9 56.2001 26.9C57.4001 26.9 58.6 26.4 59.5 25.5C60.5 24.6 61 23.5 61 22.3C60.1 21.6 58.8 21.2 57.1 21.2C55.9 21.2 54.9 21.5 54.1 22.1C53.3 22.6 52.9001 23.3 52.9001 24.2Z">
                                            </path>
                                            <path fill="#5F6368"
                                                d="M80 13.3L70.1 36H67.1L70.8 28.1L64.3 13.4H67.5L72.2 24.7H72.3L76.9 13.4H80V13.3Z">
                                            </path>
                                            <path fill="#4285F4"
                                                d="M25.9 17.7C25.9 16.8 25.8 15.9 25.7 15H13.2V20.1H20.3C20 21.7 19.1 23.2 17.7 24.1V27.4H22C24.5 25.1 25.9 21.7 25.9 17.7Z">
                                            </path>
                                            <path fill="#34A853"
                                                d="M13.1999 30.5999C16.7999 30.5999 19.7999 29.3999 21.9999 27.3999L17.6999 24.0999C16.4999 24.8999 14.9999 25.3999 13.1999 25.3999C9.7999 25.3999 6.7999 23.0999 5.7999 19.8999H1.3999V23.2999C3.6999 27.7999 8.1999 30.5999 13.1999 30.5999Z">
                                            </path>
                                            <path fill="#FBBC04"
                                                d="M5.8001 19.8999C5.2001 18.2999 5.2001 16.4999 5.8001 14.7999V11.3999H1.4001C-0.499902 15.0999 -0.499902 19.4999 1.4001 23.2999L5.8001 19.8999Z">
                                            </path>
                                            <path fill="#EA4335"
                                                d="M13.2 9.39996C15.1 9.39996 16.9 10.1 18.3 11.4L22.1 7.59996C19.7 5.39996 16.5 4.09996 13.3 4.19996C8.3 4.19996 3.7 6.99996 1.5 11.5L5.9 14.9C6.8 11.7 9.8 9.39996 13.2 9.39996Z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="separator">
                                    <hr class="line">
                                    <p class="fs-6">o paga con la tua carta</p>
                                    <hr class="line">
                                </div>
                                <!-- ---User credit card info--- -->
                                <div class="credit-card-info--form">
                                    <div class="input_container">
                                        <label for="customer_name" class="input_label fs-6 customCursor3">Nome</label>
                                        <input id="customer_name" class="input_field customCursor2" type="text" name="address"
                                            title="customer_name" placeholder="Deliveboo Food"
                                            v-model="customer_name">
                                    </div>
                                    <div class="input_container">
                                        <label for="address" class="input_label fs-6 customCursor3">Indirizzo di domicilio</label>
                                        <input id="address" class="input_field customCursor2" type="text" name="address" title="address"
                                            placeholder="Via fastfood 21" v-model="customer_address">
                                    </div>
                                    <div class="input_container">
                                        <label for="phone" class="input_label fs-6 customCursor3">Numero di cellulare</label>
                                        <input id="phone" class="input_field customCursor2" type="text" name="phone" title="phone"
                                            placeholder="345 6789012" v-model="phone_number">
                                    </div>
                                </div>

                            </form>
                            <input type="hidden" id="amountInput" :value=amount>
                            <div v-show="cart.length > 0" id="dropin-container"></div>
                            <!-- ---Checkout button--- -->
                            <div class="w-100 align-items-center d-flex">
                                <button id="submit-button" class="purchase--btn mx-auto mb-3 customCursor">Conferma</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";
import { initializeDropin } from '../../dropin.js';
import { router } from '../../router';
export default {
    name: 'CheckOut',


    data() {
        return {
            store,
            resDishes: [],
            cart: [],
            shippingCost: 2,
            grandTotal: 0,
            apiUrl: "http://127.0.0.1:8000/api/",
            cardNumber: "",
            expirationDate: "",
            cvv: "",
            clientToken: "",
            amount: "",
            paymentSuccessful: false,
            restaurant_id: "",
            customer_name: "",
            customer_address: "",
            phone_number: ""
        }
    },


    props: {

    },

    mounted() {
        // --Prendo i dati del cart dallo storage--
        let cartString = localStorage.getItem('cart')
        this.cart = cartString ? JSON.parse(cartString) : []
        store.cart = cartString ? JSON.parse(cartString) : []

        axios.get('http://127.0.0.1:8000/api/getClientToken')
            .then(response => {
                this.clientToken = response.data.clientToken;
                console.log(this.clientToken);
                const dropinInstance = initializeDropin(this.clientToken, this);
                console.log(this.cart);

                this.restaurant_id = this.cart[0].restaurant_id;
                console.log(this.restaurant_id);

            });

    },

    created() {
        this.store.isFooterVisible = true;
    },

    methods: {
        handlePaymentSuccess(response) {
            if (response.data.success === true) {

                this.paymentSuccessful = true;

                axios.post('http://127.0.0.1:8000/api/orders', {
                    total_price: this.amount,
                    customer_name: this.customer_name,
                    customer_address: this.customer_address,
                    phone_number: this.phone_number,
                    restaurant_id: this.restaurant_id,
                    status: this.paymentSuccessful,
                    dishes: this.cart.map(item => item.id),
                    quantities: this.cart.map(item => item.quantity)
                }).then(response => {
                    if (response.status === 200 || response.status === 204) {
                        console.log("ordine riuscito")
                        localStorage.removeItem('cart')
                        this.store.cart = []
                        this.cart = []
                        this.store.dishQuantity = 0
                        this.store.orderId = response.data.success.id
                        router.push({ name: 'success' });
                    }
                    console.log(response)
                })
            }
        },
        addToCart(dish) {
            // Ottenere il carrello dal localStorage come stringa JSON o inizializzarlo come array vuoto se non esiste
            const cartString = localStorage.getItem('cart');
            const cart = cartString ? JSON.parse(cartString) : [];

            // Verifica se l'elemento è già nel carrello
            const existingDish = cart.find(cartDish => cartDish.id === dish.id);

            // Verifica se l'elemento appartiene allo stesso negozio degli altri elementi nel carrello
            if (existingDish && existingDish.restaurant_id !== dish.restaurant_id) {
                alert('Non puoi aggiungere elementi da ristoranti diversi nello stesso carrello.');
                return;
            }

            if (existingDish) {
                // Se l'elemento esiste già nel carrello, aumenta la quantità
                existingDish.quantity += 1;
            } else {
                // Se l'elemento non esiste nel carrello, aggiungilo come oggetto
                cart.push({ id: dish.id, name: dish.name, quantity: 1, price: dish.price, restaurant_id: dish.restaurant_id });
            }

            // Salva il carrello aggiornato nel localStorage come stringa JSON
            localStorage.setItem('cart', JSON.stringify(cart));

            // Assegna il carrello come array a this.cart
            this.cart = cart;
            console.log(this.cart)
            alert('Elemento aggiunto al carrello!');
        },
        // Aggiorna il prezzo totale quando viene cambiato il valore dell'input
        updateTotalPrice(dish) {
            // Assicurati che dish.quantity sia un numero valido
            dish.quantity = parseFloat(dish.quantity);

            // Assicurati che dish.quantity sia maggiore o uguale a 0
            if (isNaN(dish.quantity) || dish.quantity < 1) {
                dish.quantity = 1;
            }

            // Trova l'indice dell'elemento dish all'interno dell'array cart
            const index = this.cart.findIndex(item => item.id === dish.id);

            // Se l'elemento è stato trovato, aggiorna dish.quantity in cart
            if (index !== -1) {
                this.cart[index].quantity = dish.quantity;

                // Aggiorno i piatti al totale del carrello
                store.dishQuantity = 0
                this.cart.forEach(dish => {
                    store.dishQuantity += dish.quantity
                });

                // Salva l'array cart aggiornato nel localStorage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },
        // Rimuovi il piatto dall'array cart
        removeDish(dish) {
            // Trova l'indice dell'elemento dish all'interno dell'array cart
            const index = this.cart.findIndex(item => item.id === dish.id);

            // Se l'elemento è stato trovato, rimuovilo dall'array cart
            if (index !== -1) {
                this.cart.splice(index, 1);

                // Salva l'array cart aggiornato nel localStorage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }

            // Aggiorno i piatti nel totale del carrello
            store.dishQuantity = 0
            this.cart.forEach(dish => {
                store.dishQuantity += dish.quantity
            });
        },
        calculateTotalPrice(dish) {
            return (dish.price * dish.quantity).toFixed(2)
        },
        calculateGrandTotal() {
            this.grandTotal = 0;
            // Calcola il totale sommando i prezzi totali di tutti i piatti
            for (const dish of this.cart) {
                this.grandTotal += dish.price * dish.quantity;
            }
            return this.grandTotal.toFixed(2); // Usiamo toFixed per avere due decimali
        },
        finalPrice() {
            // Calcola il totale finale sommando il GrandTotal e il costo di spedizione
            this.amount = (parseFloat(this.grandTotal) + this.shippingCost).toFixed(2);
            return this.amount;
        },
        getImageUrl(filename) {
            return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
        },

    }
}
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as *;
.customCursorPage {
    background: linear-gradient(40deg, #faca82, white, #faca82);
    cursor: url('../../images/cursor.png'), auto;
    .customCursor{
        &:hover{
            cursor: url('../../images/cursorPointer.png'), auto;
        }
    }
    .customCursor2{
        &:hover{
            cursor: url('../../images/cursorText.png'), auto;
        }
    }
    .customCursor3{
        &:hover{
            cursor: url('../../images/cursor.png'), auto;
        }
    }
}
// ---Shopping cart css---
.cart {
    background-color: $greydark;
    border-radius: 20px;
    min-height: 70vh;

    .row {
        overflow-x: hidden;
        margin-right: -2px;

        hr {
            width: 80vw;
            margin-top: -3px;
        }

        img {
            border-radius: 10px;
        }

        input {
            width: 50%;
            background: transparent;
            border: none;
            border-radius: 5px;
            padding-left: 1rem;
            cursor: url('../../images/cursorPointer.png'), auto;
        }

        i {
            cursor: url('../../images/cursorPointer.png'), auto;
        }

        .liner {
            margin-left: 18px;
        }
    }

    .spacer {
        margin-top: 110px;
    }

    .update {
        bottom: 15px;
        right: 10px;

        .btn {
            background-color: $secondarysoft;
        }
    }
}

// ---Payment info css---

.payment {
    background-color: $primarysoft;
    border-radius: 20px;

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
    }

    .payment--options {
        width: calc(100% - 40px);
        display: grid;
        grid-template-columns: 33% 34% 33%;
        gap: 20px;
        padding: 10px;
    }

    .payment--options button {
        height: 55px;
        background: #F2F2F2;
        border-radius: 11px;
        padding: 0;
        border: 0;
        outline: none;
    }

    .payment--options button svg {
        height: 18px;
    }

    .payment--options button:last-child svg {
        height: 22px;
    }

    .paypal {
        svg {
            margin: -20px;
        }
    }

    .separator {
        width: calc(100% - 20px);
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 10px;
        margin: 0 10px;
    }

    .separator>p {
        word-break: keep-all;
        display: block;
        text-align: center;
        font-weight: 600;
        font-size: 11px;
        margin: auto;
    }

    .separator .line {
        display: inline-block;
        width: 100%;
        height: 1px;
        border: 0;
        background-color: black;
        margin: auto;
    }

    .credit-card-info--form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .input_container {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .split {
        display: grid;
        grid-template-columns: 4fr 2fr;
        gap: 15px;
    }

    .split input {
        width: 100%;
    }

    .input_label {
        font-size: 10px;
        font-weight: 600;
    }

    .input_field {
        width: auto;
        height: 40px;
        padding: 0 0 0 16px;
        border-radius: 9px;
        outline: none;
        background-color: #F2F2F2;
        border: 1px solid #e5e5e500;
        transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    }

    .input_field:focus {
        color: rgba(0, 0, 0, 0.736);
        background-color: var(--bs-body-bg);
        border-color: $primarysoft;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(253, 93, 13, 0.25);
    }

    .purchase--btn {
        height: 50px;
        width: 200px;
        background: white;
        border-radius: 11px;
        border: 0;
        margin-top: 2rem;
        outline: none;
        color: white;
        font-size: 13px;
        font-weight: 700;
        background: linear-gradient(180deg, $primarydark 0%, $primary 50%, $primarydark 100%);
        box-shadow: 0px 0px 0px 0px white, 0px 0px 0px 0px #000000;
        transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    }

    .purchase--btn:hover {
        box-shadow: 0px 0px 0px 2px white, 0px 0px 0px 4px #0000003a;
    }

    /* Reset input number styles */
    .input_field::-webkit-outer-spin-button,
    .input_field::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .input_field[type=number] {
        -moz-appearance: textfield;
        appearance: textfield;
    }
}

.fa-xmark {
    right: 0;
    color: #00000096;
}

.myPadding {
    padding: 5rem 0;
}
</style>