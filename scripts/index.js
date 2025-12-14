let video = null;

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

    const response = await fetch("../data/blog.json");
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

const jigsaw1 = document.getElementById("jigsaw1");

jigsaw1.addEventListener("click", () => {
    jigsaw1.style.pointerEvents = "none";
    jigsaw1.classList.add("jigsaw-1-open");

    const currentVideoProgress = jigsaw1.currentTime;

    setTimeout(() => {
        createVideo("jigsaw1", currentVideoProgress);
    }, 1000)
});

const jigsaw2 = document.getElementById("jigsaw2");

jigsaw2.addEventListener("click", () => {
    jigsaw2.style.pointerEvents = "none";
    jigsaw2.classList.add("jigsaw-2-open");

    const currentVideoProgress = jigsaw2.currentTime;

    setTimeout(() => {
        createVideo("jigsaw2", currentVideoProgress);
    }, 1000)
});

function createVideo(jigsaw, progress){
    video = document.createElement("video");
    video.classList.add("jigsaw-video-fullscreen");
    video.src = "../assets/videos/" + jigsaw + ".mp4";
    video.autoplay = true
    video.muted = true
    video.currentTime = progress;
    video.id = jigsaw;
    video.classList.add("jigsaw-video")
    video.classList.add("video-fly-in");
    document.body.appendChild(video);

    setTimeout(() => {
        document.getElementById("homePage").style.opacity = 0;
    }, 2000)

    setTimeout(() => {
        let backArrow = document.getElementById("backArrowMovie");

        backArrow.style.display = "block";
    }, 3000)
}

document.getElementById("backArrowMovie").addEventListener("click", () => {
    let backArrow = document.getElementById("backArrowMovie");

    backArrow.style.display = "none";

    video.classList.remove("video-fly-in");
    video.classList.add("video-fly-away");

    setTimeout(() => {
        document.getElementById("homePage").style.opacity = 1;
    }, 500);

    setTimeout(() => {
        if(video.id == "jigsaw1"){
            jigsaw1.classList.remove("jigsaw-1-open");
            jigsaw1.classList.add("jigsaw-1-close");
            jigsaw1.style.pointerEvents = "all";

            setTimeout(() => {
                jigsaw1.classList.remove("jigsaw-1-close");
            }, 1000)
        }
        else if(video.id == "jigsaw2"){
            jigsaw2.classList.remove("jigsaw-2-open");
            jigsaw2.classList.add("jigsaw-2-close");
            jigsaw2.style.pointerEvents = "all";

            setTimeout(() => {
                jigsaw2.classList.remove("jigsaw-2-close");
            }, 1000)
        }
    }, 3000);
});