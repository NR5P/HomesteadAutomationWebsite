import Croppr from "croppr";

const imgFileElement = document.getElementById("avatar");
const selectImageBtn = document.getElementById("select-img-btn");
const changedImg = document.getElementById("changed-image");
const imgToCrop = document.getElementById("croppr");
const currentProfilePic = document.getElementById("current-profile-pic");
let cropper;

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
    else if (selectImageBtn.innerText == "Click to redo") {
        startCropOver();
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
        startSize: [50,50, '%']
    });
}

function getCroppedPhoto() {
    let cropValue = cropper.getValue();
    let canvas = document.createElement("canvas");
    canvas.width = cropValue.width;
    canvas.height = cropValue.height;
    let context = canvas.getContext("2d");
    context.drawImage(imgToCrop,-cropValue.x,-cropValue.y);

    currentProfilePic.src = canvas.toDataURL();

    selectImageBtn.innerText = "Click to redo"
    selectImageBtn.style.color = "#E85F66";
}

function startCropOver() {
    console.log("start over");
}