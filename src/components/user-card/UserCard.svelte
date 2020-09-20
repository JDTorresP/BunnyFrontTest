<script>
	export let IMG_URL = process.env.external.avatar_path;
	export let userName = "Joan Torres"
	export let pending = "4 Pending Tasks"
</script>
			
<style type="text/scss">
	@import './user-card';		
</style>
<div class="user-card">
	<img class="user-logo" src={`${IMG_URL}/${userName}`} alt="user-logo"/>
	<div class="user-info">
		<h2>{userName}</h2>
		<p>{pending}</p>
	</div>	
</div>