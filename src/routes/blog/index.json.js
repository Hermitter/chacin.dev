import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		readingTime: post.printReadingTime,
		date: post.printDate,
		slug: post.slug,
		poster: post.poster,
		description: post.description,
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}