<script>
	import { currentUser, db } from '../../stores/stores';
	import { getDoc, doc, updateDoc } from 'firebase/firestore';
	import { deleteUser, updateEmail } from 'firebase/auth';

	let profile = [];
	async function getData() {
		let querySnapshot = await getDoc(doc(db, 'users', currentUser.uid));
		profile = querySnapshot.data();
		return profile;
	}
	let Fname;
	async function submitChangeUsername() {
		await updateDoc(doc(db, 'users', currentUser.email), {
			name: Fname
		});
		location.reload();
	}
	let email;
	async function submitChangeEmail() {
		await updateEmail(currentUser, email).catch((error) => {
			alert(error);
		});

		location.reload();
	}
	async function deleteAccount() {
		deleteUser(currentUser);

		location.reload();
	}
	console.log(currentUser.uid);
</script>

<div>
	<h1>Account</h1>
	<h2>Profile</h2>
	<p>This information will be displayed publicly.</p>
	{#await getData() then profile}
		<div>
			<h1>Username: {profile.name}</h1>
			<form on:submit|preventDefault={submitChangeUsername}>
				<div>
					<label for="name">New username:</label>
					<input type="text" id="name" name="name" bind:value={Fname} />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
		<h3>The danger zone! (must sign in recently)</h3>
		<div>
			<h1>Email: {currentUser.email}</h1>
			<form on:submit|preventDefault={submitChangeEmail}>
				<div>
					<label for="name">New email:</label>
					<input type="text" id="name" name="name" bind:value={email} />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
		<div>
			<form on:submit|preventDefault={deleteAccount}>
				<button type="submit">Delete Account ☠</button>
			</form>
		</div>
	{/await}
</div>

<style>
	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
