import { Film } from "./starship-film.model";
import { Pilot } from "./starship-pilot.model";

export interface StarshipModel {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    starship_class: string;
    url: string;
    id: string;
    pilots: Pilot[];
    films: Film[];
}
