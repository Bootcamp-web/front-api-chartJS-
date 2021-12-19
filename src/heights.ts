import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
} from "chart.js";
import { getPokemon } from "./script"
Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
);

const pintaDatos = (pokedata?: any) => {
    const height = document.getElementById("height");
    if (!height) {
        throw new Error(`Missing tag: <canvas id="height"></canvas>`)
    }
    const ctx = (height as HTMLCanvasElement).getContext("2d");
    if (!ctx) {
        throw new Error(`Missing tag: <canvas id="height"></canvas>`)
    }

    const labels = pokedata.map((pk: any) => pk.name);
    const data = pokedata.map((pk: any) => pk.altura);

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Altura del pokemon',
                data: data,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

window.onload = () => {
    let pokePromises = [];
    for (let i = 1; i <= 151; i++) {
        pokePromises.push(getPokemon(i));
    }
    Promise.all(pokePromises).then((pokemons) => {
        return pokemons.map((data: any, i: number) => {
            return {
                name: data.name,
                altura: data.height
            };
        });
    }).then((pokedata) => { console.log(pokedata); pintaDatos(pokedata) })
}