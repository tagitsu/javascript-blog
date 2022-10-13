'use strict';

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

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  articleTags: Handlebars.compile(document.querySelector('#template-article-tags').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsList: Handlebars.compile(document.querySelector('#template-authors').innerHTML),
};

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

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  /* ... */
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */
  /* ... */
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    /* ... */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* ... */
    const articleTitleElement = article.querySelector(select.article.title);

    /* [DONE] get the title from the title element */
    /* ... */
    const articleTitle = articleTitleElement.innerText;

    /* [DONE] create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    /* ... */

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
  }

  titleList.insertAdjacentHTML('afterbegin', html);

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  /* [NEW - tags cloud] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(select.article.tags);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const postTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const tags = postTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tags) {
      /* [DONE] generate HTML of the link */
      //const linkTagCode = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkTagCodeData = {id: tag};
      const linkTagCode = templates.articleTags(linkTagCodeData);
      /* [DONE] add generated code to html variable */
      html = html + linkTagCode;

      /* [NEW - tags cloud] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
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
  const tagList = document.querySelector(select.listOf.tags);

  function calculateTagsParams(tags) {
    // [DONE] create empty array for tags numbers (amount)
    const tagNumberArray = [];
    // [DONE] create empty object for min and max tags numbers
    const tagsMinMaxNumber = {};
    // START LOOP for each tag
    for (let tag in tags) {
      // read object properties (from each tag)
      const tagNumber = tags[tag];
      // add each number to array
      tagNumberArray.push(tagNumber);
    }// END LOOP

    const min = Math.min.apply(null, tagNumberArray);
    const max = Math.max.apply(null, tagNumberArray);

    // add min and max values to object
    tagsMinMaxNumber.min = min;
    tagsMinMaxNumber.max = max;
    return tagsMinMaxNumber;
  }

  // [] create const with tags parameters
  const tagsParams = calculateTagsParams(allTags);
  function calculateTagClass(count, params) {

    // get max value of tags amount;
    const max = params.max;

    // max value divide by number of category
    const categoryLength = Math.floor(max / opts.tagSizes.count);

    if (count <= categoryLength) {
      className = opts.tagSizes.classPrefix + '5';
    } else if (count > categoryLength * (opts.tagSizes.count - 4) && count <= categoryLength * (opts.tagSizes.count - 3)) {
      className = opts.tagSizes.classPrefix + '4';
    } else if (count > categoryLength * (opts.tagSizes.count - 3) && count <= categoryLength * (opts.tagSizes.count - 2)) {
      className = opts.tagSizes.classPrefix + '3';
    } else if (count > categoryLength * (opts.tagSizes.count - 2) && count <= categoryLength * (opts.tagSizes.count - 1)) {
      className = opts.tagSizes.classPrefix + '2';
    } else if (count > categoryLength * (opts.tagSizes.count - 1) && count <= categoryLength * opts.tagSizes.count) {
      className = opts.tagSizes.classPrefix + '1';
    }
    return className;

  }

  // create variable for category class name;
  let className = '';
  // [NEW] create varible for all links HTML code
  //let allTagsHTML = '';
  const allTagsData = {tags: []};

  //START LOOP for each tag in allTags
  for (let tag in allTags) {
    // create class name for tag
    //tagClassName = calculateTagClass(allTags[tag], tagsParams);
    // generate code of the link and add it to allTagsHTML
    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + tagClassName + '">' + tag + '</a><span>(' + allTags[tag] + ')</span></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),

    });
  } // END LOOP for each tag in allTags object
  // [NEW] add html code to tagList
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

  /* [DONE] find all links to tags in tags cloud*/
  const tagsCloud = document.querySelectorAll('.tags a');

  /* START LOOP: for each link */
  for (let tagCloud of tagsCloud) {
    /* [DONE] add tagClickHandler as event listener for that link */
    tagCloud.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors() {
  // [DONE] find all articles and save them in const
  const articles = document.querySelectorAll(select.all.articles);

  // [DONE] find ul list for authors in sidebar
  const authorList = document.querySelector(select.listOf.authors);

  // [DONE] make html variable with empty string
  let html = '';
  // create object of authors
  const allAuthors = {};
  // make variable for link to authors in sidebar
  let htmlSidebar = '';
  // [DONE] for each article - START LOOP
  for (let article of articles) {

    // [DONE] find author wrapper in the article
    const authorWrapper = article.querySelector(select.article.author);

    // [DONE] get author from data-author attribute
    const authorName = article.getAttribute('data-author');

    // [DONE] generate html code of link to author
    //const authorLink = `<a href="#author-${authorName}">${authorName.replace('-', ' ')}</a>`;
    const authorLinkData = {id: authorName, title: authorName.replace('-', ' ')};
    const authorLink = templates.articleAuthor(authorLinkData);


    // [DONE] add generated code to html variable
    html = authorLink;
    // [DONE] insert html code to author link in article
    authorWrapper.insertAdjacentHTML('beforeend', html);
    if (!allAuthors.hasOwnProperty(authorName)) {
      // add authors to object
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  } // END LOOP for each article
  const allAuthorsData = {authors: []};

  // START LOOP for each author
  for (let authorName in allAuthors) {
    // get out values of authors articles number
    const authorArticlesNumber = allAuthors[authorName];
    // generate html code to author link (sidebar)
    //const authorSidebarLink = '<li><a href="#author-' + authorName + '">' + authorName.replace('-', ' ') + '</a><span> (' + authorArticlesNumber + ')</span></li>';
    // add sidebar link code to variable
    //htmlSidebar = htmlSidebar + authorSidebarLink;
    allAuthorsData.authors.push({
      authorId: authorName,
      author: authorName.replace('-', ' '),
      count: allAuthors[authorName],
    });
  } // END LOOP for each author
  authorList.innerHTML = templates.authorsList(allAuthorsData);
  console.log('tak wygląda obiekt autoró∑:', allAuthorsData);
}
generateAuthors();

function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract author name from the "href" constant */
  const author = href.replace('#author-', '');

  /* [DONE] find author link with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  /* [DONE] remove class active LOOP */
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  /* [DONE] find all authors links with "href" attribute equal to the "href" constant */
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
  // [DONE] find all links to authors
  const authorLinks = document.querySelectorAll('.post-author a');

  // START LOOP: for each author
  for (let authorLink of authorLinks) {
    /* [DONE] add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  } /* END LOOP: for each author */

  // [DONE] find all links to authors
  const authorSidebarLinks = document.querySelectorAll('.authors a');

  // START LOOP: for each author
  for (let authorSidebarLink of authorSidebarLinks) {
    /* [DONE] add authorClickHandler as event listener for that link */
    authorSidebarLink.addEventListener('click', authorClickHandler);
  } /* END LOOP: for each author */
}
addClickListenersToAuthors();
