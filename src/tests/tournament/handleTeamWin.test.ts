import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { handleTeamLoss } from "@/app/utils/Tournament/handleTeamLoss";

// For these tests we simulate a minimal updateRound behavior so that our tests focus on handler logic.
jest.mock("@/app/utils/Tournament/updateRound", () => {
    return (rounds: any[], roundId: number, matchId: number, slotIndex: number, team: any) => {
        const updatedRounds = [...rounds];
        const updatedRound = { ...updatedRounds[roundId] };
        updatedRound.seeds = [...updatedRound.seeds];
        const seedCopy = { ...updatedRound.seeds[matchId] };
        seedCopy.teams = [...seedCopy.teams];
        seedCopy.teams[slotIndex] = team;
        updatedRound.seeds[matchId] = seedCopy;
        updatedRounds[roundId] = updatedRound;
        return updatedRounds;
    };
});

describe("handleTeamWin", () => {
  const winningTeam = { name: "Team A" };

  it("updates the upper bracket when winner mapping is 'upper'", () => {
    const seed = {
      id: 0,
      teams: [{ name: "Team A" }, { name: "Team B" }],
      winnerGoesTo: { bracket: "upper" as "upper", roundId: 0, matchId: 0, slotIndex: 0 as 0 | 1 },
      loserGoesTo: null,
    };
    const upperRounds = [
      {
        title: "Upper Round 1",
        seeds: [{ ...seed }],
      },
    ];
    const lowerRounds: any[] = [];
    const finalRounds: any[] = [];

    const setUpperRounds = jest.fn();
    const setLowerRounds = jest.fn();
    const setFinalRounds = jest.fn();

    handleTeamWin({
      winningTeam,
      seed,
      upperRounds,
      setUpperRounds,
      lowerRounds,
      setLowerRounds,
      finalRounds,
      setFinalRounds,
    });
    expect(setUpperRounds).toHaveBeenCalled();
    const updatedRounds = setUpperRounds.mock.calls[0][0];
    // Verify that the designated slot now holds the winning team
    expect(updatedRounds[0].seeds[0].teams[0]).toEqual(winningTeam);
  });

  it("updates the lower bracket when winner mapping is 'lower'", () => {
    const seed = {
      id: 0,
      teams: [{ name: "Team X" }, { name: "Team Y" }],
      winnerGoesTo: { bracket: "lower" as "lower", roundId: 0, matchId: 0, slotIndex: 1 as 0 | 1 },
      loserGoesTo: null,
    };
    const lowerRounds = [
      {
        title: "Lower Round 1",
        seeds: [{ ...seed, teams: [{ name: "Team X" }, { name: "" }] }],
      },
    ];
    const upperRounds: any[] = [];
    const finalRounds: any[] = [];

    const setLowerRounds = jest.fn();
    const setUpperRounds = jest.fn();
    const setFinalRounds = jest.fn();

    handleTeamWin({
      winningTeam,
      seed,
      upperRounds,
      setUpperRounds,
      lowerRounds,
      setLowerRounds,
      finalRounds,
      setFinalRounds,
    });
    expect(setLowerRounds).toHaveBeenCalled();
    const updatedRounds = setLowerRounds.mock.calls[0][0];
    expect(updatedRounds[0].seeds[0].teams[1]).toEqual(winningTeam);
  });

  it("updates the finals bracket when winner mapping is 'final'", () => {
    const seed = {
      id: 0,
      teams: [{ name: "Team M" }, { name: "Team N" }],
      winnerGoesTo: { bracket: "final" as "final", roundId: 0, matchId: 0, slotIndex: 1 as 0 | 1 },
      loserGoesTo: null,
    };
    const finalRounds = [
      {
        title: "Final Round",
        seeds: [{ ...seed, teams: [{ name: "Team M" }, { name: "" }] }],
      },
    ];
    const upperRounds: any[] = [];
    const lowerRounds: any[] = [];

    const setFinalRounds = jest.fn();
    const setUpperRounds = jest.fn();
    const setLowerRounds = jest.fn();

    handleTeamWin({
      winningTeam,
      seed,
      upperRounds,
      setUpperRounds,
      lowerRounds,
      setLowerRounds,
      finalRounds,
      setFinalRounds,
    });
    expect(setFinalRounds).toHaveBeenCalled();
    const updatedRounds = setFinalRounds.mock.calls[0][0];
    expect(updatedRounds[0].seeds[0].teams[1]).toEqual(winningTeam);
  });
});

