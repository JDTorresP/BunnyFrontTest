<script>
	import { tasksData } from '../../store/store.js';
	import TaskCardContainer from "../task-card-container/TaskCardContainer.svelte"
	import { TASKS_STATES } from '../../entities/constants';

	const sectionTitle = "Tasks";

	$: console.log('tasksOpen', tasksOpen);

	$: tasksOpen =  !!$tasksData ? $tasksData.filter(i => i.state === TASKS_STATES.OPEN) : [];
	$: tasksClosed =  !!$tasksData ? $tasksData.filter(i => i.state === TASKS_STATES.CLOSED) : [];

	export const onFocusOut = () => {
		dispatch('UPDATE_USER', {
			user: user
		});
	}
	
</script>
			
<style type="text/scss">
	@import '../../styles/fonts.sass';
	@import './task-container.sass';	
</style>
<div class="task-container">
	<h1 class="title-major">{sectionTitle}</h1>
	<div class="task-columns-container">
		{#if !!tasksOpen.length}
			<TaskCardContainer 
				on:DELETE_TASK
				on:CREATE_NEW_TASK
				on:UPDATE_TASK
				title="Pending Tasks" 
				data={tasksOpen} done={false}
			/>
		{/if}
		{#if !!tasksClosed.length}
			<TaskCardContainer on:UPDATE_TASK on:DELETE_TASK title="Completed Tasks" data={tasksClosed} done={true}/>
		{/if}
	</div>
</div>