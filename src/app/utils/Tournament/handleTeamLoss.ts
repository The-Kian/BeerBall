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

    const lowerRoundId = upperRoundId;
    const lowerMatchId = calculateLowerMatchId({upperRoundId, upperMatchId});

    const lowerRound = updatedLowerRounds[lowerRoundId];
    let targetSeedIndex = lowerRound.seeds.findIndex(seed => seed.id === lowerMatchId);

    if (targetSeedIndex !== -1) {
        // Seed exists, update the team in the next available slot
        const slotIndex = lowerRound.seeds[targetSeedIndex].teams[0].name ? 1 : 0;
        console.log("🚀 ~ slotIndex:", slotIndex)
        
        lowerRound.seeds[targetSeedIndex].teams[slotIndex] = losingTeam;
        console.log('🚀 ~ Seed found  for matchId:', lowerMatchId, 'from upperMatchID', upperMatchId, 'in round: ', upperRoundId);
        
    } else {
        // Handle the case where the seed does not exist, if necessary
        console.log('🚀 ~ Seed not found for matchId:', lowerMatchId, 'from upperMatchID', upperMatchId, 'in round: ', upperRoundId);
    }

    setLowerRounds(updatedLowerRounds);
};

  
const calculateLowerMatchId = ({upperRoundId, upperMatchId, totalLowerMatches}:any) => {

    let baseID
    switch (upperRoundId) {
        case 0:
            console.log("🚀 ~ calculateLowerMatchId ~ case 0:")
            baseID = 7
            break;
        case 1:
            console.log("🚀 ~ calculateLowerMatchId ~ case 1:")
            baseID = 9
            break;
        default:
            console.log(`🚀 ~ calculateLowerMatchId ~ case: ${upperRoundId}`)
            baseID = 11
            break;
    }

    return baseID + (upperMatchId % 2);
};