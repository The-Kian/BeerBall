import { IRoundProps } from "react-brackets";
import { RBSeedTeam } from "@/app/types";
import { IExtendedSeedProps } from "@/app/types/extendedSeedProps";

export const handleTeamWin = (
  winningTeam: RBSeedTeam,
  seed: IExtendedSeedProps,
  upperRounds: IRoundProps[],
  setUpperRounds: (rounds: IRoundProps[]) => void,
  lowerRounds: IRoundProps[],
  setLowerRounds: (rounds: IRoundProps[]) => void,
  finalRounds: IRoundProps[],
  setFinalRounds: (rounds: IRoundProps[]) => void
) => {
  if (!seed.winnerGoesTo) {
    console.log("No winner mapping available (this may be a final match).");
    return;
  }
  const { bracket, roundId, matchId, slotIndex } = seed.winnerGoesTo;

  if (bracket === "final") {
    // Update finals bracket.
    const updatedFinals = [...finalRounds];
    // Assuming finals[0] is our match container.
    const targetSeed = {
      ...updatedFinals[0].seeds[matchId],
    } as IExtendedSeedProps;
    targetSeed.teams[slotIndex] = winningTeam;
    updatedFinals[0].seeds[matchId] = targetSeed;
    setFinalRounds(updatedFinals);
  } else if (bracket === "upper") {
    const updatedUpper = [...upperRounds];
    if (!updatedUpper[roundId] || !updatedUpper[roundId].seeds[matchId]) {
      console.error("Invalid mapping for upper bracket:", seed);
      return;
    }
    const targetSeed = {
      ...updatedUpper[roundId].seeds[matchId],
    } as IExtendedSeedProps;
    targetSeed.teams[slotIndex] = winningTeam;
    updatedUpper[roundId].seeds[matchId] = targetSeed;
    setUpperRounds(updatedUpper);
  }
    else if (bracket === "lower") {
      const updatedLower = [...lowerRounds];
    if (!updatedLower[roundId] || !updatedLower[roundId].seeds[matchId]) {
      console.error("Invalid mapping for lower bracket:", seed);
      return;
    }
    const targetSeed = { ...updatedLower[roundId].seeds[matchId] } as IExtendedSeedProps;
    targetSeed.teams[slotIndex] = winningTeam;
    updatedLower[roundId].seeds[matchId] = targetSeed;
    setLowerRounds(updatedLower);
  } else {
    console.error("Unhandled bracket mapping in win handler:", seed);
  }
};
