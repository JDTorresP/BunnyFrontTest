<script>
	import TaskCardContainer from "../task-card-container/TaskCardContainer.svelte"
	const sectionTitle = "Tasks";	
</script>
			
<style type="text/scss">
	@import './task-container.sass';	
</style>
<div class="task-container">
	<h1 class="title-major">{sectionTitle}</h1>
	<div class="task-columns-container">
		<TaskCardContainer/>
		<TaskCardContainer/>
	</div>
</div>