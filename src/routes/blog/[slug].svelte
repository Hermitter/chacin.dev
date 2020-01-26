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
	// current url
	let post_url = "https://chacin.dev/blog/"+post.title.split(" ").join("-").toLowerCase();

	// code block theme
	import "highlight.js/styles/dracula.css"
	// Disqus comments
	import Comments from '../../components/Comments.svelte';

	import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons';
	import Icon from 'svelte-awesome/components/Icon.svelte'
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	:global(#sapper) {
		background: #0d0c0c;
	}

	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(code) {
		background: #0d0c0c;
		font-family: menlo, inconsolata, monospace;
		font-size: calc(1em - 2px);
		color: #f8f8f2;
		padding: 0.2em 0.4em;
		border-radius: 2px;
	}

	.content :global(pre) {
		background: #0d0c0c;
		border-radius: 5px;
		padding: 1em;
		margin: .5em 0;
		overflow-x: auto;
		border-style: solid;
		border-width: 1px;
		border-color:#ff3e00;
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

	.meta-data p{
		display: block;
		margin:0;
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

	.icon-vAlign-fix {
		vertical-align: sub;
	}

	p span {
		margin-right: 5px;
	}

	#comments {
		margin-top: 55px;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

				
<div class="meta-data">
	<p><span class="icon-vAlign-fix"><Icon data={faCalendar}/></span> {post.date}</p>
	<p><span class="icon-vAlign-fix"><Icon data={faClock}/></span> {post.printReadingTime}</p>
</div>

<div class='content'>
	{@html post.html}
</div>

<div id="comments">
<Comments page_url={post_url} page_identifier={post_url}/>
</div>