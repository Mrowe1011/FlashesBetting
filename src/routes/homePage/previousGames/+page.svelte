<script>
	import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
	import { currentUser, db, games } from '../../stores/stores';
	import Card from './card.svelte';
</script>

<section class="background">
	{#if currentUser}
		{#await games then games}
			<div class="container">
				{#each games as { Description, id, startDate, image1, team1, bettors, finished, HomeScore, awayScore }, i}
					<Card
						currentUser={$currentUser}
						{Description}
						{id}
						{startDate}
						{image1}
						{team1}
						{bettors}
						{finished}
						{HomeScore}
						{awayScore}
					/>
				{/each}
			</div>
		{/await}
	{/if}
</section>

<style>
	:global(html) {
		background-color: #000f24;
	}
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
