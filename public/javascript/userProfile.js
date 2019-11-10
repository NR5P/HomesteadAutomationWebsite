import Croppr from "croppr";

const imgFileElement = document.getElementById("avatar");
const selectImageBtn = document.getElementById("select-img-btn");
const changedImg = document.getElementById("changed-image");
const imgToCrop = document.getElementById("croppr");
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

/*******************************img cropper****************** */
//const image = document.getElementById("img-cropper");
/*
let cropper = new Croppr("#croppr", {
    aspectRatio: 1
});
*/

/************************************************************ */

imgFileElement.addEventListener("change", () => {
    handleImageFile(imgFileElement.files[0]);
},false)

selectImageBtn.addEventListener("click", (e) => {
    if (selectImageBtn.innerText != "Select Cropped Region")
        imgFileElement.click();
    else
        getCroppedPhoto();
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
    if (selectImageBtn.innerText != "Select Cropped Region") {
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
    console.log(cropValue);
}