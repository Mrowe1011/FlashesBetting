<script>
	import { onSubmit } from './stores/stores';
	let username = '';
	let password = '';
</script>

<div class="everything">
	<div class="login">
		<h1 id="welcome">Flashes Betting</h1>
		
		<form on:submit|preventDefault={onSubmit(username, password)}>
			<div>
				<label class="stuff" for="name">Email</label><br />
				<input bind:value={username} type="text" id="email" name="email" class="stuff" />
			</div>
			<div>
				<label class="stuff" for="name">Password</label><br />
				<input bind:value={password} type="password" id="password" name="password" class="stuff" />
			</div>
			<button class="stuff" id="submit" type="submit">Login</button>
		</form>
		<a style="text-align:center; color:white; padding-top:3%" href="/forgotAccount">Forgot Password</a>
		<p style="text-align:center;">New Here?</p>
		<a href="/createAccount" id="create"> Create an account!</a>

		<br />
		<br />
	</div>
</div>

<style>
	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.everything {
		position: absolute;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-image: url('./images/QQKIWTGKB5E2NBBZI5MB4GXEDM.jpg');
		background-size: cover;
		background-position: center;
	}
	.login {
		background-color: #001b3fe1;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-weight: lighter;
		border-radius: 4%;
		align-items: center;

		height: 40%;
		width: 20%;
		padding: 3%;
		box-shadow: 0px 0px 2em #00275ad7;
	}
	hr {
		border: 0;
		clear: both;
		display: block;
		width: 80%;
		background-color: #000000;
		height: 1px;
	}
	input {
		border-radius: 5px;
		border: 3px solid #004297d7;
		width: 100%;
		height: 30px;
		color: white;
		background-color: #324a69d7;
	}
	.stuff:focus {
		outline: none;
		border: 3px solid #5e728dd7;
	}
	#submit {
		margin-top: 5%;
		border-radius: 5px;
		padding: 0.5em;
		width: 102.6%;
		background-color: #324a69d7;
		color: white;
		border: 2px solid #2e5b97d7;
	}

	.stuff {
		margin-top: 2.5%;
	}
	#welcome {
		text-align: center;
		font-size: 2em;
		position: fixed;
		top: 20px;
	}
	label {
		margin-top: 5%;
	}
	#create {
		border-radius: 5px;
		text-align: center;
		color: white;
		background-color: #324a69d7;
		color: white;
		border: 2px solid #2e5b97d7;
		width: 100%;
		padding: 0.25em;
		text-decoration: none;
	}

	@media only screen and (max-device-width: 480px) {
		.login {
			background-color: #001b3fe1;
			color: white;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-weight: lighter;
			border-radius: 4%;

			height: 35%;
			width: 50%;
			padding: 10%;
			box-shadow: 0px 0px 2em #00275ad7;
		}
	}
</style>
