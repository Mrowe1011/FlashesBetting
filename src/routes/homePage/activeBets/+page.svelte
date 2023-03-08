<script>
	import { getDoc, collection, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
	import { currentUser, db, games } from '../../stores/stores';
	let profile;
	let activeGamers = [];
	async function getProfile() {
		let querySnapshot = await getDoc(doc(db, 'users', currentUser.uid));
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
					console.log(game);
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

{#await getProfile() then games}
	<div class="container">
		{#each games as { Description, id, startDate, image1, team1 }, i}
			<div {id} class="games">
				<div class="teams">
					<h1>{Description}, {startDate}</h1>
					<div class="single">
						<img src={image1} alt="" />
						<h1>
							{team1}
						</h1>
					</div>
					<div />
					<div />
					<hr />
					<div class="single">
						<img src={image2} alt="" />
						<h1>
							{team2}
						</h1>
					</div>
					<div />
				</div>
			</div>
		{/each}
	</div>
{/await}

<style>
	.background {
	}
	.container {
		display: flex;
		flex-direction: column;
		background-color: #000f24;
	}
	.games {
		font-size: 1em;
		display: flex;
		justify-content: space-around;
	}
	.teams {
		display: flex;
		flex-direction: column;
		padding: 2%;
		margin: 2%;
		width: 60%;
		background-color: rgba(255, 255, 255, 0.945);
		box-shadow: 0px 0px 2em #ffffff;
		border-radius: 50px;
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
		color: black;
	}
</style>
