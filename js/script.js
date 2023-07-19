/* eslint-disable indent */
'use strict';

{
	const optArticleSelector = '.post';
	const optTitleSelector = '.post-title';
	const optTitleListSelector = '.titles';
	const optArticleTagsSelector = '.post-tags .list';

	const titleClickHandler = function (event) {
		event.preventDefault();
		const clickedElement = this;
		console.log('Link was clicked!');
		console.log('clickedElement (with plus): ' + clickedElement);

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

	const generateTitleLinks = function () {
		/* [DONE] remove contents of titleList */
		document.querySelector(optTitleListSelector).innerHTML = '';

		/* [DONE] for each article */
		const articles = document.querySelectorAll(optArticleSelector);

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
		/* find all articles */
		const allArticles = document.querySelectorAll('.posts .post');
		console.log(allArticles);

		/* START LOOP: for every article: */
		for (let article of allArticles) {
			/* find tags wrapper */
			const tagWrapper = article.querySelector(optArticleTagsSelector);
			console.log(tagWrapper);

			/* make html variable with empty string */
			let html = '';

			/* get tags from data-tags attribute */
			const articleTags = article.getAttribute('data-tags');

			/* split tags into array */
			const tagsSlitted = articleTags.split(' ');
			console.log(tagsSlitted);

			/* START LOOP: for each tag */
			for (let tag of tagsSlitted) {
				/* generate HTML of the link */
				const link = `<li><a href="#">${tag}</a></li>`;

				/* add generated code to html variable */
				html = html + link;
				/* END LOOP: for each tag */
			}

			/* insert HTML of all the links into the tags wrapper */
			tagWrapper.insertAdjacentHTML('beforeend', html);

			/* END LOOP: for every article: */
		}
	};

	generateTags();
}
