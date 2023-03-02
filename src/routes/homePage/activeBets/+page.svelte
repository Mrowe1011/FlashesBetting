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
				</div>
			</div>
		{/each}
	</div>
{/await}

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	.games {
		font-size: 1em;
		display: flex;
		justify-content: space-around;
	}
	.teams {
		display: flex;
		flex-direction: column;
		padding: 4%;
		width: 60%;
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
