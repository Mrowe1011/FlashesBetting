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
				<label class="stuff" for="name">Email</label>
				<input bind:value={username} type="text" id="email" name="email" class="stuff" />
			</div>
			<div>
				<label class="stuff" for="name">Password</label>
				<input bind:value={password} type="password" id="password" name="password" class="stuff" />
			</div>
			<button class="stuff" id="submit" type="submit">Login</button>
		</form>

		<a style="text-align:center; color:white" href="/forgotAccount">Forgot Password</a>
		<div class="strike">
			<span>New Here?</span>
		</div>
		<a href="/createAccount" id="create"> Create an account!</a>
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
		justify-content: space-evenly;
		font-weight: lighter;
		border-radius: 15px;
		height: 55%;
		width: 25%;
		padding: 2%;
		box-shadow: 0px 0px 2em #00275ad7;
	}
	@media only screen and (max-width: 1500px) {
		.login {
			height: 50%;
			width: 40%;
		}
	}

	@media only screen and (max-width: 800px) {
		.login {
			height: 50%;
			width: 70%;
		}
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
		padding: 0.2em;
		width: 100%;
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

	.strike {
		display: block;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
	}

	.strike > span {
		position: relative;
		display: inline-block;
	}

	.strike > span:before,
	.strike > span:after {
		content: '';
		position: absolute;
		top: 50%;
		width: 9999px;
		height: 1px;
		background: white;
	}

	.strike > span:before {
		right: 100%;
		margin-right: 15px;
	}

	.strike > span:after {
		left: 100%;
		margin-left: 15px;
	}
</style>
