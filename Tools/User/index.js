import axios from "axios";
import { headers } from "../Headers/index.js";
import { getLastVersion } from "../Version/index.js";

export const getUserDataByName = async (user) => {

    const formatedString = user.split(" ").join("%20");
    const lastVersion = await getLastVersion();

    try {
        var { data } = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${formatedString}`, { headers });
        data.profileIconImg = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/${data.profileIconId}.png`;
 
        return data;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }


}