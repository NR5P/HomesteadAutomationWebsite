const userIdFromHidTag = document.getElementById("user-id");
const postIdFromHidTag = document.getElementById("post-id");
const commentBody = document.getElementById("add-comment");
let commentDiv = document.getElementById("comment-div");


//TODO: make this check every 10 seconds for a new comment and append to the html with new comment
window.onload = () => {
    fetch(`/posts/api/${postIdFromHidTag.value}`, {method: "GET"})    
        .then(res => res.json())
        .then(data => {
            data.forEach(post => {
                output = `
                    <div class="card">
                        <div class="container">
                            <div class="comment">
                                <div class="comment-span-left">
                                    <input class="comment-id" type="hidden" value=${post._id}>
                                    <p class="author-name">${post.authorUserName}</p>
                                    <img class="avatar" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                </div>
                                <span class="comment-span-right">
                                    <p class="member-since">${memberSince(post.authorDateJoined)}</p>
                                    <p class="post-date">${getPostDateTime(post.date)}</p>
                                    <p class="post-content">${post.commentBody}</p>
                                </span> 
                            </div>
                        </div> 
                    </div
                `
                commentDiv.innerHTML += output;
            });
        });
};

/*******************comments********************************************************/
document.getElementById("add-comment-btn").addEventListener("click", () => {
    if (commentBody.value == "") {
        commentBody.style.border = "2px solid red";
    } else {
    fetch("/posts/api", {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            commentBody: commentBody.value,
            userId: userIdFromHidTag.value,
            postId: postIdFromHidTag.value
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    }
});


/*******************end comments********************************************************/

//TODO: javascript function to append to div. can be used for checking coments made by the 10 sec
// check and also the comment return on the posting comment to append to div
// also adjust comment time each go around

window.setInterval(() => {
    let postFound = false;
    commentsList = document.querySelectorAll(".comment");
    /*
    commentsList.forEach(comment => {
        console.log(comment.firstElementChild.firstElementChild.value);
    })
    */
    fetch(`/posts/api/${postIdFromHidTag.value}`, {method: "GET"})    
        .then(res => res.json())
        .then(data => {
            data.forEach(post => {
                postFound = false;
                commentsList.forEach(comment => {
                    if (comment.firstElementChild.firstElementChild.value == post._id) {
                        // if there's a match see if text has been changed, if it has then change it
                        postFound = true;
                        if (post.commentBody != comment.children[1].children[2].innerText) {
                            comment.children[1].children[2].innerText = post.commentBody;
                        }
                    } 
                });
                // if it did not find the post then add it.
                if (postFound == false) {
                    output = `
                    <div class="card">
                        <div class="container">
                            <div class="comment">
                                <div class="comment-span-left">
                                    <input class="comment-id" type="hidden" value=${post._id}>
                                    <p class="author-name">${post.authorUserName}</p>
                                    <img class="avatar" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                                </div>
                                <span class="comment-span-right">
                                    <p class="member-since">${memberSince(post.authorDateJoined)}</p>
                                    <p class="post-date">${getPostDateTime(post.date)}</p>
                                    <p class="post-content">${post.commentBody}</p>
                                </span> 
                            </div>
                        </div> 
                    </div
                    `
                    commentDiv.innerHTML += output;
                }
            });
        });

    // check for comments that are new
        // check by comment id
        // check to see if the comment text is different
    // adjust comment times and outtput as needed(put this in antoehr function)
    // if post on browser but not in json then delete from browser...maybe
}, 10000);

function getPostDateTime(DateOfPost) {
    let postDate = new Date(DateOfPost)
    let timeDifference = new Date(Date.now() - postDate);

    const tenSeconds = 10000;
    const minute = 60000;
    const hour = 3600000;
    const day = 86400000;

    if (timeDifference.getTime < tenSeconds) {
        return "just now";
    } else if (timeDifference.getTime < minute) {
        return "less than a minute ago";
    } else if (timeDifference.getTime < (minute * 10)) {
        return "less than 10 minutes ago";
    } else if (timeDifference.getTime < (minute * 30)) {
        return "less than half hour ago";
    } else if (timeDifference.getTime < hour) {
        return "less than an hour ago";
    } else if (timeDifference.getTime < day) {
        return "less than a day ago"
    } else {
        return "posted on " + postDate.toLocaleDateString();
    }
}

function memberSince(DateOfMembership) {
    let memberDate = new Date(DateOfMembership);
    return "member since " + memberDate.toLocaleDateString();
}