<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let AVATAR_URL = process.env.external.avatar_path;
	let sectionTitle = "Other Ones"
	let seeMore = "See More"
	let userName = "Charlie"
	export let users
	export const setCurrentUser = (user) => {
		dispatch('SET_USER', {
			user
		});
	}
</script>
			
<style type="text/scss">
	@import './bubles-container';	
</style>
<div class="bubles-container">
	{#if !!users}
		<h2>{sectionTitle}</h2>
		<ul class="users-bubles-list">
			{#each users as user}
				<li class="user-line" on:click={setCurrentUser(user)}>
					<img class="user-logo-buble" src={`${AVATAR_URL}/${user.name}`} alt="user-logo"/>
					{user.name}
				</li>
			{/each}	
		</ul>
		<div class="see-more-opt">
			<i class="fas fa-plus"></i>
			{seeMore}
		</div>
	{:else}
		<h2>No available Users</h2>
	{/if}
	
</div>