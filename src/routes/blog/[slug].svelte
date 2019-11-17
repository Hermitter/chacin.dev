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
	export let post;

	import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons';
	import Icon from 'svelte-awesome/components/Icon.svelte'

	console.log(post);
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
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
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
