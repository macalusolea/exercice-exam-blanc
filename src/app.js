import User from "./User.js";

const url = "https://randomuser.me/api/?results=7";
const users = [];

const getUsers = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const cleanUsers = cleanUser(data.results);
        cleanUsers.forEach(user => {
            users.push(new User(user));
        });
        filterAlphabetic(users);
        displayUsers();
    }
    catch (error) {
        console.log("ATTENTION ATTENTION");
    };
}


const user = getUsers();
user.then((resultat) => console.log(resultat));
console.log(getUsers());

function cleanUser(data) {
    const personnes = data;
    return personnes.map(person => {
        return {
            title: person.name.title,
            firstName: person.name.first,
            lastName: person.name.last,
            city: person.location.city,
            country: person.location.country,
            age: person.dob.age,
            email: person.email,
            picture: person.picture.large
        };
    });
}

function filterAlphabetic(users) {
    return users.sort((a, b) => a.lastName.localeCompare(b.lastName));
}

function filterAge(users) {
    return users.sort((a, b) => a.age - b.age);
}

function displayUsers() {
    users.forEach((user) => {
        user.render();
    })
}

document.querySelector("#sort--name").addEventListener("click", () => {
    filterAlphabetic(users);
    document.querySelector("#sort--name").classList.add("selected");
    document.querySelector("#sort--age").classList.remove("selected");
    displayUsers();
})

document.querySelector("#sort--age").addEventListener("click", () => {
    filterAge(users);
    document.querySelector("#sort--name").classList.remove("selected");
    document.querySelector("#sort--age").classList.add("selected");
    displayUsers();
})

getUsers();
console.log(users);
