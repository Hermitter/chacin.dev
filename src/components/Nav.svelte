<script>
	export let segment;
</script>

<style>
	nav {
		color: #fff;
		background-color: rgb(36, 41, 46);
		border-bottom: 1px solid rgb(80, 115, 134);
		font-weight: 300;
		padding: 0 1em;
		font-weight: 400;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
		-webkit-transition: 0.1s;
		transition: 0.1s;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		outline-style: none;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	
	li:hover {
		background-color: rgb(255,62,0);
	}

	li:active {
		background-color: rgba(255, 64, 0, 0.719);
	}

</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>Home</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>Blog</a></li>
	</ul>
</nav>