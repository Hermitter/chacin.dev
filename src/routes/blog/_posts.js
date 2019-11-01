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
const POSTS_DIR = path.join(cwd, 'posts/')
const EXCERPT_SEPARATOR = '<!-- more -->'

// Populate posts
posts = fs.readdirSync(POSTS_DIR)
	// Only accept folder
	.filter(fileName => fs.lstatSync(POSTS_DIR+"/"+fileName).isDirectory())
	// Read .md file from each folder
	.map(dirName => {
		const postDirPath = POSTS_DIR+dirName;
		const mdFileName = fs.readdirSync(postDirPath).find(fileName => /\.md$/.test(fileName));
		const mdContent = fs.readFileSync(path.join(POSTS_DIR, dirName, mdFileName), 'utf8')

		const { data, content: rawContent } = matter(mdContent)
		const { title, date } = data
		const slug = mdFileName.split('.')[0]
		let content = rawContent
		let excerpt = ''

		if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
			const splittedContent = rawContent.split(EXCERPT_SEPARATOR)
			excerpt = splittedContent[0]
			content = splittedContent[1]
		}

		const poster = "";
		const html = md.render(content)
		const readingStats = readingTime(content)
		const printReadingTime = readingStats.text
		const printDate = formatDate(new Date(date), 'MMMM d, yyyy')

		return {
			title: title || slug,
			poster,
			slug,
			html,
			date,
			excerpt,
			printDate,
			printReadingTime,
		}
	})

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
