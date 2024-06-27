export class Details{
    async getGameDetails(gameId) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '10c8ed14eamsh9193df06fdb9b71p12c105jsn3a7b6db33508',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;

        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}