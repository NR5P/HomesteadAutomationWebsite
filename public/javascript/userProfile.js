import Croppr from "croppr";

//require("../css/croppr.css");

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
let cropper = new Croppr("#img-cropper", {
});
/************************************************************ */
