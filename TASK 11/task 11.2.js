// ============================================================
// Task 11.2: Callback Hell & Introduction to Promises
// Time: 40 minutes
// ============================================================


// ------------------------------------------------------------
// Exercise 1: Experience Callback Hell ("Pyramid of Doom")
// ------------------------------------------------------------

// Three callback-based data functions
function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" },
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!"       },
            { id: 2, text: "Thanks for sharing" },
        ]);
    }, 1000);
}

// THE NIGHTMARE — deeply nested, hard to read, debug, or maintain
getUserData(1, function (user) {
    console.log("User:", user);
    getUserPosts(user.id, function (posts) {
        console.log("Posts:", posts);
        getPostComments(posts[0].id, function (comments) {
            console.log("Comments:", comments);
            // Imagine 3 more levels deep... this is callback hell
        });
    });
});


// ------------------------------------------------------------
// Exercise 2: Promises to the Rescue
// ------------------------------------------------------------

// Creating a Promise — wraps async work, represents a future value
const myPromise = new Promise((resolve, reject) => {
    const success = true;

    setTimeout(() => {
        if (success) {
            resolve("It worked!"); // fulfilled
        } else {
            reject("Something went wrong"); // rejected
        }
    }, 1000);
});

// Using a Promise — .then() for success, .catch() for errors
myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });


// ------------------------------------------------------------
// BUILD: Refactor all three functions to return Promises
// ------------------------------------------------------------

// getUserData — resolves with user object, rejects if userId is invalid
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// getUserPosts — resolves with array of posts for the given userId
function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1", userId },
                    { id: 2, title: "Post 2", userId },
                ]);
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// getPostComments — resolves with array of comments for the given postId
function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!",        postId },
                    { id: 2, text: "Thanks for sharing", postId },
                ]);
            } else {
                reject(new Error("Invalid post ID"));
            }
        }, 1000);
    });
}

// Usage — valid ID resolves successfully
getUserData(1)
    .then(user  => console.log("User:", user))
    .catch(err  => console.error("Error:", err.message));

// Usage — invalid ID triggers the rejection path
getUserData(-1)
    .then(user  => console.log("User:", user))
    .catch(err  => console.error("Caught:", err.message));
// Output: "Caught: Invalid user ID"