// ============================================================
// Task 11.3: Promise Chaining
// Time: 40 minutes
// ============================================================
// Note: The three Promise-based functions from Task 11.2 are
// redefined here so this file runs independently.
// ============================================================


// Shared helper functions (Promise versions)
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: `User_${userId}` });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 500);
    });
}

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
        }, 500);
    });
}

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
        }, 500);
    });
}


// ------------------------------------------------------------
// Exercise 1: Chain Promises
// ------------------------------------------------------------
// Each .then() returns a new Promise, keeping the chain flat.
// One .catch() at the end handles any error from any step above.

getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id); // return next Promise to continue chain
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id); // return next Promise
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        // One catch handles any rejection anywhere in the chain
        console.error("Error:", error.message);
    });


// ------------------------------------------------------------
// Exercise 2: Promise.all — Run Multiple Promises in Parallel
// ------------------------------------------------------------
// All three requests fire at the same time (~500ms total).
// Results arrive as an ordered array matching the input order.
// If ANY promise rejects, the whole .catch() runs immediately.

const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        // results = [user1, user2, user3] in the same order
        console.log("All users:", results);
    })
    .catch(error => {
        console.error("One failed:", error.message);
    });


// ------------------------------------------------------------
// Exercise 3: Promise.race — First to Complete Wins
// ------------------------------------------------------------
// Resolves (or rejects) as soon as the first promise settles.

const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result); // "Fast!" — resolves after 100ms
    });


// ------------------------------------------------------------
// BUILD: Fetch data for 3 users simultaneously & display all at once
// ------------------------------------------------------------

Promise.all([
    getUserData(1),
    getUserData(2),
    getUserData(3),
])
    .then(([user1, user2, user3]) => {
        // All three arrive together — destructure directly from the array
        console.log("--- All Users Loaded ---");
        console.log("User 1:", user1);
        console.log("User 2:", user2);
        console.log("User 3:", user3);
    })
    .catch(error => {
        console.error("Failed to load users:", error.message);
    });