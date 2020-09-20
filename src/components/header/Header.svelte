<script>
	const URL_LOGO="https://res.cloudinary.com/caavat/image/upload/v1600621137/Bunny/bunny.png"; 
	const ALT="bunny_logo"
	const GENERAL_TITLE="Bunny Task Manager";
</script>
			
<style type="text/scss">
	@import './header.sass';
	@import '../../styles/fonts';		
</style>
<div class="header-bn">
	<img src={URL_LOGO} alt={ALT}>
	<h1 class="header-title">{GENERAL_TITLE}</h1>
</div>