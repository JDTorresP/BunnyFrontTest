<script>
	let sectionTitle = 'Pending Tasks';
	let yes = true;
	let description = 'Terminar front';
	let doneState = 'Done!';
	let todoState = 'Todo';
</script>
			
<style type="text/scss">
	@import './task-card-container.sass';
	@import '../../styles/inputs.sass';	
</style>

<div class="task-card-container">
	<h3>{sectionTitle}</h3>
	<div class="cards-container">
		<div class="task-card">
			<h4 class="description-card">{description}</h4>
			<div class="state-container">
				<input class="tgl tgl-flip" id="cb5" type="checkbox" checked={yes}/>
				<label class="tgl-btn" data-tg-off="{todoState}" data-tg-on="{doneState}" for="cb5"></label>
			</div>
		</div>
	</div>
</div>	