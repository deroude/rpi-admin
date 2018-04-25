import RadioStation from "./RadioStation";
import RadioGenre from "./RadioGenre";
import { Schema } from "mongoose";

const RadioStatus = new Schema({
    selectedGenre: RadioGenre,
    selectedSubgenre: RadioGenre,
    selectedStation: RadioStation,
    subgenresCollapsed: Boolean,
    favoritesCollapsed: Boolean,
    stationsCollapsed: Boolean,
    playingStation: RadioStation,
    favorites: [RadioStation]
});

export default RadioStatus;