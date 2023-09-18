<template>
	<!-- ---Register section, active when store access is false--- -->
	<div class="container register" v-if="store.access === false">
		<div class="row my-5">
			<!-- ---Register img--- -->
			<div class="col-5 d-flex">
				<img src="../../images/register.png" alt="" class="w-100 m-auto">
			</div>
			<!-- ---Form Register--- -->
			<div class="col-7 text-center">
				<h1>Sign up</h1>
				<h5>Enter your information to get started</h5>
				<form action="" class="mx-5" @submit.prevent="registerUser">
					<!-- ---Name--- -->
					<div class="form-control d-flex">
						<input type="text" id="name" v-model="registerData.name" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">F</span>
							<span style="transition-delay:50ms">u</span>
							<span style="transition-delay:100ms">l</span>
							<span style="transition-delay:150ms">l</span>
							<span style="transition-delay:200ms"> </span>
							<span style="transition-delay:250ms">N</span>
							<span style="transition-delay:300ms">a</span>
							<span style="transition-delay:350ms">m</span>
							<span style="transition-delay:400ms">e</span>
						</label>
						<i class="fa-solid fa-id-card align-self-center"></i>
					</div>
					<!-- ---Email--- -->
					<div class="form-control">
						<input type="email" id="email" v-model="registerData.email" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">E</span>
							<span style="transition-delay:50ms">m</span>
							<span style="transition-delay:100ms">a</span>
							<span style="transition-delay:150ms">i</span>
							<span style="transition-delay:200ms">l</span>
						</label>
						<i class="fa-solid fa-envelope align-self-center"></i>
					</div>
					<!-- ---VAT number--- -->
					<div class="form-control d-flex">
						<input type="text" id="vat_num" v-model="registerData.vat_num" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">V</span>
							<span style="transition-delay:50ms">A</span>
							<span style="transition-delay:100ms">T</span>
							<span style="transition-delay:150ms"> </span>
							<span style="transition-delay:200ms">N</span>
							<span style="transition-delay:250ms">u</span>
							<span style="transition-delay:300ms">m</span>
							<span style="transition-delay:350ms">b</span>
							<span style="transition-delay:400ms">e</span>
							<span style="transition-delay:400ms">r</span>
						</label>
						<i class="fa-solid fa-lock align-self-center"></i>
					</div>
					<!-- ---Password--- -->
					<div class="form-control d-flex">
						<input type="password" id="password" v-model="registerData.password" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">P</span>
							<span style="transition-delay:50ms">a</span>
							<span style="transition-delay:100ms">s</span>
							<span style="transition-delay:150ms">s</span>
							<span style="transition-delay:200ms">w</span>
							<span style="transition-delay:250ms">o</span>
							<span style="transition-delay:300ms">r</span>
							<span style="transition-delay:350ms">d</span>
						</label>
						<i class="fa-solid fa-key align-self-center"></i>
					</div>
					<!-- ---Password confirm--- -->
					<div class="form-control d-flex">
						<input type="password" id="password_confirm" v-model="registerData.password_confirm" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">P</span>
							<span style="transition-delay:50ms">a</span>
							<span style="transition-delay:100ms">s</span>
							<span style="transition-delay:150ms">s</span>
							<span style="transition-delay:200ms">w</span>
							<span style="transition-delay:250ms">o</span>
							<span style="transition-delay:300ms">r</span>
							<span style="transition-delay:350ms">d</span>
							<span style="transition-delay:400ms"> </span>
							<span style="transition-delay:400ms">c</span>
							<span style="transition-delay:450ms">o</span>
							<span style="transition-delay:500ms">n</span>
							<span style="transition-delay:550ms">f</span>
							<span style="transition-delay:650ms">i</span>
							<span style="transition-delay:700ms">r</span>
							<span style="transition-delay:750ms">m</span>
						</label>
						<i class="fa-solid fa-lock align-self-center"></i>
					</div>
					<!-- ---Confirm button--- -->
					<button class="continue-application" type="submit">
						<div>
							<div class="pencil"></div>
							<div class="folder">
								<div class="top">
									<svg viewBox="0 0 24 27">
										<path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
									</svg>
								</div>
								<div class="paper"></div>
							</div>
						</div>
						Confirm Registration
					</button>
					<!-- ---Already Log in link--- -->
					<p class="alreadyLogin">Already have an account?<a href="#" class="fw-semibold" @click="store.access = true">Log in</a></p>
				</form>
			</div>
		</div>
	</div>
	<!-- ---Login section, active when store access is true--- -->
	<div class="container login" v-if="store.access === true">
		<div class="row my-5">
			<!-- ---Login img--- -->
			<div class="col-5 d-flex">
				<img src="../../images/login.png" alt="" class="w-100 m-auto">
			</div>
			<!-- ---Form Login--- -->
			<div class="col-7 text-center">
				<h1>Log in</h1>
				<h5>Enter your information to access</h5>
				<form action="" class="mx-5" @submit.prevent="loginUser">
					<!-- ---Email--- -->
					<div class="form-control">
						<input id="email" type="email" v-model="loginData.email" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">E</span>
							<span style="transition-delay:50ms">m</span>
							<span style="transition-delay:100ms">a</span>
							<span style="transition-delay:150ms">i</span>
							<span style="transition-delay:200ms">l</span>
						</label>
						<i class="fa-solid fa-envelope align-self-center"></i>
					</div>
					<!-- ---Password--- -->
					<div class="form-control d-flex">
						<input id="password" type="password" v-model="loginData.password" required>
						<label class="fw-semibold">
							<span style="transition-delay:0ms">P</span>
							<span style="transition-delay:50ms">a</span>
							<span style="transition-delay:100ms">s</span>
							<span style="transition-delay:150ms">s</span>
							<span style="transition-delay:200ms">w</span>
							<span style="transition-delay:250ms">o</span>
							<span style="transition-delay:300ms">r</span>
							<span style="transition-delay:350ms">d</span>
						</label>
						<i class="fa-solid fa-key align-self-center"></i>
					</div>
					<!-- ---Login button--- -->
					<button class="loginbtn fw-semibold" type="submit">Login</button>
					<!-- ---Need to register--- -->
					<p class="alreadyLogin">New to Deliveboo? <a href="#" class="fw-semibold" @click="store.access = false">Create an account</a></p>
				</form>
				<h5>OR</h5>
				<div class="orline mx-auto">
					<div></div>
				</div>
				<!-- ---Login with facebook button--- -->
				<div class="d-flex flex-column align-items-center mt-3">
					<button class="facebookbtn">
						<svg viewBox="0 0 16 16" class="bi bi-facebook" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
							<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
						</svg>
						<span>Connect with Facebook</span>
					</button>
					<button class="googlebtn px-4 mt-3" @click="test()">
						<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
							<path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
							<path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
							<path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
							<path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
						</svg>
						<span>Connect with Google</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {store} from "../../store";
	import axios from "axios";

	export default {
		data() {
			return {
				store,
				apiUrl: 'http://127.0.0.1:8000/api/',
				userToken: '',
				userId: '',
				userName: '',
				registerData: {
					name: '',
					email: '',
					vat_num: '',
					password: '',
					password_confirm: '',
				},
				loginData: {
					email: '',
					password: '',
				},
			}
		},

		components: {
			
		},

		props: {

		},

		mounted () {

		},

		created () {
			this.userToken = localStorage.getItem('userToken');
			this.userId = localStorage.getItem('userId');
			this.userName = localStorage.getItem('userName');
			// console.log(this.userToken);
			// console.log(this.userId);
			// console.log(this.userName);
		},

		methods: {
			registerUser() {
				axios.post(`${this.apiUrl}register`, this.registerData)
					.then(response => {
						// console.log(response);
						// console.log(response.data.token);
						// console.log(response.data.user.id);
						// console.log(response.data.user.name);
						this.userToken = response.data.token;
						this.userId = response.data.user.id;
						this.userName = response.data.user.name;
						localStorage.setItem('userToken', this.userToken);
						localStorage.setItem('userId', this.userId);
						localStorage.setItem('userName', this.userName);
					})
					.catch(error => {
						console.log(error)
					});
			},
			loginUser() {
				axios.post(`${this.apiUrl}login`, this.loginData)
					.then(response => {
						// console.log(response);
						// console.log(response.data.token);
						// console.log(response.data.user.id);
						// console.log(response.data.user.name);
						this.userToken = response.data.token;
						this.userId = response.data.user.id;
						this.userName = response.data.user.name;
						localStorage.setItem('userToken', this.userToken);
						localStorage.setItem('userId', this.userId);
						localStorage.setItem('userName', this.userName);
					})
					.catch(error => {
						console.log(error)
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as *;

// ---Form inputs---
	.orline{
		margin-top: -18px;
		margin-bottom: 30px;
		width: 50%;
		height: 1px;
		background-color: black;
		div{
			background-color: white;
			height: 10px;
			width: 30px;
			margin-top: -17px;
			margin:auto;
		}
	}
	.alreadyLogin{
		font-size: 13px;
		margin-top: 30px;
		a{
			color: $primary;
			text-decoration: none;
			&:hover{
				color: $primarysoft;
			}
		}
	}
	.form-control {
		position: relative;
		margin: 20px 0 40px;
		border: none;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		border-radius: 20px;
	}
	.form-control input {
		background-color: transparent;
		border: 0;
		border-bottom: 2px rgb(150, 150, 150) solid;
		display: inline;
		width: calc(100% - 30px);
		font-size: 18px;
		color: black;
		margin: 0 6px;
	}
	.form-control input:focus, .form-control input:valid {
		outline: 0;
		border-bottom-color: $primary;
	}
	.form-control label {
		position: absolute;
		top: 5px;
		left: 20px;
		pointer-events: none;
	}
	.form-control label span {
		display: inline-block;
		font-size: 18px;
		min-width: 5px;
		color: rgb(150, 150, 150);
		transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	.form-control input:focus+label span, .form-control input:valid+label span{
		color: $primary;
		transform: translateY(-30px);
	}


// ---Submit---
.continue-application {
		--color: black;
		--background: #ffd07e;
		--background-hover: #ff9474;
		--background-left: #FA6639;
		--folder: #F3E9CB;
		--folder-inner: #BEB393;
		--paper: #FFFFFF;
		--paper-lines: #BBC1E1;
		--paper-behind: #E1E6F9;
		--pencil-cap: #fff;
		--pencil-top: #275EFE;
		--pencil-middle: #fff;
		--pencil-bottom: #5C86FF;
		--shadow: rgba(13, 15, 25, .2);
		border: none;
		outline: none;
		cursor: pointer;
		position: relative;
		border-radius: 5px;
		font-size: 14px;
		font-weight: 500;
		line-height: 19px;
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		padding: 17px 29px 17px 69px;
		transition: background 0.3s;
		color: var(--color);
		background: var(--bg, var(--background));
	}
	.continue-application > div {
		top: 0;
		left: 0;
		bottom: 0;
		width: 53px;
		position: absolute;
		overflow: hidden;
		border-radius: 5px 0 0 5px;
		background: var(--background-left);
	}
	.continue-application > div .folder {
		width: 23px;
		height: 27px;
		position: absolute;
		left: 15px;
		top: 13px;
	}
	.continue-application > div .folder .top {
		left: 0;
		top: 0;
		z-index: 2;
		position: absolute;
		transform: translateX(var(--fx, 0));
		transition: transform 0.4s ease var(--fd, 0.3s);
	}
	.continue-application > div .folder .top svg {
		width: 24px;
		height: 27px;
		display: block;
		fill: var(--folder);
		transform-origin: 0 50%;
		transition: transform 0.3s ease var(--fds, 0.45s);
		transform: perspective(120px) rotateY(var(--fr, 0deg));
	}
	.continue-application > div .folder:before, .continue-application > div .folder:after, .continue-application > div .folder .paper {
		content: "";
		position: absolute;
		left: var(--l, 0);
		top: var(--t, 0);
		width: var(--w, 100%);
		height: var(--h, 100%);
		border-radius: 1px;
		background: var(--b, var(--folder-inner));
	}
	.continue-application > div .folder:before {
		box-shadow: 0 1.5px 3px var(--shadow), 0 2.5px 5px var(--shadow), 0 3.5px 7px var(--shadow);
		transform: translateX(var(--fx, 0));
		transition: transform 0.4s ease var(--fd, 0.3s);
	}
	.continue-application > div .folder:after, 	.continue-application > div .folder .paper {
		--l: 1px;
		--t: 1px;
		--w: 21px;
		--h: 25px;
		--b: var(--paper-behind);
	}
	.continue-application > div .folder:after {
		transform: translate(var(--pbx, 0), var(--pby, 0));
		transition: transform 0.4s ease var(--pbd, 0s);
	}
	.continue-application > div .folder .paper {
		z-index: 1;
		--b: var(--paper);
	}
	.continue-application > div .folder .paper:before, .continue-application > div .folder .paper:after {
		content: "";
		width: var(--wp, 14px);
		height: 2px;
		border-radius: 1px;
		transform: scaleY(0.5);
		left: 3px;
		top: var(--tp, 3px);
		position: absolute;
		background: var(--paper-lines);
		box-shadow: 0 12px 0 0 var(--paper-lines), 0 24px 0 0 var(--paper-lines);
	}
	.continue-application > div .folder .paper:after {
		--tp: 6px;
		--wp: 10px;
	}
	.continue-application > div .pencil {
		height: 2px;
		width: 3px;
		border-radius: 1px 1px 0 0;
		top: 8px;
		left: 105%;
		position: absolute;
		z-index: 3;
		transform-origin: 50% 19px;
		background: var(--pencil-cap);
		transform: translateX(var(--pex, 0)) rotate(35deg);
		transition: transform 0.4s ease var(--pbd, 0s);
	}
	.continue-application > div .pencil:before, .continue-application > div .pencil:after {
		content: "";
		position: absolute;
		display: block;
		background: var(--b, linear-gradient(var(--pencil-top) 55%, var(--pencil-middle) 55.1%, var(--pencil-middle) 60%, var(--pencil-bottom) 60.1%));
		width: var(--w, 5px);
		height: var(--h, 20px);
		border-radius: var(--br, 2px 2px 0 0);
		top: var(--t, 2px);
		left: var(--l, -1px);
	}
	.continue-application > div .pencil:before {
		-webkit-clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
		clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
	}
	.continue-application > div .pencil:after {
		--b: none;
		--w: 3px;
		--h: 6px;
		--br: 0 2px 1px 0;
		--t: 3px;
		--l: 3px;
		border-top: 1px solid var(--pencil-top);
		border-right: 1px solid var(--pencil-top);
	}
	.continue-application:before, .continue-application:after {
		content: "";
		position: absolute;
		width: 10px;
		height: 2px;
		border-radius: 1px;
		background: var(--color);
		transform-origin: 9px 1px;
		transform: translateX(var(--cx, 0)) scale(0.5) rotate(var(--r, -45deg));
		top: 26px;
		right: 16px;
		transition: transform 0.3s;
	}
	.continue-application:after {
		--r: 45deg;
	}
	.continue-application:hover {
		--cx: 2px;
		--bg: var(--background-hover);
		--fx: -40px;
		--fr: -60deg;
		--fd: .15s;
		--fds: 0s;
		--pbx: 3px;
		--pby: -3px;
		--pbd: .15s;
		--pex: -24px;
	}


// ---Login button---
	.loginbtn{
		color: $secondary;
		font-size: 15px;
		padding: 0.7em 2.7em;
		letter-spacing: 0.06em;
		position: relative;
		font-family: inherit;
		border-radius: 0.6em;
		overflow: hidden;
		transition: all 0.3s;
		line-height: 1.4em;
		border: 2px solid $secondary;
		background: linear-gradient(to right, rgb(250, 183, 70, 0.1) 1%, transparent 40%,transparent 60% , rgba(250, 183, 70, 0.1) 100%);
		box-shadow: inset 0 0 10px rgba(250, 183, 70, 0.4), 0 0 9px 3px rgba(250, 183, 70, 0.1);
		background-color: rgb(235, 235, 235);
		&:hover {
		color: $primary;
		box-shadow: inset 0 0 10px rgb(250, 102, 57, 0.6), 0 0 9px 3px rgb(250, 102, 57, 0.2);
		}
		&:before {
			content: "";
			position: absolute;
			left: -4em;
			width: 4em;
			height: 100%;
			top: 0;
			transition: transform .4s ease-in-out;
			background: linear-gradient(to right, transparent 1%, rgba(250, 183, 70, 0.1) 40%,rgba(250, 183, 70, 0.1) 60% , transparent 100%);
		}
		&:hover:before {
			transform: translateX(15em);
		}
	}
	

// ---Facebook button---
	.facebookbtn {
		background: transparent;
		position: relative;
		padding: 5px 15px;
		display: flex;
		align-items: center;
		font-size: 17px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		border: 1px solid #0163E0;
		border-radius: 25px;
		outline: none;
		overflow: hidden;
		color: #0163E0;
		transition: color 0.3s 0.1s ease-out;
		text-align: center;
		svg {
			fill: #0163E0;
			height: 25px;
			width: 25px;
		}
		span {
			margin: 10px;
		}
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			content: '';
			border-radius: 50%;
			display: block;
			width: 20em;
			height: 20em;
			left: -3rem;
			text-align: center;
			transition: box-shadow 0.5s ease-out;
			z-index: -1;
		}
		&:hover {
			color: #fff;
			border: 1px solid #0163E0;
		}
		&:hover svg {
			fill: currentColor;
		}
		&:hover::before {
			box-shadow: inset 0 0 0 10em #0163E0;
		}
	}

// ---Google button---
	.googlebtn {
		background: transparent;
		position: relative;
		padding: 5px 15px;
		display: flex;
		align-items: center;
		font-size: 17px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		border: 1px solid $primarysoft;
		border-radius: 25px;
		outline: none;
		overflow: hidden;
		color: $primarysoft;
		transition: color 0.3s 0.1s ease-out;
		text-align: center;
		svg {
			fill: $primarysoft;
			height: 25px;
			width: 25px;
		}
		span {
			margin: 10px;
		}
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			content: '';
			border-radius: 50%;
			display: block;
			width: 20em;
			height: 20em;
			left: -3rem;
			text-align: center;
			transition: box-shadow 0.5s ease-out;
			z-index: -1;
		}
		&:hover {
			color: black;
			border: 1px solid $primarysoft;
		}
		&:hover svg {
			fill: currentColor;
		}
		&:hover::before {
			box-shadow: inset 0 0 0 10em $primarysoft;
		}
	}
</style>