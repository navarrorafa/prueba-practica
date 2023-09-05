//variables
const pokemon = document.querySelector('#pokemon');
const buttonBuscar = document.querySelector('#buttonBuscar');
const mostrador = document.querySelector('#mostrador');
const favorito = document.querySelector('#favorito');
const fragment = document.createDocumentFragment();

//array


//eventos

buttonBuscar.addEventListener('click', () => {
    const nombrePokemon = pokemon.value
    buscarPokemon(nombrePokemon)
})

//Funcion

const buscarPokemon = async (nombrePokemon) => {

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        const url = await response.json();
        console.log(url)
        mostrarPokemon(url)



    } catch (error) {
        console.log("Pokemon no encontraqdo")

    };

};

const mostrarPokemon = (url) => {

    const idPokemon = document.createElement('p');
    idPokemon.textContent = `Id: ${url.id}`

    const infoPokemon = document.createElement('p');
    infoPokemon.textContent = `Nombre : ${url.forms[0].name}`;

    const tipoPokemon = document.createElement('p');
    tipoPokemon.textContent = `Tipo : ${url.types[0].type.name}`

    const buttonFavorito = document.createElement('button');
    buttonFavorito.textContent = 'Agregar'


    fragment.appendChild(idPokemon);
    fragment.appendChild(infoPokemon);
    fragment.appendChild(tipoPokemon);
    fragment.appendChild(buttonFavorito);

    mostrador.innerHTML = ''; // Limpia el contenido anterior
    mostrador.appendChild(fragment);

}

// agregar

const agregarFavorito = (pokemon) => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

   
    const esDuplicado = favoritos.some((favorito) => favorito.id === pokemon.id);

    if (!esDuplicado) {
        favoritos.push(pokemon);

      
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log('Pokémon agregado ');
    } else {
        console.log('Este Pokémon ya está en tus favoritos');
    }
};


//


const mostrarFavorito = () => {

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const ulFavoritos = document.createElement('ul');

    favoritos.forEach((item) => {
        const liItem = document.createElement('li');
        liItem.textContent = `Id : ${item.id} Nombre : ${item.forms[0].name} Tipo : ${item.types[0].type.name} `;

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = "X";

        liItem.appendChild(eliminarButton);
        ulFavoritos.appendChild(liItem);

    });

        favorito.innerHTML = '';
        favorito.appendChild(ulFavoritos);


};