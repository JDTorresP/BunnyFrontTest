<script>
	export let task
	import { usersData } from '../../store/store';
	import { createEventDispatcher } from 'svelte';
	import { TASKS_STATES } from '../../entities/constants';

	const dispatch = createEventDispatcher();
	const notImage = process.env.external.not_image;
	const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	export let IMG_URL = process.env.external.avatar_path;

	const initDescription = "Write A Description!";
	let newDescription = initDescription;
	let initialCheck = false;

	export const updateTask = (task, changeState = false) => {
		const _task = task;
		console.log('WILL UPDATE_TASK1', _task)
		if (changeState) {
			if (_task.state === TASKS_STATES.CLOSED){
				_task.state = TASKS_STATES.OPEN
			}else {
				_task.state =TASKS_STATES.CLOSED
			}
		} 
		console.log('WILL UPDATE_TASK', _task)
		dispatch('UPDATE_TASK', {
			task: _task
		});	
	}

	export const createNewTask = () => {
		if (!!newDescription || newDescription !== initDescription) {
			dispatch('CREATE_NEW_TASK', {
				task: {
					description: newDescription,
					status: TASKS_STATES.OPEN
				}
			});
		}
	}

	export const deleteTask = (task) => {
		dispatch('DELETE_TASK', {
			task: task
		});
	}

	export const uiDeleteNew = () => {
		dispatch('UI_DELETE_NEW');
	}

	function isChecked(state){
		return state === TASKS_STATES.CLOSED
	}

	function findUrlById(userId) {
		console.log('DATA $usersData', userId, $usersData)
		let filterArray = [];
		if(!!$usersData.length) filterArray = $usersData.filter(u => u._id === userId)
		console.log('filterArray', filterArray);
		return !!filterArray.length ? `${IMG_URL}/${filterArray[0].name}` : notImage;
	}
 
	let doneState = 'Done!';
	let todoState = 'Todo';

</script>
			
<style type="text/scss">
	@import './task.sass';
	@import '../../styles/inputs.sass';	
</style>
{#if task.isNew}
	<div class="task-card">
		<span class="erase-task" on:click={uiDeleteNew()}>
			<i class="fas fa-times-circle"></i>
		</span>
		<img src={`${notImage}`} alt="user-img">
		<h4 
			class="description-card focused"
			contenteditable="true" 
			on:blur={createNewTask} 
			bind:textContent={newDescription}>
			{newDescription}
		</h4>
		<div class="state-container">
			<input class="tgl tgl-flip" id="cb5" type="checkbox" checked={initialCheck}/>
			<label class="tgl-btn" data-tg-off="{todoState}" data-tg-on="{doneState}" for="cb5"></label>
		</div>
	</div>
{:else}
	<div class="task-card">
		<span class="erase-task" on:click={deleteTask(task)}>
			<i class="fas fa-times-circle"></i>
		</span>
		<img src={`${findUrlById(task.user_id)}`} alt="user-img">
		<h4 
			class="description-card"
			contenteditable="true" 
			on:blur={updateTask(task)} 
			bind:textContent={task.description}
		>{task.description}</h4>
		<div class="state-container">
			<input class="tgl tgl-flip" id={randomId} type="checkbox" on:click={updateTask(task, true)} checked={isChecked(task.state)}/>
			<label class="tgl-btn" data-tg-off="{todoState}" data-tg-on="{doneState}" for={randomId}></label>
		</div>
	</div>
{/if}