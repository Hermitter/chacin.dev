const fs = require('fs')
const cwd = process.cwd()
const path = require('path')
const { Remarkable } = require('remarkable');
let md = new Remarkable();
const prism = require('prismjs')
const formatDate = require('date-fns/format')
const matter = require('gray-matter')
const readingTime = require('reading-time')

// Post vars
let posts = [];
const POSTS_DIR = path.join(cwd, 'src/routes/blog/posts/')
const EXCERPT_SEPARATOR = '<!-- more -->'

// Populate posts
posts = fs.readdirSync(POSTS_DIR)
	// .filter(fileName => fs.lstatSync(POSTS_DIR+"/"+fileName).isDirectory())
	.filter(fileName => /\.md$/.test(fileName))
	.map(fileName => {
		const POST_DIR = POSTS_DIR+"/"+fileName;

		const fileMd = fs.readFileSync(path.join(POST_DIR, fileName), 'utf8')
		const { data, content: rawContent } = matter(fileMd)
		const { title, date } = data
		const slug = fileName.split('.')[0]
		let content = rawContent
		let excerpt = ''

		if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
			const splittedContent = rawContent.split(EXCERPT_SEPARATOR)
			excerpt = splittedContent[0]
			content = splittedContent[1]
		}

		const html = md.render(content)
		const readingStats = readingTime(content)
		const printReadingTime = readingStats.text
		const printDate = formatDate(new Date(date), 'MMMM d, yyyy')

		// return {
		// 	title: title || slug,
		// 	slug,
		// 	html,
		// 	date,
		// 	excerpt,
		// 	printDate,
		// 	printReadingTime,
		// }

		return 	{
					title: 'What is Sapper?',
					slug: 'what-is-sapper',
					html: `
						<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>
			
						<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>
			
						<ul>
							<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
							<li>Server-side rendering (SSR) with client-side hydration</li>
							<li>Service worker for offline support, and all the PWA bells and whistles</li>
							<li>The nicest development experience you've ever had, or your money back</li>
						</ul>
			
						<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
					`
				};
})



// posts = [
// 	{
// 		title: 'What is Sapper?',
// 		slug: 'what-is-sapper',
// 		html: `
// 			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

// 			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

// 			<ul>
// 				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
// 				<li>Server-side rendering (SSR) with client-side hydration</li>
// 				<li>Service worker for offline support, and all the PWA bells and whistles</li>
// 				<li>The nicest development experience you've ever had, or your money back</li>
// 			</ul>

// 			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
// 		`
// 	},
// ];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
