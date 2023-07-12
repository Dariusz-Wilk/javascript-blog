'use strict';

{
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
		console.log(href);

		/* [DONE] find the correct article using the selector (value of 'href' attribute) */
		const articleToShow = document.querySelector(href);
		console.log(articleToShow);

		/* [DONE] add class 'active' to the correct article */
		articleToShow.classList.add('active');
	};

	const links = document.querySelectorAll('.titles a');

	for (let link of links) {
		link.addEventListener('click', titleClickHandler);
	}

	const optArticleSelector = '.post';
	const optTitleSelector = '.post-title';
	const optTitleListSelector = '.titles';

	function generateTitleLinks() {
		/* [DONE] remove contents of titleList */
		document.querySelector(optTitleListSelector).innerHTML = '';

		/* [DONE] for each article */
		const articles = document.querySelectorAll(optArticleSelector);

		for (let article of articles) {
			/* [DONE] get the article id */
			const articlesID = article.getAttribute('id');
			console.log(articlesID);

			/* [DONE] find the title element */
			/* [DONE] get the title from the title element */
			const articleTitle = article.querySelector(optTitleSelector).innerHTML;
			console.log(articleTitle);

			/* [DONE] create HTML of the link */
			const linkHTML = `<li><a href="#${articlesID}"><span>${articleTitle}</span></a></li>`;
			console.log(linkHTML);

			/* [DONE] insert link into titleList */
			document
				.querySelector(optTitleListSelector)
				.insertAdjacentHTML('beforeend', linkHTML);
		}
	}

	generateTitleLinks();
}
