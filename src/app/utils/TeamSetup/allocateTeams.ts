import { v4 as uuidv4 } from "uuid";
import { Player, Team } from "@/app/types";

export default function allocateTeams(players: Player[]): Team[] {

    

    console.log("🚀 ~ allocateTeams ~ allocateTeams:");
    const teams: Team[] = [];

    function shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledPlayers = shuffleArray(players)
    for (let i = 0; i < shuffledPlayers.length; i+=2) {
        const team: Team = {
            id: uuidv4(),
            members: players.slice(i, i + 2),
            name: `Team ${i / 2 + 1}`,
        };
        teams.push(team);
    }
    return teams;
}