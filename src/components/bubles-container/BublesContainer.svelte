<script>
	let AVATAR_URL = process.env.external.avatar_path;
	let sectionTitle = "Other Ones"
	let seeMore = "See More"
	let userName = "Charlie"
</script>
			
<style type="text/scss">
	@import './bubles-container';	
</style>
<div class="bubles-container">
	<h2>{sectionTitle}</h2>
	<ul class="users-bubles-list">
		<li class="user-line">
			<img class="user-logo-buble" src={`${AVATAR_URL}/${userName}`} alt="user-logo"/>
			{userName}
		</li>
	</ul>
	
	<div class="see-more-opt">
		<i class="fas fa-plus"></i>
		{seeMore}
	</div>
</div>