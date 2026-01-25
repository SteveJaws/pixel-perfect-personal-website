function numpad(chosenButton){
    const correctCode = "285f8e7a01879313d77ac190b169982649e54303f4dcbff74f5d298f8f830aa2"

    const numpadScreen = document.getElementById("numpadScreen");

    if(chosenButton == "delete"){
        numpadScreen.value = "";
        return;
    }
    else if(chosenButton == "enter"){
        const hashedPassword = CryptoJS.SHA256(numpadScreen.value).toString(CryptoJS.enc.Hex)

        console.log(hashedPassword + " en " + correctCode)

        if(hashedPassword == correctCode){
            closeNumpad();
        }
        return;
    }

    numpadScreen.value += chosenButton;
}