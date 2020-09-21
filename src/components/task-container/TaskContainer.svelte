<script>
	import TaskCardContainer from "../task-card-container/TaskCardContainer.svelte"
	import { TASKS_STATES } from '../../entities/constants';
	export let data	
	const sectionTitle = "Tasks";	
	const tasksOpen =  !!data ? data.filter(i => i.state === TASKS_STATES.OPEN) : [];
	const tasksClosed =  !!data ? data.filter(i => i.state === TASKS_STATES.CLOSED) : [];
</script>
			
<style type="text/scss">
	@import '../../styles/fonts.sass';
	@import './task-container.sass';	
</style>
<div class="task-container">
	<h1 class="title-major">{sectionTitle}</h1>
	<div class="task-columns-container">
		{#if !!tasksOpen.length}
			<TaskCardContainer title="Pending Tasks" data={tasksOpen} done={false}/>
		{/if}
		{#if !!tasksClosed.length}
			<TaskCardContainer title="Completed Tasks" data={tasksClosed} done={true}/>
		{/if}
	</div>
</div>