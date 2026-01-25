let video = null;

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
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
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
        console.log("test");
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