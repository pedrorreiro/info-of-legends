import axios from "axios";
import { headers } from "../Headers/index.js";
import { parseJsonToArray } from "../ParseJsonToArray.js";
import { getLastVersion } from "../Version/index.js";

export const mapTags = {
    "Fighter": "Lutadores",
    "Tank": "Tanks",
    "Mage": "Magos",
    "Assassin": "Assassinos",
    "Marksman": "Atiradores",
    "Support": "Suportes"
}

export const getFreeWeek = async() => {
    const url = `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations`;
    const response = await axios.get(url, { headers });
    const champions = parseJsonToArray(response.data.freeChampionIds);

    const data = await getAllChampions();
    const allChampions = data.champions;
    const championsFreeWeek = [];

    Object.keys(allChampions).forEach((champion) => {

        if (champions.includes(parseInt(allChampions[champion].key))) {
            championsFreeWeek.push(allChampions[champion]);
         
        }

    //     console.log(allChampions[champion].key);
    });

    return championsFreeWeek;

}

export const getChampionImageUrl = async(champion, lastVersion) => {

    return `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/champion/${champion}.png`;

}

export const getAllChampions = async () => {

    const tags = [];
    const lastVersion = await getLastVersion();

    try{
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/pt_BR/champion.json`);
        const champions = parseJsonToArray(response.data)[3];

        Object.keys(champions).forEach(async(key) => {

            const img = await getChampionImageUrl(champions[key].id, lastVersion);

            champions[key].img = img;

            champions[key].tags.forEach((tag) => {

                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });

        return {
            champions,
            tags,
        };
    }
    catch(error){
        console.log(error);
    }
}



export const getChampInfo = async (champion) => {
    
        const lastVersion = await getLastVersion();
    
        try{
            const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/pt_BR/champion/${champion}.json`);
            const champInfo = parseJsonToArray(response.data)[3];
    
            

            // adicionando a url da imagem do campeão

            champInfo[champion].img = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/champion/${champion}.png`;

            // adicionando a url da imagem da passiva

            champInfo[champion].passive.image.full = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/passive/${champInfo[champion].passive.image.full}`;

            // adicionando a url da imagem das habilidades

            champInfo[champion].spells.forEach((spell) => {
                    
                    spell.image.full = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/spell/${spell.image.full}`;
            });

            return champInfo[champion];
        }
        catch(error){
            console.log(error);
        }
}

export const getChampNameById = async (id) => {
    
    const lastVersion = await getLastVersion();

    try{
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/pt_BR/champion.json`);
        const champions = parseJsonToArray(response.data)[3];
        const champName = Object.keys(champions).find((key) => champions[key].key == id);
        return champName;
    }
    catch(error){
        console.log(error);
    }
}