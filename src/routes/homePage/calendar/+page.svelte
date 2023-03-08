<script>
	import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
	import { currentUser, db, games } from '../../stores/stores';
	import Card from './card.svelte';
</script>

<section class="background">
	{#await games then games}
		<div class="container">
			{#each games as { Description, id, startDate, image1, team1 }, i}
				<Card {Description} {id} {startDate} {image1} {team1} />
			{/each}
		</div>
	{/await}
</section>

<style>
	.background {
		background-color: #000f24;
	}
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
