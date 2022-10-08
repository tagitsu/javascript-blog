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

const links = document.querySelectorAll('.titles a');

for(let link of links) {
  link.addEventListener('click', titleClickHandler);
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

  titleList.innerHTML = html;
}

generateTitleLinks();

