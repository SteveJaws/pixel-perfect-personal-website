document.addEventListener("DOMContentLoaded", main());

function main(){
    if (localStorage.getItem("loggedIn") != null) {
        return;
    }

    openNumpad();
}

function openNumpad(){
    let numpadContainer = document.getElementById("numpadContainer")

    numpadContainer.style.display = "block";
}

function closeNumpad(){
    localStorage.setItem("loggedIn", true)

    let numpadContainer = document.getElementById("numpadContainer")

    numpadContainer.classList.add("numpad-fly-away");
}