import { TournamentContext } from "@/app/context/TournamentContext";
import { RBSeedTeam, Team } from "@/app/types";
import { useContext } from "react";
import { IRoundProps, ISeedProps } from "react-brackets";

export const handleTeamWin = (winningTeam: RBSeedTeam, roundId: number, matchId: number,
  rounds: IRoundProps[], setRounds: (value: IRoundProps[]) => void) => {
  const updatedRounds = [...rounds];

  // Find the next match for the winning team
  const nextMatchId = Math.floor(matchId / 2);
  const nextTeamSlot = matchId % 2 === 0 ? 'team1' : 'team2'; 

  if (!updatedRounds[roundId + 1]) {
    console.error('Next round does not exist');
    return;
  }

  // Update the next match with the winning team
  if (!updatedRounds[roundId + 1].seeds[nextMatchId]) {
    updatedRounds[roundId + 1].seeds[nextMatchId] = { id: nextMatchId, teams: [] };
  }
  const teamIndex = nextTeamSlot === 'team1' ? 0 : 1;
  updatedRounds[roundId + 1].seeds[nextMatchId].teams[teamIndex] = winningTeam;

  setRounds(updatedRounds);
};
