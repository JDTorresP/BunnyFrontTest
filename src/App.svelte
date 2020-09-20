<script>
	import Header from "./components/header/Header.svelte"
					
	import TaskContainer from "./components/task-container/TaskContainer.svelte"
					
	
	import UsersContainer from "./components/users-container/UsersContainer.svelte"
					
	
	import { genericDataUrl, fetchAvatar } from './services/shared';

	let promise = Promise.resolve([]);
	let genericAvatar = genericDataUrl();
	
	async function fetchUsers() {
		const response = await self.fetch('https://api.github.com/users?per_page=5');

		if (response.ok) {
  		return response.json();
			
		} else {
			throw new Error(users);
		}
	}

  function handleClick() {
		// Now set it to the real fetch promise 
    promise = fetchUsers();
    disabled = true;
	}
</script>
<main>
	<Header/>
	<div class="aplication-container">
		<UsersContainer/>
		<TaskContainer/>

	</div>
	<a class="me-by" href="https://github.com/JDTorresP" target="_blank">
        Dev with &#129365 &#10084 by Joan
    </a>


	

	<!-- <button on:click={ handleClick } { disabled } >
		Load Users
	</button>
	
	{#await promise}
		<p>...waiting</p>
	{:then users}
	  {#each users as {login, url} (login) }
		<h3>{login}</h3>
		<img height="100" src={ genericAvatar }	alt={ login } use:fetchAvatar={ url }/>
	  {/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await} -->
</main>

<style type="text/scss">
	@import './styles/normalize.sass';
	@import './styles/fonts.sass';
	@import './app.sass';
</style>
