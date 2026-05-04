// ============================================================
// Task 11.4: Async / Await
// Time: 45 minutes
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
// Exercise 1: Converting to Async/Await
// ------------------------------------------------------------

// PROMISE CHAIN VERSION (for comparison)
function getDataWithPromises() {
    return getUserData(1)
        .then(user     => getUserPosts(user.id))
        .then(posts    => getPostComments(posts[0].id))
        .then(comments => comments);
}

// ASYNC/AWAIT VERSION — identical behaviour, far more readable
// async functions always return a Promise automatically.
// await pauses execution inside the function without blocking the thread.
async function getDataWithAsync() {
    const user     = await getUserData(1);
    const posts    = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

// Calling with .then() — async functions return a Promise
getDataWithAsync().then(comments => console.log("Comments:", comments));

// Calling from inside another async function using await
async function main() {
    const comments = await getDataWithAsync();
    console.log("Comments via main():", comments);
}

main();


// ------------------------------------------------------------
// Exercise 2: Error Handling with Try/Catch
// ------------------------------------------------------------
// try/catch with async/await replaces .catch() on Promise chains.
// It catches both synchronous throws and rejected Promises.

async function fetchUserData(userId) {
    try {
        const user  = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error.message);
        throw error; // re-throw so the caller can also handle it
    }
}

// Valid ID — resolves and returns { user, posts }
fetchUserData(1).then(data => console.log("Fetched:", data));

// Invalid ID — caught by try/catch, error logged
fetchUserData(-1).catch(() => {}); // suppress unhandled rejection warning


// ------------------------------------------------------------
// Exercise 3: Parallel with Async/Await
// ------------------------------------------------------------

async function getAllUsers() {
    // SEQUENTIAL — each awaits the previous; total time ~1500ms
    const user1 = await getUserData(1);
    const user2 = await getUserData(2);
    const user3 = await getUserData(3);
    console.log("Sequential:", [user1, user2, user3].map(u => u.name));
    // Total time: ~3 seconds

    // PARALLEL — all start at the same time; total time ~500ms
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3),
    ]);
    console.log("Parallel:", [u1, u2, u3].map(u => u.name));
    // Total time: ~1 second

    return [u1, u2, u3];
}

getAllUsers();


// ------------------------------------------------------------
// BUILD: Rewrite the Callback Hell Example Using Async/Await
// ------------------------------------------------------------
// The original callback hell had three levels of nesting.
// Here it becomes a single, top-to-bottom async function.

async function loadUserDataAsync() {
    try {
        // Step 1 — fetch the user
        const user = await getUserData(1);
        console.log("User:", user);

        // Step 2 — fetch that user's posts
        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);

        // Step 3 — fetch comments on the first post
        const comments = await getPostComments(posts[0].id);
        console.log("Comments:", comments);

    } catch (error) {
        // One catch block handles any failure from any of the three steps
        console.error("Something went wrong:", error.message);
    }
}

loadUserDataAsync();