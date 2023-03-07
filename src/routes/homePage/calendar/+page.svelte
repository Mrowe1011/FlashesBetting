<script>
	import { getDocs, collection, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
	import { currentUser, db, games } from '../../stores/stores';

	let image2 =
		'https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/kentstatesports.com/images/responsive_2020/nav_main.svg';
	let team2 = 'Kent State';
	let betAmount = 0;
	let betAmount2 = 0;
	const addTeamOne = (id, team1) => {
		setDoc(
			doc(db, 'Games', String(id)),
			{
				bettors: {
					[currentUser.email]: {
						betAmount: betAmount,
						team: team1
					}
				}
			},
			{ merge: true }
		);

		setDoc(
			doc(db, 'users', currentUser.uid),
			{ activeBets: { ['game ' + id]: { id, team1, betAmount } } },
			{ merge: true }
		);
		updateDoc(doc(db, 'users', currentUser.uid), { points: increment(-betAmount) });
	};
	const addTeamTwo = (id) => {
		setDoc(
			doc(db, 'Games', String(id)),
			{
				bettors: {
					[currentUser.email]: {
						betAmount: betAmount,
						team: 'Kent State'
					}
				}
			},
			{ merge: true }
		);

		setDoc(
			doc(db, 'users', currentUser.uid),
			{ activeBets: { ['game ' + id]: { id, team1: 'Kent State', betAmount2 } } },
			{ merge: true }
		);
		updateDoc(doc(db, 'users', currentUser.uid), { points: increment(-betAmount2) });
	};
</script>

{#await games then games}
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
					<div>
						<form on:submit|preventDefault={() => addTeamOne(id, team1)}>
							<label for="">Bet amount:</label>
							<input type="text" bind:value={betAmount} />
							<button type="submit" />
						</form>
					</div>
					<hr />
					<div class="single">
						<img src={image2} alt="" />
						<h1>
							{team2}
						</h1>
					</div>
					<div>
						<form on:submit|preventDefault={() => addTeamTwo(id, team1)}>
							<label for="">Bet amount:</label>
							<input type="text" bind:value={betAmount2} />
							<button type="submit" />
						</form>
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
