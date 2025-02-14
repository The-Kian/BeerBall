import { IRoundProps } from "react-brackets";
import { RBSeedTeam } from "@/app/types";
import { IExtendedSeedProps } from "@/app/types/extendedSeedProps";


export const handleTeamLoss = (
  losingTeam: RBSeedTeam,
  seed: IExtendedSeedProps,
  lowerRounds: IRoundProps[],
  setLowerRounds: (rounds: IRoundProps[]) => void
) => {
  if (!seed.loserGoesTo) {
    console.log("No loser mapping available (this match might not send losers anywhere).");
    return;
  }
  const { roundId, matchId, slotIndex } = seed.loserGoesTo;
  const updatedLower = [...lowerRounds];
  if (!updatedLower[roundId] || !updatedLower[roundId].seeds[matchId]) {
    console.error("Invalid mapping for lower bracket:", seed);
    return;
  }
  const targetSeed = { ...updatedLower[roundId].seeds[matchId] } as IExtendedSeedProps;
  targetSeed.teams[slotIndex] = losingTeam;
  updatedLower[roundId].seeds[matchId] = targetSeed;
  setLowerRounds(updatedLower);
};
