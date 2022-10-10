'use strict';

function titleClickHandler(){
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  console.log('kliknięty element to: ', clickedElement);
  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const linkAttribute = clickedElement.getAttribute('href');
  console.log(linkAttribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const choosenArticle = document.querySelector(linkAttribute);
  console.log(choosenArticle);

  /* [DONE] add class 'active' to the correct article */
  choosenArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  /* remove contents of titleList */
  /* ... */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  /* ... */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('to jest wartość const articles', articles);

  let html = '';

  for(let article of articles) {
    /* get the article id */
    /* ... */
    const articleId = article.getAttribute('id');
    console.log('to jest wartość articleId: ' + articleId);
    /* find the title element */
    /* ... */
    const articleTitleElement = article.querySelector(optTitleSelector);
    console.log('to jest wartość articleTitle: ', articleTitleElement);

    /* get the title from the title element */
    /* ... */
    const articleTitle = articleTitleElement.innerText;
    console.log('to jest tytuł artykułu: ', articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('to jest link: ' + linkHTML);
    /* ... */

    /* insert link into html variable */
    html = html + linkHTML;
    console.log('wartość zmiennej html: ', html);
  }
  titleList.insertAdjacentHTML('afterbegin', html);

  const links = document.querySelectorAll('.titles a');
  console.log('to zawiera stała links: ', links);

  for(let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
} 
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('article');
  
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    const tagWrapper = document.querySelector('.list-horizontal');
    console.log('to jest tagWrapper: ', tagWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    console.log('to jest wartość stałej tags: ', tags);
    /* split tags into array */
    const tagsArray = tags.split();
    console.log('to jest tablica z tagów artykułów: ', tagsArray);

     /* START LOOP: for each tag */
    for(let tag of tags) {
      /* generate HTML of the link */
      const linkTagCode = '<li><a href="#' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = linkTagCode;
      console.log('to jest kod html jednego taga: ', html);
    }/* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */

  }
    

  /* END LOOP: for every article: */
}

generateTags();