<script>
	import { doc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
	import { db, games } from '../../stores/stores';
	export let id;
	export let Description;
	export let bettors;
	export let startDate;
	export let image1;
	export let team1;
	export let finished;
	export let image2 =
		'https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/kentstatesports.com/images/responsive_2020/nav_main.svg';
	export let team2 = 'Kent State';
	export let betAmount = 0;
	export let betAmount2 = 0;
	export let currentUser;
	export let HomeScore;
	export let awayScore;
	import { fly } from 'svelte/transition';
	let profile;
	// Get live updates to profile
	$: profile = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
		profile = doc.data();
	});
</script>

<slot {Description} {id} {startDate} {image1} {team1} {bettors} {finished} {HomeScore} {awayScore}>
	{#if finished === 'true'}
		<div {id} class="games" transition:fly={{ x: 100, duration: 200 }}>
			<div class="teams">
				<h1 class="text-xl font-semibold">{Description}, {startDate}</h1>
				<div class="inside">
					<div class="single">
						<img src={image1} alt="" />
						<h1 class="text">
							{team1}
						</h1>
					</div>

					<div class="placeBet" transition:fly={{ x: 35, duration: 100 }}>
						<form on:submit|preventDefault={() => addTeamOne(id, team1)}>
							<p class="score">{awayScore}</p>
						</form>
					</div>
				</div>

				<hr />
				<div class="inside">
					<div class="single">
						<img src={image2} alt="" />
						<h1 class="text">
							{team2}
						</h1>
					</div>

					<div class="placeBet" transition:fly={{ x: 35, duration: 100 }}>
						<form on:submit|preventDefault={() => addTeamTwo(id, team1)}>
							<p class="score">{HomeScore}</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
</slot>

<style>
	.score {
		font-size: larger;
		font-weight: bold;
	}
	.text {
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10%;
		white-space: nowrap;
		font-size: large;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.inside {
		display: flex;
		justify-content: space-between;
	}

	.games {
		font-size: 1em;
		display: flex;
		justify-content: space-around;
		width: 99.1vw;
	}
	.teams {
		display: flex;
		flex-direction: column;
		padding: 2%;
		margin: 2%;
		width: 60%;
		background-color: rgba(255, 255, 255, 0.945);
		border-radius: 15px;
	}
	.single {
		display: flex;
		justify-content: flex-start;
	}
	img {
		width: 80px;
	}
	hr {
		width: 100%;
	}
</style>
