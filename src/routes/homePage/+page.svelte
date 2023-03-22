<script>
	import { getDoc, doc } from 'firebase/firestore';
	import { currentUser, db, games } from '../stores/stores';
	import { fly } from 'svelte/transition';
	let profile;
	let activeGamers = [];
	let currentbet = [];

	async function getProfile() {
		let querySnapshot = await getDoc(doc(db, 'users', $currentUser.uid));
		profile = querySnapshot.data();
		for (const activeGames in profile['activeBets']) {
			let currentID = profile['activeBets'][activeGames]['id'];
			for (const singleGame in games) {
				if (games[singleGame]['id'] === currentID) {
					activeGamers.push(games[singleGame]);
				}
			}
		}
		return activeGamers;
	}
	let image2 =
		'https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/kentstatesports.com/images/responsive_2020/nav_main.svg';
	let team2 = 'Kent State';
</script>

<section class="background">
	{#await getProfile() then games}
		<div class="container">
			{#each games as { Description, id, startDate, image1, team1, amount, bettors, finished, HomeScore, awayScore }, i}
				<div {id} class="games" transition:fly={{ x: 100, duration: 100 + i * 100 }}>
					<div class="teams">
						<h1 class="text-xl font-semibold">{Description}, {startDate}</h1>
						<div class="single">
							<div class="team">
								{#if bettors[$currentUser.uid]['team'] == team1}
									<img src={image1} alt="" />
									<h1 class="text">{bettors[$currentUser.uid]['team']}</h1>
								{:else}
									<img src={image2} alt="" />
									<h2 class="text">{team2}</h2>
								{/if}
							</div>
							{#if finished == 'true'}
								{#if bettors[$currentUser.uid]['outcome'] == 'Winner'}
									<div class="gameinfo">
										<div id="numbers">
											<h1 class="font-semibold" id="finalscore">Final Score:</h1>
											<h1 class="text font-semibold">{HomeScore}</h1>
											<h1 class="text font-semibold">{awayScore}</h1>
										</div>
										<h1 class="text font-semibold">
											Points won: {bettors[$currentUser.uid]['amountWon']}
										</h1>
									</div>
								{:else}
									<div class="gameinfo">
										<div id="numbers">
											<h1 class="font-semibold" id="finalscore">Final Score:</h1>
											<h1 class="text font-semibold">{HomeScore}</h1>
											<h1 class="text font-semibold">{awayScore}</h1>
										</div>
										<h1 class="text font-semibold">
											Points Lost: {bettors[$currentUser.uid]['amountWon']}
										</h1>
									</div>
								{/if}
							{:else}
								<h1 class="text font-semibold">
									Current Bet: {bettors[$currentUser.uid]['betAmount']}
								</h1>
							{/if}
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
	:global(html) {
		background-color: #000f24;
	}
	#numbers {
		text-align: center;
	}
	#finalscore {
		white-space: nowrap;
	}
	.gameinfo {
		display: flex;
		margin-top: auto;
		margin-bottom: auto;
		padding-right: 3%;
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
	.background {
		background-color: #000f24;
		height: 100%;
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
