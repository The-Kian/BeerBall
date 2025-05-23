import { IRoundProps } from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import { createSeed, assignOddLowerWinnerFlows, assignEvenLowerWinnerFlows } from "./seedHelpers";

/**
 * Creates lower bracket rounds.
 */
export const createLowerBracket = (
  numTeams: number,
  numberOfRounds: number,
  matchId: { value: number }
): IRoundProps[] => {
  const numLBRounds = 2 * numberOfRounds - 2;
  const lowerBracketRounds: IRoundProps[] = [];

  // Generate lower bracket rounds.
  for (let round = 0; round < numLBRounds; round++) {
    let numberOfMatches: number;
    if (round === 0) {
      numberOfMatches = numTeams / 4;
    } else if (round % 2 === 1) {
      numberOfMatches = numTeams / Math.pow(2, (round + 1) / 2 + 1);
    } else {
      numberOfMatches = Math.floor(lowerBracketRounds[round - 1].seeds.length / 2);
    }

    const lowerRoundMatches: IExtendedSeedProps[] = [];
    for (let i = 0; i < numberOfMatches; i++) {
      lowerRoundMatches.push(createSeed(matchId.value++));
    }

    lowerBracketRounds.push({
      title: `Lower Bracket Round ${round + 1}`,
      seeds: lowerRoundMatches,
      id: round,
      teams: [],
    });
  }

  // Map lower bracket winner flows.
  for (let round = 1; round < numLBRounds; round += 2) {
    // Odd rounds: assign winner flows from the previous lower bracket round.
    assignOddLowerWinnerFlows(lowerBracketRounds[round - 1].seeds as IExtendedSeedProps[], round);

    // Even rounds: pair winners from the previous odd lower bracket round.
    if (round + 1 < numLBRounds) {
      const prevRoundSeeds = lowerBracketRounds[round].seeds as IExtendedSeedProps[];
      const currentRoundMatchCount = lowerBracketRounds[round + 1].seeds.length;
      assignEvenLowerWinnerFlows(prevRoundSeeds, currentRoundMatchCount, round + 1);
    }
  }

  return lowerBracketRounds;
};
