import { StarshipModel } from "./starship";

export interface StarshipApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: StarshipModel[];
}
