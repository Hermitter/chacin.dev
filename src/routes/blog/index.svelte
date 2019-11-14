<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
export let posts;
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Icon from 'svelte-awesome/components/Icon.svelte'
</script>

<style>
	a {
		outline-style: none;
		text-decoration: none;
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
		/* min-width: 300px; */
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
		background-color: white;
		width: 100%;
		height: 180px;
	}



	.read-time{
		margin:0;
		font-size: 15px;
		display: inline-block;
	}

	.meta-data {
		width: 100%;
		background-color: rgb(48, 49, 49);
	}

	/* h2 */

	/* p svg {
		vertical-align: sub;
	} */
</style>

<svelte:head>
	<title>Blog | Carlos Chacin</title>
</svelte:head>

<h1>Recent posts</h1>

<!-- For Each Post -->
<ul>
	{#each posts as post}
		<li>
			<a rel='prefetch' href='blog/{post.slug}'>
				<img alt='{post.title}' src='{post.poster}'/><br/>
				<h2>{post.title}</h2>
				
				<div class="meta-data">
					<p class="read-time"><Icon scale="0.8" data={faClock}/> {post.readingTime}</p>
				</div>
			</a>
		<p>{post.description}</p>
		</li>
	{/each}
</ul>