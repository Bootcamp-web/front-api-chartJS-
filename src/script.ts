
// fetch("https://pokeapi.co/api/v2/pokemon/25").then((e:Response)=>{
//     e.json().then((data:Response)=>{
//         console.log(data);
//     })
// })

export const getPokemon = (id:number)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url).then((e: Response) => {
        console.log("response");
        return e.json().then((data: Response) => {
            return data;
        })
    })
}
type pkData = {
    name: string;
    sprites: { front_default: string };
}
type pkm = {
    name: string;
    img: string
}


const addPokemon = (pk:pkm)=>{
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

window.onload = () => {
    let pokePromises = [];
    for (let i = 1; i <= 10; i++) {
        pokePromises.push(getPokemon(i));
    }
    Promise.all(pokePromises).then((pokemons: any) => {
        pokemons.forEach((data: pkData, i: number) => {
            addPokemon({
                name: `#${i + 1} - ${data.name}`,
                img: data.sprites.front_default
            })
        })
    })
}