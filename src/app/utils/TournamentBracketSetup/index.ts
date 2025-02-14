import { Team, RBSeedTeam } from "@/app/types";
import { IRoundProps } from "react-brackets";
import {
  IExtendedSeedProps,
  IFlowPosition,
} from "@/app/types/extendedSeedProps";

interface ITournamentData {
  upperRounds: IRoundProps[];
  lowerRounds: IRoundProps[];
  finalRounds: IRoundProps[];
}

const createInitialMatches = (teams: Team[]): ITournamentData => {
  const numTeams = teams.length;
  // Ensure team count is a power of 2 (i.e. no byes)
  if ((numTeams & (numTeams - 1)) !== 0) {
    throw new Error("Team count must be a power of 2 (and no byes).");
  }

  let matchId = 0;
  const upperBracketRounds: IRoundProps[] = [];
  const lowerBracketRounds: IRoundProps[] = [];

  // r = number of rounds in the winners bracket.
  const numberOfRounds = Math.log2(numTeams);

  // ─── Generate Winners Bracket (Upper) ─────────────────────────────
  for (let round = 0; round < numberOfRounds; round++) {
    const numberOfMatches = numTeams / Math.pow(2, round + 1);
    const upperRoundMatches: IExtendedSeedProps[] = [];
    for (let i = 0; i < numberOfMatches; i++) {
      const seed: IExtendedSeedProps = {
        id: matchId++,
        teams:
          round === 0
            ? [teams[2 * i], teams[2 * i + 1]]
            : [{ name: "" }, { name: "" }],
        winnerGoesTo: null,
        loserGoesTo: null,
      };

      // Set winner flow:
      if (round < numberOfRounds - 1) {
        // In earlier rounds, winner advances within the winners bracket.
        seed.winnerGoesTo = {
          roundId: round + 1,
          matchId: Math.floor(i / 2),
          slotIndex: (i % 2) as 0 | 1,
          bracket: "upper",
        };
      } else {
        // In the final winners round, the winner goes to the Finals (slot 0).
        seed.winnerGoesTo = {
          roundId: 0,
          matchId: 0,
          slotIndex: 0,
          bracket: "final",
        };
      }

      // Set loser flow:
      if (round === 0) {
        // For round 0, map the loser into lower bracket round 0.
        seed.loserGoesTo = {
          roundId: 0,
          matchId: i % 2 === 0 ? Math.floor(i / 2) : Math.floor((i - 1) / 2),
          slotIndex: i % 2 === 0 ? 0 : 1,
          bracket: "lower",
        };
      } else {
        // For later rounds, send the loser to lower bracket round (2*round - 1).
        seed.loserGoesTo = {
          roundId: 2 * round - 1,
          matchId: i,
          slotIndex: 1,
          bracket: "lower",
        };
      }

      upperRoundMatches.push(seed);
    }
    upperBracketRounds.push({
      title: `Upper Bracket Round ${round + 1}`,
      seeds: upperRoundMatches,
      id: round,
      teams: [],
    });
  }

  // ─── Generate Lower Bracket (Losers) ─────────────────────────────
  // We use 2r - 1 rounds in the losers bracket.
  const numLBRounds = 2 * numberOfRounds - 2;
  for (let round = 0; round < numLBRounds; round++) {
    let numberOfMatches: number;
    if (round === 0) {
      // LB Round 0 gets losers from WB Round 0.
      numberOfMatches = numTeams / 4;
    } else if (round % 2 === 1) {
      // Odd rounds: these receive WB losers (and/or LB winners from the previous even round).
      numberOfMatches = numTeams / Math.pow(2, (round + 1) / 2 + 1);
    } else {
      // Even rounds (starting with round 2): pairing winners from the previous odd LB round.
      numberOfMatches = Math.floor(
        lowerBracketRounds[round - 1].seeds.length / 2
      );
    }
    const lowerRoundMatches: IExtendedSeedProps[] = [];
    for (let i = 0; i < numberOfMatches; i++) {
      const seed: IExtendedSeedProps = {
        id: matchId++,
        teams: [{ name: "" }, { name: "" }],
        winnerGoesTo: null,
        loserGoesTo: null,
      };
      lowerRoundMatches.push(seed);
    }
    lowerBracketRounds.push({
      title: `Lower Bracket Round ${round + 1}`,
      seeds: lowerRoundMatches,
      id: round,
      teams: [],
    });
  }

  // ─── Set Lower Bracket Flows ─────────────────────────────
  // For odd LB rounds: assign winner flows from the previous LB round.
  for (let round = 1; round < numLBRounds; round += 2) {
    (lowerBracketRounds[round - 1].seeds as IExtendedSeedProps[]).forEach(
      (seed, idx) => {
        seed.winnerGoesTo = {
          roundId: round,
          matchId: idx,
          slotIndex: 0,
          bracket: "lower",
        };
      }
    );
    // (WB losers already fill in slot 1 of the odd LB rounds.)
  }
  // For even LB rounds (from round 2 onward): pair winners from the previous LB round.
  for (let round = 2; round < numLBRounds; round += 2) {
    const prevRound = lowerBracketRounds[round - 1]
      .seeds as IExtendedSeedProps[];
    const currentRound = lowerBracketRounds[round]
      .seeds as IExtendedSeedProps[];
    for (let i = 0; i < currentRound.length; i++) {
      prevRound[2 * i].winnerGoesTo = {
        roundId: round,
        matchId: i,
        slotIndex: 0,
        bracket: "lower",
      };
      prevRound[2 * i + 1].winnerGoesTo = {
        roundId: round,
        matchId: i,
        slotIndex: 1,
        bracket: "lower",
      };
    }
  }

  // ─── Generate Finals ─────────────────────────────
  const finalRounds = [
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
  // The winner of the WB final (last round of upper bracket) goes to Finals slot 0.
  (
    upperBracketRounds[numberOfRounds - 1].seeds[0] as IExtendedSeedProps
  ).winnerGoesTo = {
    bracket: "final",
    roundId: 0,
    matchId: 0,
    slotIndex: 0,
  };
  // The winner of the LB final (last LB round) goes to Finals slot 1.
  (
    lowerBracketRounds[numLBRounds - 1].seeds[0] as IExtendedSeedProps
  ).winnerGoesTo = {
    bracket: "final",
    roundId: 0,
    matchId: 0,
    slotIndex: 1,
  };

  return {
    upperRounds: upperBracketRounds,
    lowerRounds: lowerBracketRounds,
    finalRounds,
  };
};

export default createInitialMatches;
