import { StarshipModel } from "./starship.model";

export interface StarshipApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: StarshipModel[];
}
