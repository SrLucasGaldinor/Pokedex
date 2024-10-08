const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon')

const form = document.querySelector('.form')
const input = document.querySelector('.pokemon-search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let startPokemon = 1;

const searchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await searchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        startPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'NOT FOUND';
        pokemonNumber.innerHTML = '';
    }
}

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
    });

    buttonPrev.addEventListener('click', () => {
        if (startPokemon > 1) {
            startPokemon -= 1;
            renderPokemon(startPokemon)
        }
    })

    buttonNext.addEventListener('click', () => {
        startPokemon += 1;
        renderPokemon(startPokemon);
    });

    renderPokemon(startPokemon);

