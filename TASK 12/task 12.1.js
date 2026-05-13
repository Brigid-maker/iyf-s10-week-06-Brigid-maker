// ============================================================
// Task 12.1: Fetch API Basics
// Time: 30 minutes
//
// How to run:
//   Browser — open in any HTML file via <script src="task-12-1.js">
//   Node.js — node task-12-1.js  (Node 18+ has built-in fetch)
// ============================================================

const BASE_URL = "https://jsonplaceholder.typicode.com";


// ------------------------------------------------------------
// Exercise 1: Your First Fetch (.then() chain)
// ------------------------------------------------------------

function firstFetch() {
    fetch(`${BASE_URL}/users/1`)
        .then(response => {
            console.log("Response object:", response);
            console.log("Status:", response.status); // 200
            console.log("OK:", response.ok);         // true
            return response.json();                  // parse JSON body
        })
        .then(data => {
            console.log("User data:", data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

firstFetch();


// ------------------------------------------------------------
// Exercise 2: Fetch with Async/Await
// ------------------------------------------------------------

async function getUser(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`);

        // Always check response.ok — fetch only rejects on network errors,
        // not on HTTP error status codes like 404 or 500
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error.message);
    }
}


// ------------------------------------------------------------
// Practice 1: Fetch a single user
// ------------------------------------------------------------

async function fetchSingleUser() {
    const user = await getUser(1);
    console.log("Single user:", user);
}

fetchSingleUser();


// ------------------------------------------------------------
// Practice 2: Fetch all users
// ------------------------------------------------------------

async function fetchAllUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        console.log(`All users (${users.length} total):`, users);
        return users;
    } catch (error) {
        console.error("Failed to fetch all users:", error.message);
    }
}

fetchAllUsers();


// ------------------------------------------------------------
// Practice 3: Fetch posts for user 1
// ------------------------------------------------------------

async function fetchPostsForUser(userId) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/posts`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        console.log(`Posts for user ${userId} (${posts.length} total):`, posts);
        return posts;
    } catch (error) {
        console.error(`Failed to fetch posts for user ${userId}:`, error.message);
    }
}

fetchPostsForUser(1); 