<script>
	import { currentUser, db } from '../../stores/stores';
	import { getDoc, doc, updateDoc } from 'firebase/firestore';
	import { deleteUser, updateEmail } from 'firebase/auth';


	function confirmDelete() {
  // display the dialog box
  	const dialogBox = document.getElementById('delete-dialog');
  	dialogBox.classList.remove('hidden');
}

	
	let Fname;
	async function submitChangeUsername() {
		await updateDoc(doc(db, 'users', $currentUser.email), {
			name: Fname
		});
		location.reload();
	}
	let email;
	async function submitChangeEmail() {
		await updateEmail($currentUser, email).catch((error) => {
			alert(error);
		});

		location.reload();
	}
	async function deleteAccount() {
		deleteUser($currentUser);

		location.reload();
	}
	async function getData() {
		let profile = [];
		let querySnapshot = await getDoc(doc(db, 'users', $currentUser.uid));
		profile = querySnapshot.data();
		return profile;
	}
	
</script>

<div class="background">
	{#await getData() then profile}
		<div class="container">
			<h1 class="text-xl font-semibold">Account</h1>
			<h2>Profile</h2>
			<p>This information will be displayed publicly.</p>
			<div>
				<h1>Username: {profile.name}</h1>
				<form on:submit|preventDefault={submitChangeUsername}>
					<div>
						<label for="name">New username:</label>
						<input type="text" id="name" name="name" bind:value={Fname} />
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
			<h3>The danger zone! (must sign in recently)</h3>
			<div>
				<h1>Email: {$currentUser.email}</h1>
				<form on:submit|preventDefault={submitChangeEmail}>
					<div>
						<label for="name">New email:</label>
						<input type="text" id="name" name="name" bind:value={email} />
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
			<div>
				<form on:submit|preventDefault={deleteAccount}>
					<button type="submit">Delete Account ☠</button>
				</form>
			</div>
		</div>
	{/await}
	{#await getData() then profile}

	<div class="container mx-auto my-8">
		<form class="max-w-lg mx-auto">
		  <h1 class="text-3xl font-bold mb-6">Settings</h1>
	  
		  <!-- Example settings -->
		  <div class="mb-6">
			<label class="block font-bold mb-2" for="username">Change {profile.name}'s Username</label>
			<form on:submit|preventDefault={submitChangeEmail}>
				<div class="flex items-center">
					
					<input class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New username" >
					<button class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
						Change
					</button>
				</div>
			</form>
		  </div>
	  
		  <div class="mb-6">
			<label class="block font-bold mb-2" for="email">Change Email</label>
			<div class="flex items-center">
			  <input class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="New email">
			  <button class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
				Change
			  </button>
			</div>
		  </div>
	  
		  <div class="mb-6">
			<label class="block font-bold mb-2" for="current-email">Current Email:</label>
			<div class="bg-gray-100 rounded-lg py-2 px-3">
			  <p class="text-gray-800">{$currentUser.email}</p>
			</div>
		  </div>
	  
		  <div class="mb-6 flex justify-center">
			<div class="flex items-center">
			<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" id="deleteAccountButton">
			  Delete Account
			</button>
			</div>
		  </div>
		</form>
		
		<!-- Confirmation dialog box -->
		<div class="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center" id="deleteAccountModal" style="display: none">
		  <div class="bg-white rounded-lg shadow-lg p-6">
			<p class="text-lg font-semibold mb-4">Are you sure you want to delete your account?</p>
			<div class="flex justify-end">
			  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline" type="button" id="cancelDeleteButton">
				Cancel
			  </button>
			  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" id="confirmDeleteButton">
				Delete
			  </button>
			</div>
		  </div>
		</div>
	  </div>
	  
	  {/await}

</div>

<style>
	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.container {
		display: flex;
		text-align: center;
		flex-direction: column;
		width: 60%;
		background-color: rgba(255, 255, 255, 0.945);
		border-radius: 15px;
	}

	.background {
		background-color: #000f24;
		height: 100vh;
	}
</style>
