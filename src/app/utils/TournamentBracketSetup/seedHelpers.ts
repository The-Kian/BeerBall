import { Team } from "@/app/types";
import { IExtendedSeedProps, IFlowPosition } from "@/app/types/ExtendedSeedProps";

/**
 * Creates a new seed with default values.
 *
 * @param id - Unique seed identifier.
 * @param teams - Optional array of teams. If not provided, defaults to empty teams.
 * @returns A new seed object.
 */
export const createSeed = (
  id: number,
  teams?: Team[]
): IExtendedSeedProps => ({
  id,
  teams: teams ?? [{ name: "" }, { name: "" }],
  winnerGoesTo: null,
  loserGoesTo: null,
});

/**
 * Calculates the winner flow for the upper bracket.
 *
 * @param round - The current upper bracket round index.
 * @param numberOfRounds - Total upper bracket rounds.
 * @param matchIndex - Index of the match in the current round.
 * @returns The flow configuration for the winning team.
 */
export const getUpperWinnerFlow = (
  round: number,
  numberOfRounds: number,
  matchIndex: number
): IFlowPosition => {
  if (round < numberOfRounds - 1) {
    return {
      roundId: round + 1,
      matchId: Math.floor(matchIndex / 2),
      slotIndex: (matchIndex % 2) as 0 | 1,
      bracket: "upper",
    };
  }
  return {
    roundId: 0,
    matchId: 0,
    slotIndex: 0,
    bracket: "final",
  };
};

/**
 * Calculates the loser flow for the upper bracket.
 *
 * @param round - The current upper bracket round index.
 * @param matchIndex - Index of the match in the current round.
 * @returns The flow configuration for the losing team.
 */
export const getUpperLoserFlow = (
  round: number,
  matchIndex: number
): IFlowPosition => {
  if (round === 0) {
    return {
      roundId: 0,
      matchId: matchIndex % 2 === 0 ? Math.floor(matchIndex / 2) : Math.floor((matchIndex - 1) / 2),
      slotIndex: matchIndex % 2 === 0 ? 0 : 1,
      bracket: "lower",
    };
  }
  return {
    roundId: 2 * round - 1,
    matchId: matchIndex,
    slotIndex: 1,
    bracket: "lower",
  };
};

/**
 * Assigns winner flows for an odd-numbered lower bracket round.
 *
 * @param seeds - The seeds from the previous lower bracket round.
 * @param targetRound - The target lower bracket round index.
 */
export const assignOddLowerWinnerFlows = (
  seeds: IExtendedSeedProps[],
  targetRound: number
): void => {
  seeds.forEach((seed, idx) => {
    seed.winnerGoesTo = {
      roundId: targetRound,
      matchId: idx,
      slotIndex: 0,
      bracket: "lower",
    };
  });
};

/**
 * Assigns winner flows for an even-numbered lower bracket round.
 *
 * @param prevRoundSeeds - The seeds from the previous odd lower bracket round.
 * @param currentRoundMatchCount - The number of matches in the current lower bracket round.
 * @param targetRound - The target lower bracket round index.
 */
export const assignEvenLowerWinnerFlows = (
  prevRoundSeeds: IExtendedSeedProps[],
  currentRoundMatchCount: number,
  targetRound: number
): void => {
  for (let i = 0; i < currentRoundMatchCount; i++) {
    prevRoundSeeds[2 * i].winnerGoesTo = {
      roundId: targetRound,
      matchId: i,
      slotIndex: 0,
      bracket: "lower",
    };
    prevRoundSeeds[2 * i + 1].winnerGoesTo = {
      roundId: targetRound,
      matchId: i,
      slotIndex: 1,
      bracket: "lower",
    };
  }
};
