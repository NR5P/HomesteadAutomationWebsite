import Croppr from "croppr";

const imgFileElement = document.getElementById("avatar");
const selectImageBtn = document.getElementById("select-img-btn");
const imgToCrop = document.getElementById("croppr");
const currentProfilePic = document.getElementById("current-profile-pic");
const avatarCoordinates = document.getElementById("avatar-coordinates");
const userId = document.getElementById("userId");
const formSubmit = document.getElementById("form-submit");
const form = document.forms.namedItem("userProfileForm");
let cropper;
let canvas;


/***************phone number formatter**************************** */
const phoneNumber = document.getElementById("phoneNumber");


phoneNumber.addEventListener("keyup", (e)=> {
    if ((e.target.value.length === 3 || e.target.value.length === 7)
        && (e.keyCode !== 8 && e.keyCode !== 46)) {
        phoneNumber.value += "-";
    }
})
/******************************************************************* */

imgFileElement.addEventListener("change", () => {
    handleImageFile(imgFileElement.files[0]);
},false)

selectImageBtn.addEventListener("click", (e) => {
    if (selectImageBtn.innerText == "click to change picture or drag and drop")
        imgFileElement.click();
    else if (selectImageBtn.innerText == "Select Cropped Region")
        getCroppedPhoto();
    else if (selectImageBtn.innerText == "Click to save") {
        avatarCoordinates.value = cropper.getValue();
        selectImageBtn.innerText = "Please press submit to update profile";
        selectImageBtn.style.color = "green";
    }
},false)

selectImageBtn.addEventListener("dragenter", (e) => {
    e.stopPropagation();
    e.preventDefault();
},false)

selectImageBtn.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();
},false)

selectImageBtn.addEventListener("drop", (e) => {
    if (selectImageBtn.innerText == "click to change picture or drag and drop") {
        e.stopPropagation();
        e.preventDefault();
        const dt = e.dataTransfer;
        const files = dt.files;
        handleImageFile(files[0]);
    }
},false)

formSubmit.addEventListener("click", () => {
    console.log("submitt");
    let formData = new FormData(form);
    canvas.toBlob(function(blob) {
        formData.append("image", blob, "profile.jpg");
    })

    var request = new XMLHttpRequest();
    request.open("POST", `/userProfile/${userId.value}`);
    request.send(userProfileForm); 
    console.log(userProfileForm)
},false);


/*
handle files uploaded by user. this will show the image uploaded by the use and allow them
to crop it before they upload it to the server
*/
function handleImageFile(file) {
    if (file.type.startsWith("image/")) {
        imgToCrop.file = file;    
        const reader = new FileReader();
        reader.onload = function(e) {
            imgToCrop.src = e.target.result;
            handleCropImage();
        }

        reader.readAsDataURL(file);
        selectImageBtn.innerText = "Select Cropped Region"
        selectImageBtn.style.fontSize = "30px";
        selectImageBtn.style.color = "#FF9D0B"
    } 
}

function handleCropImage() {
    cropper = new Croppr("#croppr", {
        aspectRatio: 1,
        startSize: [50,50, '%'],
        onCropStart: function() {
            if (selectImageBtn.innerText = "Click to save") {
                selectImageBtn.innerText = "Select Cropped Region";
                selectImageBtn.style.color = "FF9D0B"; //TODO: why is this not owrking
            }
        }
    });
}

function getCroppedPhoto() {
    let cropValue = cropper.getValue();
    canvas = document.createElement("canvas");
    canvas.width = cropValue.width;
    canvas.height = cropValue.height;
    let context = canvas.getContext("2d");
    context.drawImage(imgToCrop,-cropValue.x,-cropValue.y);

    currentProfilePic.src = canvas.toDataURL();

    selectImageBtn.innerText = "Click to save"
    selectImageBtn.style.color = "#E85F66";
}


/*
function sendData() {
    console.log("test");
    userProfileForm = new FormData(document.getElementById("userProfileForm"));
    canvas.toBlob(function(blob) {
        userProfileForm.append("image", blob, "profile.jpg");
    })

    var request = new XMLHttpRequest();
    request.open("POST", `/userProfle/${userId.value}`);
    request.send(userProfileForm); 
    console.log(userProfileForm)

    return false;
}
*/