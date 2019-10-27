import Cropper from "cropperjs";

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
const image = document.getElementById("img-cropper");
const cropper = new Cropper(image, {
    aspectRatio: 16 / 9,
    crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
    },
});
/************************************************************ */
