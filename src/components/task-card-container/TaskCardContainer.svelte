<script>
	import Task from "../task/Task.svelte"
	import { TASKS_STATES } from '../../entities/constants';
			
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let title
	export let data	
	export let done	

	$: tasksData = data

	export const uiCreateNewTask = () => {
		const _tasksData = [...tasksData, {
			isNew: true,
			state: TASKS_STATES.OPEN
		}];
		tasksData = _tasksData;
	}
	
</script>
			
<style type="text/scss">
	@import './task-card-container.sass';
	@import '../../styles/inputs.sass';	
</style>

<div class="task-card-container">
	<h3>{title}</h3>
	{#if !done}
		<span class="add-task" on:click={uiCreateNewTask}>
			<i class="fas fa-plus-circle"></i>
			Add New Task
		</span>
	{/if}

	<div class="cards-container">
		{#each tasksData as task}
			<Task task={task}
				on:DELETE_TASK
				on:UI_DELETE_NEW
				on:UPDATE_TASK
				on:CREATE_NEW_TASK
			/>
		{/each}	
	</div>
</div>	