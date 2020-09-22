<script>
	import { currentStoreUser } from '../../store/store';

	import Task from "../task/Task.svelte"
	import { TASKS_STATES, FILTERS_AVAILABLE } from '../../entities/constants';
			
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	const NOT_FOUND_ANY = process.env.external.not_found;
	console.log('NOT_FOUND_ANY', NOT_FOUND_ANY)
	export let title
	export let data	
	export let done	

	$: filterAll = true
	$: tasksData = [...data].filter(task => {
		if(!filterAll && !!$currentStoreUser){
			return task === $currentStoreUser._id
		} else {
			return true;
		}
	})
	

	export const uiCreateNewTask = () => {
		const _tasksData = [...tasksData, {
			isNew: true,
			state: TASKS_STATES.OPEN
		}];
		tasksData = _tasksData;
	}

	export const toggleFilter = () => {
		filterAll = !filterAll
	}

	
</script>
			
<style type="text/scss">
	@import './task-card-container.sass';
	@import '../../styles/inputs.sass';	
</style>

<div class="task-card-container">
	<div class="options-container">
		<h3>{title}</h3>
		<div class="filters-container">
			<div on:click={toggleFilter} class={filterAll ? "filter-box all-filters selected" : "filter-box all-filters"}>
				ALL
			</div>
			<div on:click={toggleFilter} class={!filterAll ? "filter-box all-filters selected" : "filter-box all-filters"}>
				CURRENT USER
			</div>
		</div>
	</div>
	
	{#if !done}
		<span class="add-task" on:click={uiCreateNewTask}>
			<i class="fas fa-plus-circle"></i>
			Add New Task
		</span>
	{/if}

	<div class="cards-container">
		{#if !!tasksData.length}
			{#each tasksData as task}
				<Task task={task}
					on:DELETE_TASK
					on:UI_DELETE_NEW
					on:UPDATE_TASK
					on:CREATE_NEW_TASK
				/>
			{/each}	
		{:else}
			<div class="not-found-any-container">
				<img class="not-found-any" src={NOT_FOUND_ANY}  alt="no-tasks"/>
				<h2>It seems you don't have any task, try adding one!</h2>
			</div>
		{/if}
		
	</div>
</div>	