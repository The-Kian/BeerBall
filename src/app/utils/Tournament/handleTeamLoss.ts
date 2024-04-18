import { RBSeedTeam } from "@/app/types";
import { IRoundProps } from "react-brackets";

export const handleTeamLoss = (
    losingTeam: RBSeedTeam,
    upperRoundId: number,
    upperMatchId: number,
    lowerRounds: IRoundProps[], 
    setLowerRounds: (value: IRoundProps[]) => void
) => {
    const updatedLowerRounds = [...lowerRounds];

    const lowerRoundId = calculateLowerRoundId(upperRoundId);
    const lowerMatchId = calculateLowerMatchId(upperRoundId, upperMatchId, 8);

    if (!updatedLowerRounds[lowerRoundId]) {
        updatedLowerRounds[lowerRoundId] = { seeds: [], title: `Lower Bracket Round ${lowerRoundId}`, id: lowerRoundId };
    }

    const matchIndex = updatedLowerRounds[lowerRoundId].seeds.findIndex(seed => seed && seed.id === lowerMatchId);

    let match;
    if (matchIndex !== -1) {
        match = updatedLowerRounds[lowerRoundId].seeds[matchIndex];
    } else {
        match = { id: lowerMatchId, teams: [null, null] };
    }
    
    console.log("🚀 ~ match.teams[0]:", match.teams[0]?.name)
    const slotIndex = match.teams[0]?.name === undefined ? 0 : 1;
    match.teams[slotIndex] = losingTeam;

    if (matchIndex !== -1) {
        updatedLowerRounds[lowerRoundId].seeds[matchIndex] = match;
    } else {  
        updatedLowerRounds[lowerRoundId].seeds.push(match);
    }

    console.log("🚀 ~ match:", match);

    setLowerRounds(updatedLowerRounds);
};

function calculateLowerRoundId(upperRoundId: number) {
    if (upperRoundId === 0) {
      return 0;
    } else {
      return upperRoundId + 1;
    }
  }
  
  function calculateLowerMatchId(upperRoundId: number, upperMatchId: number, totalTeams: number): number {
    const initialLowerMatchId = 7;


    if (upperRoundId === 0) {
        return initialLowerMatchId + Math.floor(upperMatchId / 2);
    } else {

        const baseMatchIdForRound = initialLowerMatchId + (totalTeams / 4) - 1 + (upperRoundId * 2);


        const matchIdWithinRound = upperMatchId % 2 === 0 ? upperMatchId / 2 : (upperMatchId + 1) / 2;

        return baseMatchIdForRound + matchIdWithinRound;
    }
}