// 🔹 Exercise 1: Predict Output
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Output: A, C, E, B, D


// 🔹 Exercise 2: Callback Pattern
function loadUser(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "Jane" });
    }, 1500);
}

loadUser(1, user => console.log("Loaded user:", user));


// 🔴 Callback Hell
function getUserData(id, cb) {
    setTimeout(() => cb({ id, name: "John" }), 1000);
}

function getUserPosts(id, cb) {
    setTimeout(() => cb([{ id: 1, title: "Post 1" }]), 1000);
}

function getPostComments(id, cb) {
    setTimeout(() => cb([{ text: "Nice!" }]), 1000);
}

getUserData(1, user => {
    console.log(user);
    getUserPosts(user.id, posts => {
        console.log(posts);
        getPostComments(posts[0].id, comments => {
            console.log(comments);
        });
    });
});


// ✅ Promises version
function getUserDataP(id) {
    return new Promise((res, rej) => {
        setTimeout(() => res({ id, name: "John" }), 1000);
    });
}

function getUserPostsP(id) {
    return new Promise(res => {
        setTimeout(() => res([{ id: 1, title: "Post 1" }]), 1000);
    });
}

function getPostCommentsP(id) {
    return new Promise(res => {
        setTimeout(() => res([{ text: "Nice!" }]), 1000);
    });
}


// 🔗 Promise chaining
getUserDataP(1)
    .then(user => getUserPostsP(user.id))
    .then(posts => getPostCommentsP(posts[0].id))
    .then(comments => console.log("Chained:", comments));


// ⚡ Promise.all
Promise.all([
    getUserDataP(1),
    getUserDataP(2),
    getUserDataP(3)
]).then(users => console.log("All users:", users));


// 🏁 Promise.race
const fast = new Promise(res => setTimeout(() => res("Fast"), 100));
const slow = new Promise(res => setTimeout(() => res("Slow"), 500));

Promise.race([fast, slow]).then(console.log);


// 🔥 Async/Await
async function runAsync() {
    try {
        const user = await getUserDataP(1);
        const posts = await getUserPostsP(user.id);
        const comments = await getPostCommentsP(posts[0].id);
        console.log("Async/Await:", comments);
    } catch (err) {
        console.error(err);
    }
}

runAsync();