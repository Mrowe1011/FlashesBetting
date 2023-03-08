<script>
	import { signout, auth, db } from '../stores/stores';
	import { onAuthStateChanged } from 'firebase/auth';
	import { getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
	let currentUser;
	let profile;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser = user;
		}
	});
	async function getData() {
		let querySnapshot = await getDoc(doc(db, 'users', currentUser.uid));
		profile = querySnapshot.data();
		return profile;
	}
</script>

{#if currentUser}
	<nav>
		<img
			id="title"
			alt=""
			src="https://img.covers.com/covers/data/new_logos/ncaab/kent.png?auto=compress&auto=format"
		/>
		<div class="navbar">
			<a href="/homePage/activeBets">Active Bets</a>
			<a href="/homePage/calendar">Calendar</a>
			<a href="/homePage/leaderboard">Leaderboard</a>
		</div>
		<div class="right">
			<p>{currentUser.email}</p>
			{#await getData() then profile}
				<p>{profile.points} Points</p>
			{/await}
			<a href="/homePage/accountSettings"><img src="src/routes/images/icons8-settings-50.png" alt="Settings" class="wheel"></a>
			<button class="Signout" on:click={signout}><img src="src/routes/images/icons8-logout-48.png" alt="Sign Out"></button>
		</div>
	</nav>

	<slot />
{:else}
	<h1>You got signed out</h1>
	<a href="/" style="color: black;">sign back in here</a>
{/if}

<style>
	#title {
		height: 100px;
		width: 100px;
		border: 0;
		background-size: cover;
		background-position: center;
	}

	.right {
		padding-right: 2%;
		text-align: right;
	}
	.Signout {
		float: right;
		display: flex;
		align-items: center;
	}
	nav {
		position: sticky;
		top: 0px;
		display: flex;
		padding: 0.5%;
		background-color: #324a69;
	}
	.navbar {
		float: left;
		display: wrap;
		align-items: center;
		width: 100%;
	}
	a,
	p,
	button {
		color: white;
		text-decoration: none;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 1.2em;
		margin-left: 6%;
		background-color: #2d425e00;
		border: 0;
		padding: 0;
	}

	@media only screen and (max-device-width: 480px) {
		
		
	}
</style>
