let users = [];
let filtered = [];

async function fetchUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await res.json();
    filtered = users;
    displayUsers(users);
    populateCities(users);
}

function displayUsers(list) {
    document.getElementById("users").innerHTML = list.map(u => `
        <div class="user">
            <h3>${u.name}</h3>
            <p>${u.email}</p>
            <p>${u.address.city}</p>
        </div>
    `).join("");
}

function populateCities(users) {
    const cities = [...new Set(users.map(u => u.address.city))];
    const select = document.getElementById("city-filter");

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });
}


// 🔍 Search
document.getElementById("search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();

    filtered = users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );

    displayUsers(filtered);
});


// 📍 Filter by city
document.getElementById("city-filter").addEventListener("change", e => {
    const city = e.target.value;

    filtered = city
        ? users.filter(u => u.address.city === city)
        : users;

    displayUsers(filtered);
});


// 🔤 Sort
document.getElementById("sort-az").onclick = () => {
    displayUsers([...filtered].sort((a, b) => a.name.localeCompare(b.name)));
};

document.getElementById("sort-za").onclick = () => {
    displayUsers([...filtered].sort((a, b) => b.name.localeCompare(a.name)));
};


// Init
fetchUsers();