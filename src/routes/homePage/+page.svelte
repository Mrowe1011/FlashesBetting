<script>
	import { getDoc, collection, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
	import { currentUser, db, games } from '../stores/stores';
	import { fly } from 'svelte/transition';
	let profile;
	let activeGamers = [];
	let currentbet = [];
	async function getProfile() {
		let querySnapshot = await getDoc(doc(db, 'users', $currentUser.uid));
		profile = querySnapshot.data();
		let activeGames = Object.values(profile.activeBets);
		let activeGamesArray = [];
		activeGames.forEach((doc) => {
			activeGamesArray.push(doc.id);
		});
		activeGamesArray.forEach((gameID) => {
			games.forEach((game) => {
				if (game.id === gameID) {
					activeGamers.push(game);
					let gamblers = game.bettors;
					for (const gambler in gamblers) {
						if (gambler === $currentUser.uid) {
							currentbet.push(gamblers[gambler]);
							activeGamers.amount += gamblers[gambler].betAmount;
						}
					}
				}
			});
		});
		return activeGamers;
	}

	let image2 =
		'https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/kentstatesports.com/images/responsive_2020/nav_main.svg';
	let team2 = 'Kent State';
	let betAmount = 0;
</script>

<section class="background">
	{#await getProfile() then games}
		<div class="container">
			{#each games as { Description, id, startDate, image1, team1, amount }, i}
				<div {id} class="games" transition:fly={{ x: 100, duration: 100 + i * 100 }}>
					<div class="teams">
						<h1 class="text-xl font-semibold">{Description}, {startDate}</h1>
						<div class="single">
							<div class="team">
								<img src={image1} alt="" />
								<h1 class="text">
									{currentbet[i].team}
								</h1>
							</div>
							<h1 class="text font-semibold">Current Bet: {currentbet[i].betAmount}</h1>
						</div>
						<div />
						<div />
						<hr />
						<div />
					</div>
				</div>
			{/each}
		</div>
	{/await}
</section>

<style>
	.text {
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10%;
		white-space: nowrap;
		font-size: large;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.background {
		background-color: #000f24;
		height: 100vh;
	}
	.container {
		display: flex;
		flex-direction: column;
	}
	.games {
		font-size: 1em;
		display: flex;
		justify-content: space-around;
		width: 99.1vw;
	}
	.team {
		display: flex;
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
		justify-content: space-between;
	}
	img {
		width: 80px;
	}
	hr {
		width: 100%;
		color: black;
	}
</style>
