function swapClasses(element, removeList = [], addList = []) {
    element.classList.remove(...removeList);
    element.classList.add(...addList);
}

const homePage = document.getElementById("homePage");
const blogPage = document.getElementById("blogPage");
const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");

const TRANSITION_DURATION = 1000;

function openWeek(week) {
    swapClasses(homePage, ["home-page-transition-open"], ["home-page-transition"]);

    homePage.scrollTop = 0;

    setTimeout(() => {
        blogPage.style.display = "block";

        swapClasses(blogPage, ["blog-page-transition-close"], ["blog-page-transition"]);

        loadBlog(week);
    }, TRANSITION_DURATION);
}

function openWeekId(week, id) {
    swapClasses(homePage, ["home-page-transition-open"], ["home-page-transition"]);

    homePage.scrollTop = 0;

    setTimeout(() => {
        blogPage.style.display = "block";

        swapClasses(blogPage, ["blog-page-transition-close"], ["blog-page-transition"]);

        loadBlog(week, id);
    }, TRANSITION_DURATION);
}

function closeWeek() {
    swapClasses(blogPage, ["blog-page-transition"], ["blog-page-transition-close"]);

    setTimeout(() => {
        blogPage.style.display = "none";

        swapClasses(homePage, ["home-page-transition"], ["home-page-transition-open"]);
    }, TRANSITION_DURATION);
}

async function loadBlog(week, id = null){
    const blogContent = document.getElementById("blogContent");
    blogContent.innerHTML = null;

    const response = await fetch("../data/blog.json");
    const blog = await response.json();

    const contentElement = document.createElement("p");

    document.getElementById("blogTitle").innerHTML = blog[week].title;
    contentElement.innerHTML = blog[week].content;

    blogContent.appendChild(contentElement);

    blog[week].images.forEach((image) => {
        let imageSpanElement = document.createElement("span");
        imageSpanElement.innerHTML = image.title; 
        imageSpanElement.style.color = "black";
        imageSpanElement.style.fontSize = "2rem";

        let imageElement = document.createElement("img");
        imageElement.src = "../assets/blog/images/" + image.photo;
        imageElement.id = image.id;
        imageElement.alt = "blog image";
        imageElement.classList.add("blog-page-image");

        blogContent.appendChild(imageSpanElement);
        blogContent.appendChild(imageElement);
    })

    if (id != null) {
        window.scrollY = 0;
        document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'end'});
    }
}