<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
export let posts;
import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons';
import Icon from 'svelte-awesome/components/Icon.svelte'
</script>

<style>
	a {
		outline-style: none;
		text-decoration: none;
	}

	a:click {
		background-color: red;
	}

	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
		list-style-type: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	li {
		max-width: 230px;
		border-color: rgb(255,62,0);
		border-style: solid;
		border-width: 1px;
		border-radius: 0 0 2% 2%;
		margin: 5px;
		background-color: #090909;
		text-align: center;
		-webkit-transition: 0.1s;
		transition: 0.1s;
	}

	li:hover {
		box-shadow: 0px 0px 0px 2px rgb(255,62,0)
	}

	img {
		background-color: #1c1b1b;
		width: 100%;
		height: 180px;
	}

	.meta-data p{
		display: block;
		margin:0;
		font-size: 15px;
		padding-left: 10px;
		padding-right: 10px;
	}

	.meta-data {
		width: 100%;
		text-align: left;
		background-color: rgb(48, 49, 49);
	}

	.icon-vAlign-fix {
		vertical-align: sub;
	}

	p span {
		margin-right: 5px;
	}

	.post-desc {
		padding-right: 5px;
		padding-left: 5px;
	}

</style>

<svelte:head>
	<title>Blog | Carlos Chacin</title>
</svelte:head>

<h1>Recent posts</h1>

<!-- For Each Post -->
<ul>
	{#each posts as post}
		<li>
			<a draggable="false" rel='prefetch' href='blog/{post.slug}'>
				<img alt='{post.title}' src='{post.poster}'/><br/>
				<h2>{post.title}</h2>
				
				<div class="meta-data">
					<p><span class="icon-vAlign-fix"><Icon data={faCalendar}/></span> {post.date}</p>
					<p><span class="icon-vAlign-fix"><Icon data={faClock}/></span> {post.readingTime}</p>
				</div>

				<p class="post-desc">{post.description}</p>
			</a>
		</li>
	{/each}
</ul>