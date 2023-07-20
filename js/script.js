/* eslint-disable indent */
'use strict';

{
	const optArticleSelector = '.post';
	const optTitleSelector = '.post-title';
	const optTitleListSelector = '.titles';
	const optArticleTagsSelector = '.post-tags .list';
	const optArticleAuthorSelector = '.post-author';
	const optTagsListSelector = '.tags.list';

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
		document.querySelector(optTitleListSelector).innerHTML = '';

		/* [DONE] for each article */
		const articles = document.querySelectorAll(
			optArticleSelector + customSelector
		);

		for (let article of articles) {
			/* [DONE] get the article id */
			const articlesID = article.getAttribute('id');

			/* [DONE] find the title element */
			/* [DONE] get the title from the title element */
			const articleTitle = article.querySelector(optTitleSelector).innerHTML;

			/* [DONE] create HTML of the link */
			const linkHTML = `<li><a href="#${articlesID}"><span>${articleTitle}</span></a></li>`;

			/* [DONE] insert link into titleList */
			document
				.querySelector(optTitleListSelector)
				.insertAdjacentHTML('beforeend', linkHTML);
		}

		const links = document.querySelectorAll('.titles a');

		for (let link of links) {
			link.addEventListener('click', titleClickHandler);
		}
	};

	generateTitleLinks();

	const generateTags = function () {
		/* [NEW] create a new variable allTags with an empty object */
		let allTags = {};

		/* find all articles */
		const allArticles = document.querySelectorAll('.posts .post');

		/* START LOOP: for every article: */
		for (let article of allArticles) {
			/* find tags wrapper */
			const tagWrapper = article.querySelector(optArticleTagsSelector);

			/* make html variable with empty string */
			let html = '';

			/* get tags from data-tags attribute */
			const articleTags = article.getAttribute('data-tags');

			/* split tags into array */
			const tagsSlitted = articleTags.split(' ');

			/* START LOOP: for each tag */
			for (let tag of tagsSlitted) {
				/* generate HTML of the link */
				const link = `<li><a href="#tag-${tag}">${tag}</a></li>`;
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
		console.log(allTags);

		/* [NEW] find list of tags in right column */
		const tagList = document.querySelector(optTagsListSelector);

		/* [NEW] create variable for all links HTML code */
		let allTagsHTML = '';

		/* [NEW] START LOOP: for each tag in allTags: */
		for (let tag in allTags) {
			/* [NEW] generate code of a link and add it to allTagsHTML */
			allTagsHTML += `<li><a href="#tag-${tag}">${tag} <span>(${allTags[tag]})</span></a></li>`;
		}
		/* [NEW] END LOOP: for each tag in allTags: */

		/*[NEW] add HTML from allTagsHTML to tagList */
		tagList.innerHTML = allTagsHTML;
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
		const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');

		/* START LOOP: for each link */
		for (let tagLink of allTagsLinks) {
			/* add tagClickHandler as event listener for that link */
			tagLink.addEventListener('click', tagClickHandler);
		}
		/* END LOOP: for each link */
	};

	addClickListenersToTags();

	const generateAuthors = function () {
		const allArticles = document.querySelectorAll(optArticleSelector);

		for (let article of allArticles) {
			const authorWrapper = article.querySelector(optArticleAuthorSelector);
			const author = article.getAttribute('data-author');
			const authorText = author.replace('-', ' ');

			const html = `<a href="#author-${author}">${authorText}</a>`;
			authorWrapper.insertAdjacentHTML('afterbegin', html);
		}
	};

	generateAuthors();

	const authorClickHandler = function (event) {
		event.preventDefault();

		const clickedElement = this;
		const href = clickedElement.getAttribute('href');
		const author = href.replace('#author-', '');

		generateTitleLinks(`[data-author="${author}"`);
	};

	const addClickListenersToAuthor = function () {
		const allAuthorLinks = document.querySelectorAll('.post-author a');

		for (let authorLink of allAuthorLinks) {
			authorLink.addEventListener('click', authorClickHandler);
		}
	};

	addClickListenersToAuthor();
}
