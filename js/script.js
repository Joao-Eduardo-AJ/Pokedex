const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const traco = document.querySelector('#traço')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('#prev')
const buttonNext = document.querySelector('#next')

var searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    traco.textContent = '-';
    pokemonImage.style.display = 'block';
    pokemonName.style.fontSize = '0.9em';

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = 'Carregando...'
    pokemonNumber.textContent = '';
    traco.textContent = '';
    
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.textContent = data.name;
        pokemonNumber.textContent = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonNumber.textContent = ''; 
        pokemonName.style.fontSize = '0.6em';
        pokemonName.textContent = 'Pokémon não encontrado';
        traco.textContent = '';
        input.value = '';
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon)