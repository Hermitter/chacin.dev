<script>
	import Social from '../components/Social.svelte';
</script>

<style>
	h1,
	figure,
	p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0 0;
		color: rgb(255, 101, 41);
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 300px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	#profile-pic {
		width: 330px;
		height: 330px;
		border-radius: 50%;
		-webkit-animation: spin 150s linear infinite;
		-moz-animation: spin 150s linear infinite;
		animation: spin 150s linear infinite;
	}

	@-moz-keyframes spin {
		100% {
			-moz-transform: rotate(180deg);
		}
	}

	@-webkit-keyframes spin {
		100% {
			-webkit-transform: rotate(180deg);
		}
	}

	@keyframes spin {
		100% {
			-webkit-transform: rotate(180deg);
			transform: rotate(360deg);
		}
	}

	#title-caption {
		text-align: center;
		margin: 0 0 30px 0;
	}
</style>

<svelte:head>
	<title>Carlos Chacin</title>
	<meta name="description" content="Carlos' personal website and blog for tech tutorials">
	<meta name="keywords" content="portfolio,Developer,Blog,Website">
	<meta name="author" content="co-authored by Carlos Chacin, Hermitter">
</svelte:head>

<h1>Carlos Chacin</h1>
<p id="title-caption">Software Developer</p>

<figure>
	<img id="profile-pic" alt='Carlos' src='headshot.png'>
	<p><strong>A simple site to keep my notes</strong></p>
</figure>

<Social />