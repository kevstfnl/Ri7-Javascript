const cardsList = document.getElementById("cardsList");
const home = document.getElementById("home");
const card = document.getElementById("cardsTemplate");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const api = "https://pokeapi.co/api/v2/";
let displayed = 0;


searchButton.addEventListener("click", () => search());
searchBar.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key == "Enter") {
        search();
    }
})

class Pokemon {
    constructor(pokemon, species) {
        this.id = pokemon.id;
        this.name = species.names[4].name;
        this.spritFront = pokemon.sprites.front_default;
        this.spritBack = pokemon.sprites.back_default;
        this.crie = new Audio(pokemon.cries.legacy);
        this.height = pokemon.height;
        this.weight = pokemon.weight;
    }

    display() {
        const pokemonCard = card.content.cloneNode(true);
        pokemonCard.querySelector(".name").textContent = "Nom: " + this.name;
        pokemonCard.querySelector(".height").textContent = "Hauteur: " + this.height;
        pokemonCard.querySelector(".weight").textContent = "Epaisseur: " + this.weight;

        const imgContainer = pokemonCard.querySelector(".sprites-container");
        const turnButton = pokemonCard.querySelector(".turn");
        const soundButton = pokemonCard.querySelector(".play");
        const supressButton = pokemonCard.querySelector(".suppress");
        pokemonCard.querySelector(".front").src = this.spritFront;
        pokemonCard.querySelector(".back").src = this.spritBack;
        turnButton.addEventListener("click", () => {
            imgContainer.classList.toggle("turn");
        });
        soundButton.addEventListener("click", () => {
            this.crie.play();
        });
        supressButton.addEventListener("click", () => {
            const parentCard = supressButton.closest(".cards");
            if (parentCard) {
                parentCard.remove();
                displayed--;
            }
            if (displayed == 0) {
                home.classList.remove("hidden")
            }
        })
        cardsList.prepend(pokemonCard);
    }
}

function search() {
    let search = searchBar.value;
    if (search == "") return;
    searchBar.value = "";
    home.classList.add("hidden");
    error.classList.add("hidden")
    loading.classList.remove("hidden");
    fetchData(search);
}

async function fetchData(search) {
    try {
        const speciesResp = await fetch(api + "pokemon-species/" + search);
        if (!speciesResp.ok) throw new Error("Espèce du pokemon non trouvé dans l'api");

        const pokemonResp = await fetch(api + "pokemon/" + search);
        if (!pokemonResp.ok) throw new Error("Données du pokemon non trouvé dans l'api");

        const species = await speciesResp.json();
        const pokemon = await pokemonResp.json();

        addCard(pokemon, species);
    } catch (err) {
        errorMessage.textContent = "Raison: " + err.message;
        error.classList.remove("hidden")
    }
    finally {
        loading.classList.add("hidden");
    }
}

function addCard(pokemon, species) {
    const poke = new Pokemon(pokemon, species);
    poke.display();
    displayed++;
}