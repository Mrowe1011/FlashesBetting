<script>
	import { auth } from '../../stores/stores';
	import { onAuthStateChanged } from 'firebase/auth';
	import { db } from '../../stores/stores';
	import { getDocs, collection, query } from 'firebase/firestore';

	let currentUser;
	onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser = user;
		}
	});
	let leaderboardPlayers = [];
	let scoreboardPlacement = 1;

	async function getdata() {
		let querySnapshot = await getDocs(collection(db, 'users'));
		querySnapshot.forEach((doc) => {
			leaderboardPlayers.push(doc.data());
			scoreboardPlacement = scoreboardPlacement + 1;
		});
		leaderboardPlayers.sort((a, b) => b.points - a.points);
		return leaderboardPlayers;
	}
</script>

<section class="background">
<div style="padding-left: 80px; padding-top: 30px; padding-bottom: 40px;">
	<h1>Flashes Betting Leaderboard</h1>

	<p>
		This is a list of all of our playeys. It shows who is the best better and hopefully motivates
		you to bet better!
	</p>
</div>

<!-- Table Component  -->

<div class="flex flex-col">
	<div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
		<div class="py-2 inline-block min-w-full sm:px-5 lg:px-20">
			<div class="overflow-hidden">
				<table class="min-w-full">
					<thead class="bg-white border-b">
						<tr>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Place
							</th>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Username
							</th>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Email
							</th>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Score
							</th>
						</tr>
					</thead>
					<tbody>
						{#await getdata() then users}
							{#each users as { name, email, points }, index}
								<tr class="bg-gray-100 border-b">
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
										>{index + 1}</td
									>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{name}
									</td>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{email}
									</td>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{points}
									</td>
								</tr>
							{/each}
						{/await}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
</section>

<style>
	.background {
		background-color: #000f24;
		height: 100vh;
		color: white;
	}

	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #dddddd;
	}

	#title {
		height: 90px;
		width: 150px;
		background-image: url(../images/spinning-fish.gif);
		background-size: cover;
		background-position: center;
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
		display: flex;
		align-items: center;
		width: 100%;
	}
	a {
		color: white;
		text-decoration: none;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 1.2em;
		margin-left: 6%;
	}
</style>
