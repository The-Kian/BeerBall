import { IRoundProps } from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";

/**
 * Creates the finals round and maps winner flows from the upper and lower brackets.
 *
 * @param upperRounds - The upper bracket rounds.
 * @param lowerRounds - The lower bracket rounds.
 * @param numberOfRounds - Number of rounds in the upper bracket.
 * @param numLBRounds - Number of rounds in the lower bracket.
 * @returns The finals round.
 */
export const createFinals = (
  upperRounds: IRoundProps[],
  lowerRounds: IRoundProps[],
  numberOfRounds: number,
  numLBRounds: number
): IRoundProps[] => {
  const finals: IRoundProps[] = [
    {
      title: "Finals",
      seeds: [
        {
          id: 0,
          teams: [{ name: "" }, { name: "" }],
          winnerGoesTo: null,
          loserGoesTo: null,
        } as IExtendedSeedProps,
      ],
      id: 0,
      teams: [],
    },
  ];

  // Map finals flows:
  // Upper bracket final winner goes to finals slot 0.
  (upperRounds[numberOfRounds - 1].seeds[0] as IExtendedSeedProps).winnerGoesTo = {
    bracket: "final",
    roundId: 0,
    matchId: 0,
    slotIndex: 0,
  };
  // Lower bracket final winner goes to finals slot 1.
  (lowerRounds[numLBRounds - 1].seeds[0] as IExtendedSeedProps).winnerGoesTo = {
    bracket: "final",
    roundId: 0,
    matchId: 0,
    slotIndex: 1,
  };

  return finals;
};
