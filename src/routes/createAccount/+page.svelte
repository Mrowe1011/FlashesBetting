<script>
	import { app, currentUser } from '../stores/stores';
	import {
		getAuth,
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { getDatabase, ref, set } from 'firebase/database';
	import { doc, setDoc, getFirestore } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	const auth = getAuth(app);
	let email = '';
	let password = '';
	let password2 = '';
	let Fname = '';
	let points = 100;
	let picture = Math.floor(Math.random() * 5);
	const db = getFirestore(app);
	async function onSubmit() {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setDoc(doc(db, 'users', userCredential.user.uid), {
					name: Fname,
					email: email,
					points: points,
					picture: picture
				}).then(() => {
					signInWithEmailAndPassword(auth, email, password);
					alert('welcome ' + userCredential.user.email + '! ');
					location.href = '/homePage';
				});
			})
			.catch((error) => {
				alert(error);
			});
	}
</script>

<div class="everything">
	<div class="login">
		<h1>Let's get to know each other!</h1>
		<form on:submit|preventDefault={onSubmit}>
			<div>
				<label for="name">Username</label>
				<input bind:value={Fname} type="text" id="name" name="name" />
			</div>
			<div>
				<label for="name">Email</label>
				<input bind:value={email} type="text" id="email" name="email" />
			</div>
			<div>
				<label for="name">Password</label>
				<input bind:value={password} type="password" id="password" name="password" />
				<div>
					<label for="name">Retype Password</label>
					<input bind:value={password2} type="password" id="password2" name="password2" />
				</div>
			</div>
			{#if Fname != ''}
				{#if email != ''}
					{#if password != ''}
						{#if password2 === password}
							{#if password === password2}
								<br />
								<button class="stuff" id="submit" type="submit">Submit</button>
							{:else}
								<br />
							{/if}
						{:else}
							<p>Passwords do not match!</p>
						{/if}
					{:else}
						<p>Lets try a strong password!</p>
					{/if}
				{:else}
					<p>How about an email?</p>
				{/if}
			{:else}
				<p>Lets start with a username!</p>
			{/if}
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
		justify-content: space-around;
		font-weight: lighter;
		border-radius: 4%;

		height: 40%;
		width: 20%;
		padding: 3%;
		box-shadow: 0px 0px 2em #00275ad7;
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
	label {
		margin-top: 5%;
	}
</style>
