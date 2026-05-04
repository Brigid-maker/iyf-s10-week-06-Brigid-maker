// ============================================================
// Task 11.1: Understanding Async
// Time: 30 minutes
// ============================================================


// ------------------------------------------------------------
// Exercise 1: Synchronous vs Asynchronous
// ------------------------------------------------------------

// SYNCHRONOUS — each line waits for the previous to finish
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");
// Output: 1, 2, 3 (always in order)

// ASYNCHRONOUS — setTimeout is non-blocking; JS moves on immediately
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");
// Output: 1, 3, then 2 (after 2 seconds)


// ------------------------------------------------------------
// Predict the Output
// ------------------------------------------------------------

console.log("A");

setTimeout(() => console.log("B"), 0);   // queued — runs AFTER all sync code

console.log("C");

setTimeout(() => console.log("D"), 100); // queued — runs after 100ms

console.log("E");

// Answer: A → C → E → B → D
//
// Why?
//   A, C, E — synchronous statements, execute immediately in order.
//   B       — setTimeout(0) places the callback in the task queue.
//             It only runs once the call stack is completely empty.
//   D       — setTimeout(100) runs approximately 100ms later.
//
// Key rule: the call stack always drains before any queued callbacks run,
// even when the delay is 0ms.


// ------------------------------------------------------------
// Exercise 2: Callback Pattern
// ------------------------------------------------------------

// PROVIDED — generic fetchData using a callback
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function (data) {
    console.log("Data received:", data);
});


// BUILD: loadUser — simulates a 1.5 second database lookup
function loadUser(userId, callback) {
    setTimeout(() => {
        // Mock user database
        const users = {
            1: { id: 1, name: "Alice",   role: "admin"  },
            2: { id: 2, name: "Bob",     role: "editor" },
            3: { id: 3, name: "Charlie", role: "viewer" },
        };

        const user = users[userId] ?? null; // null if userId not found

        callback(user);
    }, 1500); // simulates 1.5s database latency
}

// Usage — valid userId
loadUser(1, function (user) {
    if (user) {
        console.log("Loaded user:", user);
        // Output: { id: 1, name: "Alice", role: "admin" }
    } else {
        console.log("User not found");
    }
});

// Usage — invalid userId
loadUser(99, function (user) {
    if (user) {
        console.log("Loaded user:", user);
    } else {
        console.log("User not found"); // userId 99 does not exist
    }
});