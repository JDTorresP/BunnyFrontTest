<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const notImage = process.env.external.not_image;
	export let IMG_URL = process.env.external.avatar_path;
	export let pending = "4 Pending Tasks"
	const NEW_NAME = "Please Write A Name"
	export let newUserName = NEW_NAME
	export let user
	export let isCreating	
	let showWarn = false	

	export const onFocusOut = () => {
		dispatch('UPDATE_USER', {
			user: user
		});
	}
	export const deleteUser = () => {
		dispatch('DELETE_USER', {
			user: user
		});
	}
	export const uiCreateNewUser = () => {
		dispatch('IU_CREATE_NEW_USER', {
			user: user
		});
	}
	export const createNewUser = () => {
		if (newUserName === NEW_NAME || !newUserName) {
			showWarn = true	
		} else {
			showWarn = false
		}
		if(!showWarn){
			dispatch('CREATE_NEW_USER', {
				user: {
					name: newUserName
				}
			});
		}
	}

	export const clearNewName = () => {
		if (newUserName === NEW_NAME) {
			newUserName = '';
			showWarn = false
		} 
	}

	export const goBack = () => {
		dispatch('GO_BACK');
	}
	
</script>
			
<style type="text/scss">
	@import './user-card';
	@import '../../styles/animations';		
</style>
<div class="user-card">
	{#if !isCreating}
		{#if !!user}
			<img class="user-logo" src={`${IMG_URL}/${user.name}`} alt="user-logo"/>
			<div class="user-info">
				<h2 contenteditable="true" on:blur={onFocusOut} bind:textContent={user.name}>{user.name}</h2>
				<p contenteditable="true">{pending}</p>
				<i class="fas fa-user-plus add" on:click={uiCreateNewUser}>
					<span class="tooltiptext">Add New User</span>
				</i>
				<i class="fas fa-user-minus erase" on:click={deleteUser}>
					<span class="tooltiptext">Erase Current User</span>
				</i>
			</div>	
		{:else}
			<img class="user-logo" src={notImage} alt="user-logo"/>
			<div class="user-info">
				<h2>Not Found User</h2>
			</div>	
		{/if}
	{:else}
		<div class="user-info">
			<h2 class={'focused'} contenteditable="true" on:focus={clearNewName} bind:textContent={newUserName}>{newUserName}</h2>
			<div class="new-options">
				<div class="add-user" on:click={createNewUser}>
					<i class="fas fa-user-plus add" ></i> Add New User
				</div>
				<div class="go-back" on:click={goBack}>
					<i class="fas fa-chevron-left"></i> Go back
				</div>
			</div>
			
			{#if showWarn}
				<p class="shake-horizontal warning">** Please provide a name ** </p>
			{/if}			
		</div>	
	{/if}
	
</div>