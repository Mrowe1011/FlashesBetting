<script>
	import { currentUser } from '../stores/stores';

	import Profile from './nav.svelte';
</script>

{#if $currentUser}
	<Profile currentUser={$currentUser} />
	<slot />
{:else}
	<h1>You got signed out</h1>
	<a href="/" style="color: black;">sign back in here</a>
{/if}
