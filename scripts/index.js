function openWeek(week){
    const homePage = document.getElementById("homePage");
    homePage.classList.remove("home-page-transition-open");
    homePage.classList.add("home-page-transition");
    homePage.scrollTop = 0;

    setTimeout(() => {
        const blogPage = document.getElementById("blogPage");
        blogPage.style.display = "block";
        blogPage.classList.remove("blog-page-transition-close");
        blogPage.classList.add("blog-page-transition");
        loadBlog(week);
    },1000)
}

function closeWeek(){
    const blogPage = document.getElementById("blogPage");
    blogPage.classList.add("blog-page-transition-close");
    blogPage.classList.remove("blog-page-transition");

    setTimeout(() => {
        blogPage.style.display = "none";
        const homePage = document.getElementById("homePage");
        homePage.classList.add("home-page-transition-open");
        homePage.classList.remove("home-page-transition");
    },1000)
}

async function loadBlog(week){
    const blogContent = document.getElementById("blogContent");
    blogContent.innerHTML = null;

    const response = await fetch("../scripts/blog.json");
    const blog = await response.json();

    const titleElement = document.createElement("h1");
    const contentElement = document.createElement("p");

    titleElement.innerHTML = blog[week].title;
    contentElement.innerHTML = blog[week].content;

    blogContent.appendChild(titleElement);
    blogContent.appendChild(contentElement);

    blog[week].images.forEach((image) => {
        let imageTitleElement = document.createElement("h2");
        imageTitleElement.innerHTML = image.title; 

        let imageElement = document.createElement("img");
        imageElement.src = "../assets/blog/images/" + image.photo;
        imageElement.classList.add("blog-page-image");

        blogContent.appendChild(imageTitleElement);
        blogContent.appendChild(imageElement);
    })
}