<script>
	import { signout, auth } from '../../stores/stores';
	import { onAuthStateChanged } from 'firebase/auth';
	//import '../../app.css';
	let currentUser;
	onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser = user;
		}
	});
</script>

<div style="padding-left: 35px; padding-top: 30px; padding-bottom: 30px;">
	<h1>Here goes the leaderboard...</h1>

	<p>
		This is where all of the drecriptive text will go. This data right now is dummy data and isn't
		hooked up to the backend.
	</p>
</div>

<!-- Table Component  -->
<div class="flex flex-col">
	<div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
		<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
			<div class="overflow-hidden">
				<table class="min-w-full">
					<thead class="bg-white border-b">
						<tr>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Place
							</th>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								First
							</th>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Last
							</th>
							<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Score
							</th>
						</tr>
					</thead>
					<tbody>
						<tr class="bg-gray-100 border-b">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Mark </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Otto </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								879,721
							</td>
						</tr>
						<tr class="bg-white border-b">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Jacob </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Dillan </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								500,000
							</td>
						</tr>
						<tr class="bg-gray-100 border-b">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Mark </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Twen </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								450,000
							</td>
						</tr>
						<tr class="bg-white border-b">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Bob </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> Dillan </td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								300,000
							</td>
						</tr>
						<tr class="bg-gray-100 border-b">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
							<td
								colspan="2"
								class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
							>
								Larry the Bird
							</td>
							<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								123,756
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
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
