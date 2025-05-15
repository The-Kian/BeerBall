import { Team } from "@/app/types";
import { IRoundProps } from "react-brackets";
import { createUpperBracket, UpperBracketResult } from "./createUpperBracket";
import { createLowerBracket } from "./createLowerBracket";
import { createFinals } from "./createFinals";

export interface ITournamentData {
  upperRounds: IRoundProps[];
  lowerRounds: IRoundProps[];
  finalRounds: IRoundProps[];
}

/**
 * Creates the initial tournament matches for the given teams.
 *
 * @param teams - Array of teams (must be a power of 2).
 * @returns An object containing the upper, lower, and finals rounds.
 */
const createInitialMatches = (teams: Team[]): ITournamentData => {
  const numTeams = teams.length;

  // Validate team count.
  if ((numTeams & (numTeams - 1)) !== 0) {
    throw new Error("Team count must be a power of 2 (and no byes).");
  }

  // Shared mutable match ID counter.
  const matchId = { value: 0 };

  // Create upper bracket.
  const { rounds: upperRounds, numberOfRounds }: UpperBracketResult = createUpperBracket(teams, matchId);

  // Create lower bracket.
  const lowerRounds = createLowerBracket(numTeams, numberOfRounds, matchId);
  const numLBRounds = 2 * numberOfRounds - 2;

  // Create finals and map final flows.
  const finalRounds = createFinals(upperRounds, lowerRounds, numberOfRounds, numLBRounds);

  return {
    upperRounds,
    lowerRounds,
    finalRounds,
  };
};

export default createInitialMatches;
