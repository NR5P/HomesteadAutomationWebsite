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
