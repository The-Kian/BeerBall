import { IRoundProps } from "react-brackets";
import { RBSeedTeam } from "@/app/types";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import updateRound from "./updateRound";

interface IHandleTeamWinProps {
  winningTeam: RBSeedTeam;
  seed: IExtendedSeedProps;
  upperRounds: IRoundProps[];
  setUpperRounds: (rounds: IRoundProps[]) => void;
  lowerRounds: IRoundProps[];
  setLowerRounds: (rounds: IRoundProps[]) => void;
  finalRounds: IRoundProps[];
  setFinalRounds: (rounds: IRoundProps[]) => void;
}

export const handleTeamWin = ({
  winningTeam,
  seed,
  upperRounds,
  setUpperRounds,
  lowerRounds,
  setLowerRounds,
  finalRounds,
  setFinalRounds,
}: IHandleTeamWinProps) => {
  if (!seed.winnerGoesTo) {
    console.log("No winner mapping available (this may be a final match).");
    return;
  }
  const { bracket, roundId, matchId, slotIndex } = seed.winnerGoesTo;

  switch (bracket) {
    case "final": {
      // Update finals bracket.
      const updatedFinals = updateRound(
        finalRounds,
        roundId,
        matchId,
        slotIndex,
        winningTeam
      );
      if (updatedFinals) {
        setFinalRounds(updatedFinals);
      }
      break;
    }
    case "upper": {
      const updatedUpper = updateRound(
        upperRounds,
        roundId,
        matchId,
        slotIndex,
        winningTeam
      );
      if (updatedUpper) {
        setUpperRounds(updatedUpper);
      }
      break;
    }
    case "lower": {
      const updatedLower = updateRound(
        lowerRounds,
        roundId,
        matchId,
        slotIndex,
        winningTeam
      );
      if (updatedLower) {
        setLowerRounds(updatedLower);
      }
      break;
    }
    default: {
      console.error("Unhandled bracket mapping in win handler:", seed);
    }
  }
};
