import axios from "axios";
import { getLastVersion } from "../Version";

export const getSpellsById = async (s1, s2) => {

    const lastVersion = await getLastVersion();

    try {
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/pt_BR/summoner.json`);
        const spells = response.data.data;

        var spell1;
        var spell2;

        var sp = Object.keys(spells).map((key) => {
      

            const url = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/spell/${key}.png`;

            if (spells[key].key == s1) {
                spell1 = url;
                return spells[key];
            
            }

            if (spells[key].key == s2) {
                spell2 = url;
                return spells[key];
       
            }
        });

        return [spell1, spell2];


    }
    catch (error) {
        console.log(error);
    }
}