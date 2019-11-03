/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascript/postView.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascript/postView.js":
/*!***************************************!*\
  !*** ./public/javascript/postView.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const userIdFromHidTag = document.getElementById(\"user-id\");\nconst postIdFromHidTag = document.getElementById(\"post-id\");\nconst commentBody = document.getElementById(\"add-comment\");\nlet commentDiv = document.getElementById(\"comment-div\");\n\n\n//TODO: make this check every 10 seconds for a new comment and append to the html with new comment\nwindow.onload = () => {\n    fetch(`/posts/api/${postIdFromHidTag.value}`, {method: \"GET\"})    \n        .then(res => res.json())\n        .then(data => {\n            data.forEach(post => {\n                output = `\n                    <div class=\"card\">\n                        <div class=\"container\">\n                            <div class=\"comment\">\n                                <div class=\"comment-span-left\">\n                                    <input class=\"comment-id\" type=\"hidden\" value=${post._id}>\n                                    <p class=\"author-name\">${post.authorUserName}</p>\n                                    <img class=\"avatar\" src=\"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50\" />\n                                    <small class=\"member-since\">${memberSince(post.authorDateJoined)}</small>\n                                </div>\n                                <span class=\"comment-span-right\">\n                                    <p class=\"post-date\">${getPostDateTime(post.date)}</p>\n                                    <p class=\"post-content\">${post.commentBody}</p>\n                                </span> \n                            </div>\n                        </div> \n                    </div\n                `\n                commentDiv.innerHTML += output;\n            });\n        });\n};\n\n/*******************comments********************************************************/\ndocument.getElementById(\"add-comment-btn\").addEventListener(\"click\", () => {\n    if (commentBody.value == \"\") {\n        commentBody.style.border = \"2px solid red\";\n    } else {\n    fetch(\"/posts/api\", {\n        method: \"POST\",\n        headers: {\n            \"Accept\" : \"application/json\",\n            \"Content-type\" : \"application/json\"\n        },\n        body: JSON.stringify({\n            commentBody: commentBody.value,\n            userId: userIdFromHidTag.value,\n            postId: postIdFromHidTag.value\n        })\n    })\n    .then((res) => res.json())\n    .then((data) => console.log(data))\n    }\n});\n\n\n/*******************end comments********************************************************/\n\n//TODO: javascript function to append to div. can be used for checking coments made by the 10 sec\n// check and also the comment return on the posting comment to append to div\n// also adjust comment time each go around\n\nwindow.setInterval(() => {\n    let postFound = false;\n    commentsList = document.querySelectorAll(\".comment\");\n    /*\n    commentsList.forEach(comment => {\n        console.log(comment.firstElementChild.firstElementChild.value);\n    })\n    */\n    fetch(`/posts/api/${postIdFromHidTag.value}`, {method: \"GET\"})    \n        .then(res => res.json())\n        .then(data => {\n            data.forEach(post => {\n                postFound = false;\n                commentsList.forEach(comment => {\n                    if (comment.firstElementChild.firstElementChild.value == post._id) {\n                        // if there's a match see if text has been changed, if it has then change it\n                        postFound = true;\n                        if (post.commentBody != comment.children[1].children[1].innerText) {\n                            comment.children[1].children[1].innerText = post.commentBody;\n                        }\n                    } \n                });\n                // if it did not find the post then add it.\n                if (postFound == false) {\n                    output = `\n                    <div class=\"card\">\n                        <div class=\"container\">\n                            <div class=\"comment\">\n                                <div class=\"comment-span-left\">\n                                    <input class=\"comment-id\" type=\"hidden\" value=${post._id}>\n                                    <p class=\"author-name\">${post.authorUserName}</p>\n                                    <img class=\"avatar\" src=\"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50\" />\n                                    <p class=\"member-since\">${memberSince(post.authorDateJoined)}</p>\n                                </div>\n                                <span class=\"comment-span-right\">\n                                    <p class=\"post-date\">${getPostDateTime(post.date)}</p>\n                                    <p class=\"post-content\">${post.commentBody}</p>\n                                </span> \n                            </div>\n                        </div> \n                    </div\n                    `\n                    commentDiv.innerHTML += output;\n                }\n            });\n        });\n\n    // check for comments that are new\n        // check by comment id\n        // check to see if the comment text is different\n    // adjust comment times and outtput as needed(put this in antoehr function)\n    // if post on browser but not in json then delete from browser...maybe\n}, 10000);\n\nfunction getPostDateTime(DateOfPost) {\n    let postDate = new Date(DateOfPost)\n    let timeDifference = new Date(Date.now() - postDate);\n\n    const tenSeconds = 10000;\n    const minute = 60000;\n    const hour = 3600000;\n    const day = 86400000;\n\n    if (timeDifference.getTime < tenSeconds) {\n        return \"just now\";\n    } else if (timeDifference.getTime < minute) {\n        return \"less than a minute ago\";\n    } else if (timeDifference.getTime < (minute * 10)) {\n        return \"less than 10 minutes ago\";\n    } else if (timeDifference.getTime < (minute * 30)) {\n        return \"less than half hour ago\";\n    } else if (timeDifference.getTime < hour) {\n        return \"less than an hour ago\";\n    } else if (timeDifference.getTime < day) {\n        return \"less than a day ago\"\n    } else {\n        return \"posted on \" + postDate.toLocaleDateString();\n    }\n}\n\nfunction memberSince(DateOfMembership) {\n    let memberDate = new Date(DateOfMembership);\n    return \"member since \" + memberDate.toLocaleDateString();\n}\n\n//# sourceURL=webpack:///./public/javascript/postView.js?");

/***/ })

/******/ });