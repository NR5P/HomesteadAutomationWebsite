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
                            <p class="author-name">${post.authorUserName}</p>
                            <p class="member-since">${post.authorDateJoined}</p>
                            <p class="post-date">${post.date}</p>
                            <p class="post-content">${post.commentBody}</p>
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
