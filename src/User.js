class User {
    #theUser;
    static compteur = 0;

    constructor(person) {
        this.title = person.title;
        this.lastName = person.lastName;
        this.firstName = person.firstName;
        this.city = person.city;
        this.age = person.age;
        this.email = person.email;
        this.picture = person.picture;
        this.country = person.country;

        this.#theUser = this.generateUser();
        this.#theUser.addEventListener("click", (event) => {
            this.inversion(event.currentTarget);
        });
    }

    generateUser() {
        const containerElement = document.createElement("div");
        containerElement.classList.add("user");
        containerElement.dataset.present = false;

        const childHTML = `
        <img src="${this.picture}">
        <div class="user--info">
                <h1>${this.title} ${this.firstName} ${this.lastName}</h1>
                <p>${this.age} years old</p>
                <p>${this.city}, ${this.country}</p>
        </div>
        <a href="mailto:${this.email}">
                <span class="mail">✉️</span>
        </a>
        `;
        containerElement.insertAdjacentHTML("afterbegin", childHTML);
        return containerElement;
    }

    render() {
        const main = document.querySelector("main");
        main.appendChild(this.#theUser);
    }

    inversion(user) {
        if (user.dataset.present === "false") {
            user.dataset.present = "true";
            User.compteur++;
        } else {
            user.dataset.present = "false";
            User.compteur--;
        };
        document.querySelector(".counter").textContent = `${User.compteur}/20 people are here`;
    }
}

export default User;