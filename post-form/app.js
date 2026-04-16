async function createPost(title, body) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body, userId: 1 })
    });

    return response.json();
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const result = await createPost(title, body);

    document.getElementById("result").textContent =
        "Post created with ID: " + result.id;
});