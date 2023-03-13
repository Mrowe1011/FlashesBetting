<script>
	import { db, currentUser } from '../stores/stores';
	import { getDoc, doc } from 'firebase/firestore';
	import { signOut } from 'firebase/auth';
	//get stuff to display the points
	let profile;
	async function getData() {
		let querySnapshot = await getDoc(doc(db, 'users', $currentUser.uid));
		profile = querySnapshot.data();
		return profile;
	}
	//get stuff to display the points
	function signout() {
		signOut(auth)
			.then(() => {
				location.href = '/';
			})
			.catch((error) => {
				alert(error);
			});
	}

	let page = 0;
</script>

{#if $currentUser}
	<nav class="navbar">
		<div class="logo">
			<h1 class="text-sky-100 font-mono text-2xl tracking-widest">FLASHES</h1>
			<h1 class="text-yellow-300 font-mono text-3xl tracking-widest">BETTING</h1>
		</div>
		<div class="links">
			<a
				class:selected={page == 0}
				on:click={() => {
					page = 0;
				}}
				href="/homePage">Dashboard</a
			>
			<a
				class:selected={page == 1}
				on:click={() => {
					page = 1;
				}}
				href="/homePage/calendar">Upcoming Games</a
			>
			<a
				class:selected={page == 2}
				on:click={() => {
					page = 2;
				}}
				href="/homePage/leaderboard">Leaderboard</a
			>
		</div>
		<div class="usercluster">
			<div class="user">
				{#await getData() then profile}
					<p>{profile.name}</p>
					<div class="strike">
						<span class="text-yellow-300">Points: {profile.points}</span>
					</div>
				{/await}
			</div>
			<div class="settings">
				<a href="/homePage/accountSettings"
					><img src="/src/routes/images/icons8-settings-50.png" alt="Settings" class="wheel" /></a
				>
				<button class="Signout" on:click={signout}
					><img src="/src/routes/images/icons8-logout-48.png" alt="Sign Out" /></button
				>
			</div>
		</div>
	</nav>

	<slot />
{:else}
	<h1>You got signed out</h1>
	<a href="/" style="color: black;">sign back in here</a>
{/if}

<style>
	.selected {
		text-shadow: 0 0 0.5rem white, 0 0 1rem white;
	}
	.settings {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: nowrap;
	}
	.user {
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.usercluster {
		margin-left: auto;
		align-self: flex-end;
		width: 8%;
	}
	.logo {
		margin-right: 2em;
	}
	.links {
		font-size: 1.2em;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 40%;
		height: 100%;
		margin-top: auto;
		margin-bottom: auto;
	}
	.navbar {
		position: sticky;
		top: 0px;
		display: flex;
		padding: 0.5%;
		width: 100%;
		background-color: #142a47;
		color: white;
	}
	img {
		height: 25px;
		width: 25px;
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
		background: yellow;
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
