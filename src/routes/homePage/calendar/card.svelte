<script>
	import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
	import { currentUser, db, games } from '../../stores/stores';
	export let hovering;
	export let id;
	export let Description = 'fuck';
	export let startDate;
	export let image1;
	export let team1;
	export let image2 =
		'https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/kentstatesports.com/images/responsive_2020/nav_main.svg';
	export let team2 = 'Kent State';
	export let betAmount = 0;
	export let betAmount2 = 0;
	import { fly } from 'svelte/transition';
	function enter() {
		hovering = true;
	}

	function leave() {
		hovering = false;
	}

	const addTeamOne = (id, team1) => {
		setDoc(
			doc(db, 'Games', String(id)),
			{
				bettors: {
					[$currentUser.email]: {
						betAmount: betAmount,
						team: team1
					}
				}
			},
			{ merge: true }
		);

		setDoc(
			doc(db, 'users', $currentUser.uid),
			{ activeBets: { ['game ' + id]: { id, team1, betAmount } } },
			{ merge: true }
		);
		updateDoc(doc(db, 'users', $currentUser.uid), { points: increment(-betAmount) });
	};
	const addTeamTwo = (id) => {
		setDoc(
			doc(db, 'Games', String(id)),
			{
				bettors: {
					[$currentUser.email]: {
						betAmount: betAmount,
						team: 'Kent State'
					}
				}
			},
			{ merge: true }
		);

		setDoc(
			doc(db, 'users', $currentUser.uid),
			{ activeBets: { ['game ' + id]: { id, team1: 'Kent State', betAmount2 } } },
			{ merge: true }
		);
		updateDoc(doc(db, 'users', $currentUser.uid), { points: increment(-betAmount2) });
	};
</script>

<slot {Description} {id} {startDate} {image1} {team1} {i}>
	<div {id} class="games" transition:fly={{ x: 100, duration: 200 }}>
		<div class="teams" on:mouseenter={enter} on:mouseleave={leave}>
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
						<label for="">Bet amount:</label>
						<input type="text" bind:value={betAmount} />
						<button type="submit">Place Bet</button>
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
						<label for="">Bet amount:</label>
						<input type="text" bind:value={betAmount2} />
						<button type="submit">Place Bet</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</slot>

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
