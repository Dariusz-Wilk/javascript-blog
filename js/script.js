/* eslint-disable indent */
'use strict';

{
	const toggleSwitch = document.querySelector('input[type="checkbox"]');
	const toggleIcon = document.getElementById('toggle-icon');

	const switchDarkLightMode = function (event) {
		if (event.target.checked) {
			document.documentElement.setAttribute('data-mode', 'dark');
			toggleIcon.children[0].textContent = 'Dark Mode';
			toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
		} else {
			document.documentElement.setAttribute('data-mode', 'light');
			toggleIcon.children[0].textContent = 'Light Mode';
			toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
		}
	};

	toggleSwitch.addEventListener('change', switchDarkLightMode);

	const templates = {
		articleLink: Handlebars.compile(
			document.querySelector('#template-article-link').innerHTML
		),
		tagPostLink: Handlebars.compile(
			document.querySelector('#template-tag-post-link').innerHTML
		),
		authorPostLink: Handlebars.compile(
			document.querySelector('#template-author-post-link').innerHTML
		),
		tagCloudLinks: Handlebars.compile(
			document.querySelector('#template-tag-cloud-links').innerHTML
		),
		authorsCloudLinks: Handlebars.compile(
			document.querySelector('#template-authors-cloud-links').innerHTML
		),
	};
	const opts = {
		tagSizes: {
			count: 5,
			classPrefix: 'tag-size-',
		},
	};

	const select = {
		all: {
			articles: '.post',
			linksTo: {
				tags: 'a[href^="#tag-"]',
				authors: 'a[href^="#author-"]',
			},
		},
		article: {
			tags: '.post-tags .list',
			author: '.post-author',
			title: '.post-title',
		},
		listOf: {
			titles: '.titles',
			tags: '.tags.list',
			authors: '.authors.list',
		},
	};

	const titleClickHandler = function (event) {
		event.preventDefault();
		const clickedElement = this;

		/* [DONE] remove class 'active' from all article links  */
		const activeLinks = document.querySelectorAll('.titles a.active');
		for (let activeLink of activeLinks) {
			activeLink.classList.remove('active');
		}

		/* [DONE] add class 'active' to the clicked link */
		clickedElement.classList.add('active');

		/* [DONE] remove class 'active' from all articles */
		const activeArticles = document.querySelectorAll('.posts article.active');
		for (let activeArticle of activeArticles) {
			activeArticle.classList.remove('active');
		}

		/* [DONE] get 'href' attribute from the clicked link */
		const href = clickedElement.getAttribute('href');

		/* [DONE] find the correct article using the selector (value of 'href' attribute) */
		const articleToShow = document.querySelector(href);

		/* [DONE] add class 'active' to the correct article */
		articleToShow.classList.add('active');
	};

	const generateTitleLinks = function (customSelector = '') {
		/* [DONE] remove contents of titleList */
		document.querySelector(select.listOf.titles).innerHTML = '';

		/* [DONE] for each article */
		const articles = document.querySelectorAll(
			select.all.articles + customSelector
		);

		for (let article of articles) {
			/* [DONE] get the article id */
			const articlesID = article.getAttribute('id');

			/* [DONE] find the title element */
			/* [DONE] get the title from the title element */
			const articleTitle = article.querySelector(
				select.article.title
			).innerHTML;

			/* [DONE] create HTML of the link */

			const linkHTMLData = { id: articlesID, title: articleTitle };
			let linkHTML = templates.articleLink(linkHTMLData);

			/* [DONE] insert link into titleList */
			document
				.querySelector(select.listOf.titles)
				.insertAdjacentHTML('beforeend', linkHTML);
		}

		const links = document.querySelectorAll('.titles a');

		for (let link of links) {
			link.addEventListener('click', titleClickHandler);
		}
	};

	generateTitleLinks();

	const calculateTagsParams = function (tags) {
		let quantityTags = [];

		for (let tag in tags) {
			quantityTags.push(tags[tag]);
		}
		const min = Math.min(...quantityTags);
		const max = Math.max(...quantityTags);
		return {
			min: min,
			max: max,
		};
	};

	const calculateTagClass = function (count, params) {
		const range = params.max - params.min;

		const singleRange = range / opts.tagSizes.count;
		let minPlusSingleRange = params.min;

		for (let i = 1; minPlusSingleRange < params.max; i++) {
			if (
				count >= minPlusSingleRange &&
				count <= minPlusSingleRange + singleRange
			) {
				return `${opts.tagSizes.classPrefix}${i}`;
			} else {
				minPlusSingleRange += singleRange;
			}
		}
	};

	const generateTags = function () {
		/* [NEW] create a new variable allTags with an empty object */
		let allTags = {};

		/* find all articles */
		const allArticles = document.querySelectorAll('.posts .post');

		/* START LOOP: for every article: */
		for (let article of allArticles) {
			/* find tags wrapper */
			const tagWrapper = article.querySelector(select.article.tags);

			/* make html variable with empty string */
			let html = '';

			/* get tags from data-tags attribute */
			const articleTags = article.getAttribute('data-tags');

			/* split tags into array */
			const tagsSlitted = articleTags.split(' ');

			/* START LOOP: for each tag */
			for (let tag of tagsSlitted) {
				/* generate HTML of the link */
				const tagPostData = { tag: tag };
				const link = templates.tagPostLink(tagPostData);
				/* add generated code to html variable */
				html = html + link;

				/* [NEW] check if this link is NOT already in allTags */
				if (!allTags[tag]) {
					/* [NEW] add tag to allTags object */
					allTags[tag] = 1;
				} else {
					allTags[tag]++;
				}

				/* END LOOP: for each tag */
			}

			/* insert HTML of all the links into the tags wrapper */
			tagWrapper.insertAdjacentHTML('beforeend', html);
			/* END LOOP: for every article: */
		}

		/* [NEW] find list of tags in right column */
		const tagList = document.querySelector(select.listOf.tags);

		const tagsParams = calculateTagsParams(allTags);

		/* [NEW] create variable for all links HTML code */
		const allTagsData = { tags: [] };

		/* [NEW] START LOOP: for each tag in allTags: */
		for (let tag in allTags) {
			/* [NEW] generate code of a link and add it to allTagsHTML */

			allTagsData.tags.push({
				tag: tag,
				count: allTags[tag],
				className: calculateTagClass(allTags[tag], tagsParams),
			});
		}
		/* [NEW] END LOOP: for each tag in allTags: */

		/*[NEW] add HTML from allTagsHTML to tagList */

		tagList.innerHTML = templates.tagCloudLinks(allTagsData);
	};

	generateTags();

	const tagClickHandler = function (event) {
		/* prevent default action for this event */
		event.preventDefault();

		/* make new constant named "clickedElement" and give it the value of "this" */
		const clickedElement = this;

		/* make a new constant "href" and read the attribute "href" of the clicked element */
		const href = clickedElement.getAttribute('href');

		/* make a new constant "tag" and extract tag from the "href" constant */
		const tag = href.replace('#tag-', '');

		/* find all tag links with class active */
		const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

		/* START LOOP: for each active tag link */
		for (let activeTagLink of activeTagLinks) {
			/* remove class active */
			activeTagLink.classList.remove('active');

			/* END LOOP: for each active tag link */
		}

		/* find all tag links with "href" attribute equal to the "href" constant */
		const allTagLinks = document.querySelectorAll(`a[href="${href}"]`);

		/* START LOOP: for each found tag link */
		for (let tagLink of allTagLinks) {
			/* add class active */
			tagLink.classList.add('active');

			/* END LOOP: for each found tag link */
		}

		/* execute function "generateTitleLinks" with article selector as argument */
		generateTitleLinks(`[data-tags~="${tag}"]`);
	};

	const addClickListenersToTags = function () {
		/* find all links to tags */
		const allTagsLinks = document.querySelectorAll(select.all.linksTo.tags);

		/* START LOOP: for each link */
		for (let tagLink of allTagsLinks) {
			/* add tagClickHandler as event listener for that link */
			tagLink.addEventListener('click', tagClickHandler);
		}
		/* END LOOP: for each link */
	};

	addClickListenersToTags();

	const generateAuthors = function () {
		const allArticles = document.querySelectorAll(select.all.articles);
		const authorsListWrapper = document.querySelector(select.listOf.authors);

		const allAuthors = {};

		for (let article of allArticles) {
			const authorWrapper = article.querySelector(select.article.author);
			const author = article.getAttribute('data-author');
			const authorText = author.split('-').join(' ');

			if (!allAuthors[authorText]) {
				allAuthors[authorText] = 1;
			} else {
				allAuthors[authorText]++;
			}

			const authorPostLinkData = { author: author, authorName: authorText };
			const authorPostLinkHTML = templates.authorPostLink(authorPostLinkData);
			authorWrapper.insertAdjacentHTML('afterbegin', authorPostLinkHTML);
		}

		const listAuthorsData = { authors: [] };

		for (let author in allAuthors) {
			listAuthorsData.authors.push({
				author: author.split(' ').join('-'),
				authorName: author,
				count: allAuthors[author],
			});
			authorsListWrapper.innerHTML =
				templates.authorsCloudLinks(listAuthorsData);
		}
	};

	generateAuthors();

	const authorClickHandler = function (event) {
		event.preventDefault();

		const clickedElement = this;
		const href = clickedElement.getAttribute('href');
		const author = href.replace('#author-', '');

		generateTitleLinks(`[data-author="${author}"`);

		const activeAuthorLinks = document.querySelectorAll(
			'a.active[href^="#author-"]'
		);

		for (let activeAuthorLink of activeAuthorLinks) {
			activeAuthorLink.classList.remove('active');
		}

		const allAuthorLinks = document.querySelectorAll(`a[href="${href}"`);
		for (let authorLink of allAuthorLinks) {
			authorLink.classList.add('active');
		}
	};

	const addClickListenersToAuthor = function () {
		const allAuthorLinks = document.querySelectorAll(
			select.all.linksTo.authors
		);

		for (let authorLink of allAuthorLinks) {
			authorLink.addEventListener('click', authorClickHandler);
		}
	};

	addClickListenersToAuthor();
}
