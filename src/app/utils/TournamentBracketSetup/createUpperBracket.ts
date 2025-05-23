import { Team } from "@/app/types";
import { IRoundProps } from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import { createSeed, getUpperWinnerFlow, getUpperLoserFlow } from "./seedHelpers";

export interface UpperBracketResult {
  rounds: IRoundProps[];
  numberOfRounds: number;
}

export const createUpperBracket = (
  teams: Team[],
  matchId: { value: number }
): UpperBracketResult => {
  const numTeams = teams.length;
  const numberOfRounds = Math.log2(numTeams);
  const upperBracketRounds: IRoundProps[] = [];

  for (let round = 0; round < numberOfRounds; round++) {
    const numberOfMatches = numTeams / Math.pow(2, round + 1);
    const upperRoundMatches: IExtendedSeedProps[] = [];

    for (let i = 0; i < numberOfMatches; i++) {
      const seed = createSeed(
        matchId.value++,
        round === 0 ? [teams[2 * i], teams[2 * i + 1]] : undefined
      );

      // Set winner flow for this seed.
      seed.winnerGoesTo = getUpperWinnerFlow(round, numberOfRounds, i);

      // Set loser flow for this seed.
      seed.loserGoesTo = getUpperLoserFlow(round, i);

      upperRoundMatches.push(seed);
    }

    upperBracketRounds.push({
      title: `Upper Bracket Round ${round + 1}`,
      seeds: upperRoundMatches,
      id: round,
      teams: [],
    });
  }

  return { rounds: upperBracketRounds, numberOfRounds };
};
