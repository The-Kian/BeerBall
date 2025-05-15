import { RBSeedTeam } from "@/app/types";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import { IRoundProps } from "react-brackets";

  const updateRound = (
    rounds: IRoundProps[],
    roundId: number,
    matchId: number,
    slotIndex: number,
    winningTeam: RBSeedTeam
  ): IRoundProps[] | null => {
    const updatedRounds = [...rounds];
    if (!updatedRounds[roundId] || !updatedRounds[roundId].seeds[matchId]) {
      console.error(
        `Invalid mapping for bracket at round ${roundId} and match ${matchId}`
      );
      return null;
    }
    const targetSeed = { ...updatedRounds[roundId].seeds[matchId] } as IExtendedSeedProps;
    targetSeed.teams[slotIndex] = winningTeam;
    updatedRounds[roundId].seeds[matchId] = targetSeed;
    return updatedRounds;
  };
  
  export default updateRound;