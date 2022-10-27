export const getLastVersion = async () => {
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const data = await response.json();
    return data[0];
}