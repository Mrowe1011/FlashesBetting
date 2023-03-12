<script>
	import { auth } from '../stores/stores';
	import { sendPasswordResetEmail } from 'firebase/auth';
	let email = '';
	function onSubmit() {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert('Password reset link sent to ' + email + '!');
				location.href = '/';
			})
			.catch((error) => {
				alert(error);
			});
	}
</script>

<div class="everything">
	<div class="login">
		<h1 id="welcome">Send a recovery email!</h1>
		<form on:submit|preventDefault={onSubmit}>
			<div>
				<label class="stuff" for="name">Email</label><br />
				<input bind:value={email} type="text" id="email" name="email" class="stuff" />
			</div>
			<button class="stuff" id="submit" type="submit">Send</button>
		</form>
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
		background-image: url('../images/QQKIWTGKB5E2NBBZI5MB4GXEDM.jpg');
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
		height: 47%;
		width: 25%;
		padding: 3%;
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
		padding: 0.5em;
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
</style>
