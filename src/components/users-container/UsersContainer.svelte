<script>
	import UserCard from "../user-card/UserCard.svelte"				
	import BublesContainer from "../bubles-container/BublesContainer.svelte"
	const sectionTitle = 'Team';				
</script>

<div class="users-container">
	<h1 class="title-major">{sectionTitle}</h1>
	<div class="users-sections">
		<UserCard/>
		<BublesContainer/>	
	</div>	
</div>

<style type="text/scss">
	@import '../../styles/fonts.sass';
	@import './users-container.sass';		
</style>