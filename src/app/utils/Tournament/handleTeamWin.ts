import { TournamentContext } from "@/app/context/TournamentContext";
import { RBSeedTeam, Team } from "@/app/types";
import { useContext } from "react";
import { IRoundProps, ISeedProps } from "react-brackets";

export const handleTeamWin = (winningTeam: RBSeedTeam, roundId: number, matchId: number,
  isLowerBracket: boolean,
  rounds: IRoundProps[], setRounds: (value: IRoundProps[]) => void) => {
  const updatedRounds = [...rounds];

  let nextMatchId;
  let teamIndex;

  // Find the next match for the winning team
  if (isLowerBracket && roundId === 0) {
    nextMatchId = Math.ceil(matchId / 2);
    teamIndex = matchId % 2
  } else {
    nextMatchId = Math.floor(matchId / 2);
    const nextTeamSlot = matchId % 2 === 0 ? 'team1' : 'team2'; 
    teamIndex = nextTeamSlot === 'team1' ? 0 : 1;
  }
  

  if (!updatedRounds[roundId + 1]) {
    console.error('Next round does not exist');
    return;
  }

  // Update the next match with the winning team
  if (!updatedRounds[roundId + 1].seeds[nextMatchId]) {
    updatedRounds[roundId + 1].seeds[nextMatchId] = { id: nextMatchId, teams: [] };
  }
  updatedRounds[roundId + 1].seeds[nextMatchId].teams[teamIndex] = winningTeam;
  console.log('🚀 handleTeamWin ~ Seed found  for nextMatchId:', nextMatchId, 'from lowerMatchID', matchId, 'in round: ', roundId);


  setRounds(updatedRounds);
};
