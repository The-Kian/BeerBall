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

    // Separate Josh and Molly from the rest of the players
    const joshAndMolly = players.filter(player => player.playerName === "Josh" || player.playerName === "Molly");
    const otherPlayers = players.filter(player => player.playerName !== "Josh" && player.playerName !== "Molly");
  
    // Add Josh and Molly to the teams array
    if (joshAndMolly.length === 2) {
      const teamName = "JoshMolly";
      const team: Team = { id: uuidv4(), name: teamName, members: joshAndMolly };
      teams.push(team);
    }
  

  const shuffledPlayers = shuffleArray(otherPlayers)
  for (let i = 0; i < shuffledPlayers.length; i += 2) {
    const firstHalf = shuffledPlayers[i].playerName.slice(0, shuffledPlayers[i].playerName.length / 2);
    const secondHalf = shuffledPlayers[i + 1].playerName.slice(shuffledPlayers[i + 1].playerName.length / 2);
    const teamName = firstHalf + secondHalf;
    const team: Team = { id: uuidv4(), name: teamName, members: shuffledPlayers.slice(i, i + 2), };
    teams.push(team);
  }
  return teams;
}