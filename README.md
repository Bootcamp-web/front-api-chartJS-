# front-api-chartJS-

1. [Introducción  yarn](#schema1)
2. [Introducción  yarn](#schema1)
<hr>

<a name="schema1"></a>

# 1 Seguimos los paso del repositorio `api-charJtS`
 Además instalamos parcel
~~~bash
yarn add parcel
~~~

Y creamos un `index.html` y un `sytle.css`
<hr>

<a name="schema2"></a>

# 2 Primera version
~~~js
fetch("https://pokeapi.co/api/v2/pokemon/25").then((e:Response)=>{
    e.json().then((data:Response)=>{
        console.log(data);
    })
})
const addPokemon = (pk:any)=>{
    const {name, img}= pk;
    const pokeholder:HTMLElement=document.createElement("div");
    pokeholder.className="pokemon"
    const label:HTMLElement = document.createElement("p");
    label.innerHTML = name;
    const imgEl:HTMLElement = document.createElement("img");
    imgEl.setAttribute("src",img);
    pokeholder.append(label);
    pokeholder.append(imgEl)
    const pokedex = document.getElementById("pokedex")
    if (!pokedex){
        throw new Error(`Missing tag <div id = "pokedex>`)
    }
    pokedex.append(pokeholder)

}

window.onload=()=>{
    addPokemon({
        name:"Pikachu",
        img:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png"
    })
}
~~~


# 3 Segunda opción
~~~js
const getPokemom = (id:number)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url).then((e: Response) => {
        console.log("response");
        return e.json().then((data: Response) => {
            return data;
        })
    })
}

const addPokemon = (pk:any)=>{
    const {name, img}= pk;
    const pokeholder:HTMLElement=document.createElement("div");
    pokeholder.className="pokemon"
    const label:HTMLElement = document.createElement("p");
    label.innerHTML = name;
    const imgEl:HTMLElement = document.createElement("img");
    imgEl.setAttribute("src",img);
    pokeholder.append(label);
    pokeholder.append(imgEl)
    const pokedex = document.getElementById("pokedex")
    if (!pokedex){
        throw new Error(`Missing tag <div id = "pokedex>`)
    }
    pokedex.append(pokeholder)

}

window.onload=()=>{
    getPokemom(25).then((data:any)=>{
        addPokemon({
            name:data.name,
            img:data.sprites.front_default
        })
    })
}
~~~