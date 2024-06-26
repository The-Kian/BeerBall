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
  for (let i = 0; i < shuffledPlayers.length; i += 2) {
    const firstHalf = shuffledPlayers[i].playerName.slice(0, shuffledPlayers[i].playerName.length / 2);
    const secondHalf = shuffledPlayers[i + 1].playerName.slice(shuffledPlayers[i + 1].playerName.length / 2);
    const teamName = firstHalf + secondHalf;
    const team: Team = { id: uuidv4(), name: teamName, members: shuffledPlayers.slice(i, i + 2), };
    teams.push(team);
  }
  return teams;
}