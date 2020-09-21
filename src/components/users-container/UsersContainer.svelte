<script>
	import UserCard from "../user-card/UserCard.svelte"				
	import BublesContainer from "../bubles-container/BublesContainer.svelte"
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const sectionTitle = 'Team';
	export let data	
	let isCreating = false
	let currentUser = !!data.length ? [...data].reverse()[0] : null;
	let usersSliced = !!data.length ? [...data].reverse().slice(1) : null;
	
	export const uiCreateNewUser = () => {
		isCreating = true
	}
	export const createNewUser = (event) => {
		isCreating = false
		dispatch('CREATE_NEW_USER', {
			user: event.detail.user
		});
	}

	export const setCurrentUser = (event) => {
		const oldUser = currentUser;
		const user = event.detail.user;
		const _sliced = [...usersSliced].filter(i => i._id !== user._id);
		_sliced.unshift(oldUser);

		usersSliced = _sliced;
		currentUser = user
	}

	export const goBack = () => {
		isCreating = false
	}
</script>

<div class="users-container">
	<h1 class="title-major">{sectionTitle}</h1>
	<div class="users-sections">
		<UserCard 
			on:UPDATE_USER 
			on:DELETE_USER
			on:IU_CREATE_NEW_USER={uiCreateNewUser}
			on:CREATE_NEW_USER={createNewUser}
			on:GO_BACK={goBack}
			isCreating={isCreating}
			user={currentUser}/>
		<BublesContainer
			on:SET_USER={setCurrentUser}
			users={usersSliced}/>	
	</div>	
</div>

<style type="text/scss">
	@import '../../styles/fonts.sass';
	@import './users-container.sass';		
</style>