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
    const lowerMatchId = calculateLowerMatchId({upperRoundId, upperMatchId});

    const lowerRound = updatedLowerRounds[lowerRoundId];
    let targetSeedIndex = lowerRound.seeds.findIndex(seed => seed.id === lowerMatchId);

    if (targetSeedIndex !== -1) {
        // Seed exists, update the team in the next available slot
        const slotIndex = lowerRound.seeds[targetSeedIndex].teams[0].name ? 1 : 0;
        console.log("🚀 handleTeamLoss ~ slotIndex:", slotIndex)
        
        lowerRound.seeds[targetSeedIndex].teams[slotIndex] = losingTeam;
        console.log('🚀 handleTeamLoss ~ Seed found  for lowerMatchId:', lowerMatchId, 'from upperMatchID', upperMatchId, 'in round: ', upperRoundId);
        
    } else {
        // Handle the case where the seed does not exist
        console.log('🚀 handleTeamLoss ~  Seed not found for lowerMatchId:', lowerMatchId, 'from upperMatchID', upperMatchId, 'in round: ', upperRoundId);
    }

    setLowerRounds(updatedLowerRounds);
};

const calculateLowerRoundId = (upperRoundId: number) => {
    if (upperRoundId === 2) {
        return 3;
    }
    return upperRoundId;
}

const calculateLowerMatchId = ({upperRoundId, upperMatchId, totalLowerMatches}:any) => {

    let baseID = upperMatchId;
    switch (upperRoundId) {
        case 0:
            console.log("🚀 ~ calculateLowerMatchId ~ case 0:")
            baseID = 15//n-1
            break;
        case 1:
            console.log("🚀 ~ calculateLowerMatchId ~ case 1:")
            baseID = 9 // n-1 + n/4
            break;
        case 2:
            console.log(`🚀 ~ calculateLowerMatchId ~ case: ${upperRoundId}`)
            baseID = 12
            break;
    }
    return baseID + (upperMatchId % 2);
};