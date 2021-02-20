import {join, BufReader, parse, _} from '../dep.ts';

interface Planets {
    [key: string] : string
}

let planets : Array<Planets>

async function loadPlanetsData() {
    const path = join("./data", "kep_planets.csv");
    const file = await Deno.open(path);
    const bufReader = new BufReader(file);
    const result = await parse(bufReader, {
        comment: '#',
        skipFirstRow: true,
    });

    Deno.close(file.rid)
    const planets = (result as Array<Planets>).filter((planet) => {
        const planetaryRadius  = Number(planet["koi_prad"]);
        const stellarMass = Number(planet["koi_smass"]);
        const stellarRadius = Number(planet["koi_srad"]);

        return planet["koi_disposition"] === 'CONFIRMED' && 
        planetaryRadius > 0.5 && planetaryRadius < 1.5
        && stellarMass > 0.78 && stellarMass < 1.04
        && stellarRadius > 0.99 && stellarRadius < 1.01;
    })
    return planets.map((planet) => {
        return _.pick(planet, [
            "koi_prad",
            "koi_smass",
            "koi_srad",
            "kepler_name"
        ])
    });
}



planets = await loadPlanetsData();

console.log(`Number of habitable planets found is ${planets.length}`)

export function getAllPlanets() : Array<Planets> {
    return planets
}
