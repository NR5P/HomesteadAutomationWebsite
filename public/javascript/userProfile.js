import Croppr from "croppr";

const imgFileElement = document.getElementById("avatar");
const selectImageBtn = document.getElementById("select-img-btn");
const changedImg = document.getElementById("changed-image");

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
let cropper = new Croppr("#croppr", {
    aspectRatio: 1
});

/************************************************************ */

imgFileElement.addEventListener("change", () => {
    console.log("file added");
    console.log(imgFileElement.files[0].name);
    handleImageFile(imgFileElement.files[0]);
},false)

selectImageBtn.addEventListener("click", (e) => {
    imgFileElement.click();
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
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    //let file = this.files[0]; 
    console.log(files[0].name);
    handleImageFile(files[0]);
},false)

/*
handle files uploaded by user. this will show the image uploaded by the use and allow them
to crop it before they upload it to the server
*/
function handleImageFile(file) {
    if (file.type.startsWith("image/")) {
        changedImg.file = file;    
        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(changedImg);
        reader.readAsDataURL(file);
    }
    
}