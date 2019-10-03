const userId = document.getElementById("user-id").value


//TODO: exchange this with the way comments are loaded now. this will allow comparing 
// with the comments currently and updating livish
window.onload = () => {
    fetch(`/posts/api/comments/${userId}`)    
        .then(res => res.json())
        .then(data => console.log(data));
};

/*******************comments********************************************************/
document.getElementById("add-comment-btn").addEventListener("click", () => {
    if (commentTextArea.value == "") {
        commentTextArea.style.border = "2px solid red";
    } else {
    fetch("/posts/api/comment", {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            commentBody: commentTextArea.value,
            userId: userId.value,
            postId: postId.value
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    }
});

/*******************end comments********************************************************/
