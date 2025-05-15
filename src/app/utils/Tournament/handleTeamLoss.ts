import { IRoundProps } from "react-brackets";
import { RBSeedTeam } from "@/app/types";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";

export const handleTeamLoss = (
  losingTeam: RBSeedTeam,
  seed: IExtendedSeedProps,
  lowerRounds: IRoundProps[],
  setLowerRounds: (rounds: IRoundProps[]) => void
) => {
  if (!seed.loserGoesTo) {
    console.log(
      "No loser mapping available (this match might not send losers anywhere)."
    );
    return;
  }
  const {
    roundId: targetRoundId,
    matchId: targetMatchId,
    slotIndex: targetTeamSlot,
  } = seed.loserGoesTo;

  // Create a shallow copy of the lower rounds array.
  const updatedLowerRounds = [...lowerRounds];
  
  if (
    !updatedLowerRounds[targetRoundId] ||
    !updatedLowerRounds[targetRoundId].seeds[targetMatchId]
  ) {
    console.error("Invalid mapping for lower bracket:", seed);
    return;
  }
  const targetSeed = {
    ...updatedLowerRounds[targetRoundId].seeds[targetMatchId],
  } as IExtendedSeedProps;

    // Check if a team is already in the target slot.
    if (targetSeed.teams[targetTeamSlot]?.name) {
      console.warn(
        `Lower bracket slot already occupied at round:${targetRoundId}, match:${targetMatchId}, slot:${targetTeamSlot}.`
      );
      return;
    }
  

  targetSeed.teams[targetTeamSlot] = losingTeam;

  updatedLowerRounds[targetRoundId].seeds[targetMatchId] = targetSeed;
  
  setLowerRounds(updatedLowerRounds);
};
