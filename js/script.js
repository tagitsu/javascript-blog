'use strict';

function titleClickHandler() {

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const linkAttribute = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const choosenArticle = document.querySelector(linkAttribute);

  /* [DONE] add class 'active' to the correct article */
  choosenArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  /* ... */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */
  /* ... */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    /* ... */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* ... */
    const articleTitleElement = article.querySelector(optTitleSelector);

    /* [DONE] get the title from the title element */
    /* ... */
    const articleTitle = articleTitleElement.innerText;

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* ... */

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
  }

  titleList.insertAdjacentHTML('afterbegin', html);

  const links = document.querySelectorAll('.titles a');

  for(let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

// add tags to article

function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const postTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const tags = postTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of tags) {
      /* [DONE] generate HTML of the link */
      const linkTagCode = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* [DONE] add generated code to html variable */
      html = html + linkTagCode;
    }/* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('afterbegin', html);
  }/* END LOOP: for every article: */
}
generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* [DONE] remove class active */
    activeTag.classList.remove('active');
  } /* END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const foundedTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let foundedTag of foundedTags) {
    /* add class active */
    foundedTag.classList.add('active');
  } /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */
  const tagsLink = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagsLink) {
    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToTags();

// add author to the article

// function which generate all authors name in each article author wrapper
function generateAuthors() {
  // [DONE] find all articles and save them in const
  const articles = document.querySelectorAll(optArticleSelector);
  // [] for each article - START LOOP
  for (let article of articles) {
    // [DONE] find author wrapper in the article
    const authorWrapper = document.querySelector(optArticleAuthorSelector);
    // [DONE] make html variable with empty string
    let html = '';
    // [] get author from data-author attribute
    const postAuthor = article.getAttribute('data-author');
    console.log('to jest zawartość atrybutu data-author artykułu: ', postAuthor);
    const authorName = postAuthor.replace('-', ' ');
    console.log('to jest imię autora pozbawione myślnika: ', authorName);
    // [] generate html code of link to author
    const authorLink = `<a href="#author-${postAuthor}">${authorName}</a>`;
    console.log('to jest link do autora: ', authorLink);
    // [] add generated code to html variable
    html = html + authorLink;
    // [] insert html code to author link in article
    authorWrapper.insertAdjacentHTML('beforeend', html);
  } // END LOOP for each article
}
generateAuthors();

// what is happened when you click on author link
function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href kliknietego autora: ', href);
  /* [DONE] make a new constant "author" and extract author name from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('to jest wyjęte nazwisko autora z href:', author);
  /* [] find author link with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('to są wszystkie linki autorów z klasa active: ', activeAuthors);
  /* [] remove class active LOOP */
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  /* [] find all authors links with "href" attribute equal to the "href" constant */
  const foundedAuthors = document.querySelectorAll('a[href="' + href + '"]');
  console.log('to jest znaleziony autor: ', foundedAuthors);
  for (let foundedAuthor of foundedAuthors) {
    /* add class active */
    foundedAuthor.classList.add('active');
  }
  /* execute function "generateTitleLinks" with article selector as argument
  generate all clicked author articles in left sidebar */
  generateTitleLinks('[data-author~="' + author + '"]');
}


function addClickListenersToAuthors() {
  // [] find all links to authors
  const authorLinks = document.querySelectorAll('.post-author a');
  // START LOOP: for each author
  for (let authorLink of authorLinks) {
    /* [] add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }/* END LOOP: for each author */
}
addClickListenersToAuthors();
