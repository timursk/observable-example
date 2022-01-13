import { BACKEND_SUPERHEROES } from "../utils/constants";

export default class HeroesService {
    getHeroes() {
        return BACKEND_SUPERHEROES;
    }
}