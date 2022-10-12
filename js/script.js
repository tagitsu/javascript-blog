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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags';

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

function generateTags() {
  /* [NEW - tags cloud] create a new variable allTags with an empty object */
  let allTags = {};

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

      /* [NEW - tags cloud] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        /* [NEW - tags cloud] add tag to alltags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    } /* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('afterbegin', html);
  }/* END LOOP: for every article: */

  /* [NEW - tags cloud] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('to jest obiekt allTags: ', allTags);

  function calculateTagsParams(tags) {
    // [DONE] create empty array for tags numbers (amount)
    const tagNumberArray = [];
    // [DONE] create empty object for min and max tags numbers
    const tagsMinMaxNumber = {};
    // START LOOP for each tag
    for (let tag in tags) {
      // read object properties (from each tag)
      const tagNumber = tags[tag];
      console.log('to jest ilość tagu: ', tagNumber);
      // add each number to array
      tagNumberArray.push(tagNumber);
    }// END LOOP

    console.log('to jest tablica z ilościami tagów: ', tagNumberArray);
    // get the min and max values ​​from an array
    const min = Math.min.apply(null, tagNumberArray);
    console.log('to jest minimalna wartość z tablicy ilości tagów: ', min);
    const max = Math.max.apply(null, tagNumberArray);
    console.log('to jest maksymalna wartość z tablicy ilości tagów: ', max);

    // add min and max values to object
    tagsMinMaxNumber.min = min;
    tagsMinMaxNumber.max = max;

    console.log('to jest obiekt z min i max tagami: ', tagsMinMaxNumber);

    return tagsMinMaxNumber;
  }

  // [] create const with tags parameters
  const tagsParams = calculateTagsParams(allTags);
  console.log('zawartość tagsParams: ', tagsParams);

  // [NEW] create varible for all links HTML code
  let allTagsHTML = '';

  //START LOOP for each tag in allTags
  for(let tag in allTags) {
    // generate code of the link and add it to allTagsHTML
    allTagsHTML += '<li><a href="#tag-"' + tag + '>' + tag + '</a><span>(' + allTags[tag] + ')</span></li>';


  } // END LOOP for each tag in allTags object
  console.log(allTagsHTML);

  // [NEW] add html code to tagList
  tagList.innerHTML = allTagsHTML;
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

function generateAuthors() {
  // [DONE] find all articles and save them in const
  const articles = document.querySelectorAll(optArticleSelector);
  // [DONE] make html variable with empty string
  let html = '';
  // [DONE] find author wrapper in the article
  const authorWrapper = document.querySelector(optArticleAuthorSelector);

  // [] for each article - START LOOP
  for (let article of articles) {
    // [] get author from data-author attribute
    const postAuthor = article.getAttribute('data-author');
    const authorName = postAuthor.replace('-', ' ');
    // [] generate html code of link to author
    const authorLink = `<a href="#author-${postAuthor}">${authorName}</a>`;
    // [] add generated code to html variable
    html = authorLink;
    console.log('to jest zawartość authorLink :', authorLink);
  } // END LOOP for each article
  // [] insert html code to author link in article
  authorWrapper.insertAdjacentHTML('beforeend', html);
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

  /* [DONE] make a new constant "author" and extract author name from the "href" constant */
  const author = href.replace('#author-', '');

  /* [] find author link with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* [] remove class active LOOP */
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  /* [] find all authors links with "href" attribute equal to the "href" constant */
  const foundedAuthors = document.querySelectorAll('a[href="' + href + '"]');

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
