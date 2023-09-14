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
				<form action="" class="mx-5">
					<!-- ---Name--- -->
					<div class="form-control d-flex">
						<input type="text" required="">
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
						<input type="text" required="">
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
						<input type="password" required="">
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
						<input type="password" required="">
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
					<button class="continue-application">
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


</style>