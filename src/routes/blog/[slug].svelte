<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	// html string from markdown
	export let post;
	// TODO: remove hard coded hostname
	let post_url = "https://chacin.dev/blog/" + post.title.split(" ").join("-").toLowerCase();

	// code block theme
	import "highlight.js/styles/dracula.css";

	// Disqus comments
	import Comments from '../../components/Comments.svelte';

	// Icons
	import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons';
	import Icon from 'svelte-awesome/components/Icon.svelte'

	import { onMount } from 'svelte';
	import clipboardInit from "../../js/clipboard";
	import "../../css/clipboard.css";

	onMount(async () => {
		clipboardInit();
	});
</script>

<style>
	#article-wrapper {
		margin: auto;
		position: relative;
		width: 100%;
	}

	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content {
		position: relative;
		max-width: 56em;
		margin: auto;
		z-index: 100;
	}

	.content :global(p img) {
		display: block;
		margin-right: auto;
		margin-left: auto;
	}

	.content :global(p) {
		font-size: 20px;
	}

	.content :global(h1) {
		font-size: 3.4em;
		font-weight: 500;
		margin-top: 50px;
	}

	.content :global(h2) {
		font-size: 2.7em;
		font-weight: 500;
		margin-top: 50px;
	}

	.content :global(h3) {
		font-size: 2.0em;
		font-weight: 500;
	}

	.content :global(h4) {
		font-size: 1.3em;
		font-weight: 500;
	}


	.content :global(code) {
		background: rgb(24, 26, 27);
		font-family: menlo, inconsolata, monospace;
		font-size: calc(1em - 2px);
		color: #f8f8f2;
		padding: 0.2em 0.4em;
		border-radius: 2px;
	}

	.content :global(pre) {
		background: rgb(24, 26, 27);
		border-radius: 5px;
		padding: 1em;
		margin: .5em 0;
		overflow-x: auto;
		border-style: solid;
		border-width: 1px;
		border-color: #ff3e00;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.content :global(img) {
		max-width: 100%;
	}

	.content :global(blockquote) {
		margin: 0;
		background: #1c1c1c;
		border-radius: 3px;
		padding: 0 5px 0 5px;
		border-width: 1px;
		border-color: #444;
		border-style: solid;
	}

	.content :global(blockquote) :global(p) {
		margin: 6px;
		font-size: 16px;
	}

	.meta-data p {
		display: block;
		margin: 0;
		font-size: 15px;
		padding-left: 10px;
		padding-right: 10px;
	}

	.meta-data {
		display: inline-block;
		border-radius: 5px;
		padding: 5px;
		text-align: left;
		background-color: rgb(48, 49, 49);
		margin-bottom: 40px;
	}

	/* override Icon styling */
	.meta-data p span :global(svg) {
		width: 14px !important;
		height: 16px !important;
	}

	.icon-vAlign-fix {
		vertical-align: sub;
	}

	p span {
		margin-right: 5px;
	}

	#comments {
		margin: auto;
		margin-top: 55px;
		max-width: 1196px;
	}

	/* Safari 4.0 - 8.0 */
	@-webkit-keyframes title-shadow {
		from {
			box-shadow: 0px -1733px 300px 800px #ff3e00d9;
		}

		to {
			box-shadow: 0px -733px 300px 800px #ff3e00d9;
		}
	}

	/* Standard syntax */
	@keyframes title-shadow {
		from {
			box-shadow: 0px -1733px 300px 800px #ff3e00d9;
		}

		to {
			box-shadow: 0px -733px 300px 800px #ff3e00d9;
		}
	}

	#front-cover {
		margin: auto;
		display: block;
		width: 100%;
		-webkit-animation: title-shadow 3s forwards;
		animation: title-shadow 3s forwards;
	}

	h1 {
		font-size: 50px;
		color: rgb(230, 230, 230);
		z-index: 200;
		position: relative;
	}

	#header {
		position: relative;
		margin: auto;
		max-width: 1196px;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description}>
	<meta name="keywords" content={post.keywords}>
	<meta name="author" content="co-authored by Carlos Chacin, Hermitter">

	<meta property="og:title" content={post.title}>
	<meta property="og:url" content={post_url}>
	<meta property="og:type" content="blog">
	<meta property="og:description" content={post.description}>
	<!-- TODO: remove hard coded hostname -->
	<meta property="og:image" content={"https://chacin.dev/"+post.poster}>

</svelte:head>

<div id="header">
	<h1>{post.title}</h1>
	<img id="front-cover" src={post.frontCover} alt="blog post cover image" />

	<br />
	<div class="meta-data">
		<p><span class="icon-vAlign-fix">
				<Icon data={faCalendar} />
			</span> {post.date}</p>
		<p><span class="icon-vAlign-fix">
				<Icon data={faClock} />
			</span> {post.printReadingTime}</p>
	</div>
</div>

<div id="article-wrapper">
	<article class='content'>
		{@html post.html}
	</article>
</div>

<div id="comments">
	<Comments page_url={post_url} page_identifier={post_url} />
</div>