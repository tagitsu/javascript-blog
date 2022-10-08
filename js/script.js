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

//   generate list of titles 

function generateTitleLinks() {
  console.log('titles list generator is ready :)');

  // [DONE] remove list of links from left box
  const titles = document.querySelectorAll('.titles');
  for( let title of titles) {
    title.innerHTML = '';
  }

  // for each article:

    // get id and add to const
    const article = document.querySelector('article');
    const articleId = article.getAttribute('id');
    console.log('article ID is: ', articleId);

    // find element with title and add to const
    const articleTitle = document.querySelector('.post-title').innerText;
    console.log('title of article is: ', articleTitle);

    // create link html code and add to const
    const linkHtmlCode = '<a href="#' + articleId + '"><span>' + articleTitle + '</span></a>';
    console.log('it is link to article ' + articleTitle + ': ' + linkHtmlCode);

    // add created html code to left column




}
generateTitleLinks();