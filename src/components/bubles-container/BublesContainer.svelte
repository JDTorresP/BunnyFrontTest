<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let AVATAR_URL = process.env.external.avatar_path;
	let sectionTitle = "Fellows"
	$: seeMore = !showMore ? "See More" : "See Less"
	let showMore = false;
	export let users
	export const setCurrentUser = (user) => {
		dispatch('SET_USER', {
			user
		});
	}
	export const toggleShowMore = () => {
		showMore = !showMore
	}
</script>
			
<style type="text/scss">
	@import './bubles-container';	
</style>
<div class={showMore ? "bubles-container expand" : "bubles-container"}>
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
		<div on:click={toggleShowMore} class="see-more-opt">
			{#if showMore}
				<i class="fas fa-arrow-circle-left"></i>
			{:else}
				<i class="fas fa-plus"></i>
			{/if}
			{seeMore}
		</div>
	{:else}
		<h2>No available Users</h2>
	{/if}
	
</div>