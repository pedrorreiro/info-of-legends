import axios from "axios";
import { headers } from "../Headers/index.js";
import { getLastVersion } from "../Version/index.js";

export const getUserDataByName = async (user) => {
  const formatedString = user.split(" ").join("+");
  const lastVersion = await getLastVersion();

  try {
    const { data } = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${formatedString}/BR1`,
      { headers }
    );

    const puuid = data.puuid;

    const { data: data2 } = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers }
    );

    const result = {
      puuid: puuid,
      profileIconImg: `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/${data2.profileIconId}.png`,
      summonerLevel: data2.summonerLevel,
      name: data.gameName,
    };

    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
