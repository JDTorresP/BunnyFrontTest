<script>
	import { usersData, currentStoreUser } from '../../store/store.js';

	import { onMount, afterUpdate, beforeUpdate, onDestroy } from "svelte";
	import UserCard from "../user-card/UserCard.svelte"				
	import BublesContainer from "../bubles-container/BublesContainer.svelte"
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const sectionTitle = 'Team';

	let isCreating = false
	$: currentUser = !!$usersData.length ? [...$usersData].reverse()[0] : null;
	$: usersSliced = !!$usersData.length ? [...$usersData].reverse().slice(1) : null;
	
	onMount(async () => {
		console.log("Mounted USERS", $usersData);
		currentStoreUser.update(dat => {
			return dat = currentUser || {}
		});
	});

	beforeUpdate(() => {
		console.log("beforeUpdate APP", $usersData);
	});

	afterUpdate(() => {
        console.log("afterUpdate USERS", $usersData);
	});

	onDestroy(() => {
		console.log("Destroyed USERS", $usersData);
	});

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