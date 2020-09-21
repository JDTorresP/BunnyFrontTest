<script>
	import { usersData, tasksData } from './store/store.js';
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Loader from './components/loader/Loader.svelte'
	import Header from "./components/header/Header.svelte"				
	import TaskContainer from "./components/task-container/TaskContainer.svelte"
	import UsersContainer from "./components/users-container/UsersContainer.svelte"
				
	const BASE_API = process.env.api.base_path;
	const USERS_CRUD = process.env.api.user.crud_users;
	const TASK_CRUD = process.env.api.task.crud_tasks;

	let isLoadingUsers = false;
	let hasErrorUsers = false;

	let isLoadingTasks = false;
	let hasErrorTasks = false;
	
	onMount(async () => {
		refreshAllUsers();
		refreshAllTask();
	});

	function refreshAllUsers() {
		isLoadingUsers = true
		fetchUsers().then(users => {
			usersData.update(dat => {
				return dat = [...users]
			});
			hasErrorUsers = false;
			isLoadingUsers = false;
		}).catch(() => {
			hasErrorUsers = true;
			isLoadingUsers = false;
		})
	}

	function refreshAllTask() {
		isLoadingTasks = true
		fetchTasks().then(tasks => {
			tasksData.update(dat => {
				return dat = [...tasks]
			});
			hasErrorTasks = false;
			isLoadingTasks = false;
		}).catch(() => {
			hasErrorTasks = true;
			isLoadingTasks = false;
		})
	}
	
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
		refreshAllUsers();
	}
	function retryFetchTasks(){
		refreshAllTask();
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

	async function createTask(event) {
		const task = event.detail.task;
		const user = !!$usersData.length ? $usersData.reverse()[0] : null;
		if(!user) return;
		console.log('task', task);
		const res = await fetch(`${BASE_API}${TASK_CRUD}`, {
			method: 'POST',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				description: task.description,
				status: task.status,
				user_id: user._id
			})
		})
		const status = await res.status
		console.log('status', status);
		if (status === 201) {
			retryFetchTasks();
		}
	}

	async function updateTask(event) {
		const task = event.detail.task;
		console.log('task',task)
		const res = await fetch(`${BASE_API}${TASK_CRUD}/${task._id}`, {
			method: 'PATCH',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				description: task.description,
				state: task.state,
				user_id: task.user_id
			})
		})
		const status = await res.status
		if (status === 200) {
			retryFetchTasks();
		}
	}

	async function deleteTask(event) {
		const task = event.detail.task;
		const res = await fetch(`${BASE_API}${TASK_CRUD}/${task._id}`, {
			method: 'DELETE'
		})
		const status = await res.status
		if (status === 200) {
			retryFetchTasks();
		}
	}
	
	
</script>
<main>
	<Header/>
	<div class="aplication-container">
		{#if isLoadingUsers}
			<span transition:fade="{{ duration: 300 }}" >
				<Loader></Loader>
				<p>...fetching data</p>
			</span>
		{:else if  hasErrorUsers}
			<button class="retry-btn" on:click={retryFetchUsers}>Something went wrong! Click me to retry! :)</button>
		{:else}
			{#if !!$usersData.length}
				<span transition:fade="{{ duration: 1000 }}">
					<UsersContainer 
						on:UPDATE_USER={updateUser} 
						on:DELETE_USER={deleteUser} 
						on:CREATE_NEW_USER={createUser} 
					/>
				</span>
			{/if}
		{/if}

		{#if isLoadingTasks}
			<span transition:fade="{{ duration: 300 }}" >
				<Loader></Loader>
				<p>...fetching data</p>
			</span>
		{:else if  hasErrorTasks}
			<button class="retry-btn" on:click={retryFetchTasks}>Something went wrong! Click me to retry! :)</button>
		{:else}
			{#if !!$tasksData.length}
				<span transition:fade="{{ duration: 1000 }}">
					<TaskContainer 
						on:CREATE_NEW_TASK = {createTask}
						on:DELETE_TASK = {deleteTask}
						on:UPDATE_TASK = {updateTask}
					/>
				</span>
			{/if}
		{/if}

	</div>
	<a class="me-by" href="https://github.com/JDTorresP" target="_blank">
        Dev with &#129365 &#10084 by Joan
    </a>
	
</main>

<style type="text/scss">
	@import './styles/normalize.sass';
	@import './styles/fonts.sass';
	@import './app.sass';
</style>
