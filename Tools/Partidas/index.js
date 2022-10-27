import { headers } from "../Headers";
import axios from "axios";
import { getChampNameById } from "../Champions";
import { getLastVersion } from "../Version";
import { getSpellsById } from "../Spells";

export const getPartidas = async (puuid) => {

    const lastVersion = await getLastVersion();

    try {
        var { data } = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`, { headers });

        // pega dados partida

        const partidas = await Promise.all(data.map(async (id) => {
            const { data } = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${id}`, { headers });
            return data.info;
        }))

        await Promise.all(

            partidas.map(async (partida) => {
                partida.gameCreation = new Date(partida.gameCreation).toLocaleString();
                partida.gameEndTimestamp = new Date(partida.gameEndTimestamp).toLocaleString();
                partida.StartTimestamp = new Date(partida.gameStartTimestamp).toLocaleString();
                partida.gameDuration = new Date(partida.gameDuration * 1000).toISOString().substr(11, 8);
                partida.me = partida.participants.find((p) => p.puuid === puuid);

                const champName = await getChampNameById(partida.me.championId);
                const champImg = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/champion/${champName}.png`;

                partida.me.championName = champName;
                partida.me.championImg = champImg;

                partida.version = lastVersion;

                const spells = await getSpellsById(
                    partida.me.summoner1Id,
                    partida.me.summoner2Id
                );

                partida.me.item0 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item0}.png`;
                partida.me.item1 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item1}.png`;
                partida.me.item2 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item2}.png`;
                partida.me.item3 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item3}.png`;
                partida.me.item4 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item4}.png`;
                partida.me.item5 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item5}.png`;
                partida.me.item6 = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/item/${partida.me.item6}.png`;

                const build = [
                    partida.me.item0,
                    partida.me.item1,
                    partida.me.item2,
                    partida.me.item3,
                    partida.me.item4,
                    partida.me.item5,
                ]
            
                partida.me.spells = spells;
                partida.me.build = build;

                // partida.me.championName = ""
            })

        )

        // console.log(partidas);

        return partidas;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }


}