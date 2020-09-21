<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Loader from './components/loader/Loader.svelte'
	import Header from "./components/header/Header.svelte"				
	import TaskContainer from "./components/task-container/TaskContainer.svelte"
	import UsersContainer from "./components/users-container/UsersContainer.svelte"
				
	const BASE_API = process.env.api.base_path;
	const USERS_CRUD = process.env.api.user.crud_users;
	const TASK_CRUD = process.env.api.task.crud_tasks;

	let users = Promise.resolve([]);
	let tasks = Promise.resolve([]);
	
	onMount(async () => {
		users = fetchUsers();
		tasks = fetchTasks();
	});
	
	async function fetchUsers() {
		const response = await self.fetch(`${BASE_API}${USERS_CRUD}`);
		if (response.ok) {
  			return response.json();	
		} else {
			throw new Error(response);
		}
	}
	async function fetchTasks() {
		const response = await self.fetch(`${BASE_API}${TASK_CRUD}`);
		if (response.ok) {
  			return response.json();	
		} else {
			throw new Error(response);
		}
	}

	function retryFetchUsers(){
		users = Promise.resolve([]);
		users = fetchUsers();
	}
	function retryFetchTasks(){
		tasks = fetchTasks();
	}

	async function updateUser(event) {
		const user = event.detail.user;
		const res = await fetch(`${BASE_API}${USERS_CRUD}/${user._id}`, {
			method: 'PATCH',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				name: user.name
			})
		})
		const json = await res.json()
	}

	async function createUser(event) {
		const user = event.detail.user;
		console.log('user', user);
		const res = await fetch(`${BASE_API}${USERS_CRUD}`, {
			method: 'POST',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				name: user.name
			})
		})
		const status = await res.status
		console.log('status', status);
		if(status === 201) {
			retryFetchUsers();
		}
	}
	
	async function deleteUser(event) {
		const user = event.detail.user;
		const res = await fetch(`${BASE_API}${USERS_CRUD}/${user._id}`, {
			method: 'DELETE'
		})
		const status = await res.status
		if(status === 200) {
			retryFetchUsers();
		}
	}
	
</script>
<main>
	<Header/>
	<div class="aplication-container">
		{#await users}
			<span transition:fade="{{ duration: 300 }}" >
				<Loader></Loader>
			</span>
			<p>...fetching data</p>
		{:then data}
			<span transition:fade="{{ duration: 1000 }}">
				<UsersContainer 
				on:UPDATE_USER={updateUser} 
				on:DELETE_USER={deleteUser} 
				on:CREATE_NEW_USER={createUser} 
				data={data}/>
			</span>
		{:catch error}
			<button class="retry-btn" on:click={retryFetchUsers}>Something went wrong! Click me to retry! :)</button>
		{/await}

		{#await tasks}
			<span transition:fade="{{ duration: 300 }}" >
				<Loader></Loader>
			</span>
			<p>...fetching data</p>
		{:then data}
			<span transition:fade="{{ duration: 1000 }}">
				<TaskContainer data={data}/>
			</span>
		{:catch error}
			<button class="retry-btn" on:click={retryFetchTasks}>Something went wrong! Click me to retry! :)</button>
		{/await}
		

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
