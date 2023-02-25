<script>
	import { db } from '../../stores/stores';
	import { getDocs, collection } from 'firebase/firestore';

	let games = [];
	async function getdata() {
		let querySnapshot = await getDocs(collection(db, 'Games'));
		querySnapshot.forEach((doc) => {
			games.push(doc.data());
		});

		return games;
	}
	let image2 =
		'https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/kentstatesports.com/images/responsive_2020/nav_main.svg';
	let team2 = 'Kent State';
</script>

{#await getdata() then games}
	<div class="container">
		{#each games as { Description, startDate, image1, team1 }, i}
			<div id={i} class="games">
				<div class="teams">
					<h1>{Description}, {startDate}</h1>
					<div class="single">
						<img src={image1} alt="" />
						<h1>
							{team1}
						</h1>
					</div>
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
