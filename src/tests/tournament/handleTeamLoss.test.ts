import { handleTeamLoss } from "@/app/utils/Tournament/handleTeamLoss";


describe("handleTeamLoss", () => {
    it("updates the lower bracket for a loss", () => {
      const losingTeam = { name: "Team B" };
      const seed = {
        id: 0,
        teams: [{ name: "Team A" }, { name: "Team B" }],
        loserGoesTo: { roundId: 0, matchId: 0, slotIndex: 1 as 0 | 1 },
        winnerGoesTo: null,
      };
      const lowerRounds = [
        {
          title: "Lower Round 1",
          seeds: [
            {
              id: 0,
              teams: [{ name: "Team C" }, { name: "" }],
            },
          ],
        },
      ];
      const setLowerRounds = jest.fn();
      handleTeamLoss(losingTeam, seed, lowerRounds, setLowerRounds);
      expect(setLowerRounds).toHaveBeenCalled();
      const updatedRounds = setLowerRounds.mock.calls[0][0];
      expect(updatedRounds[0].seeds[0].teams[1]).toEqual(losingTeam);
    });
  
    it("does nothing if no loser mapping is present", () => {
      const losingTeam = { name: "Team B" };
      const seed = {
        id: 0,
        teams: [{ name: "Team A" }, { name: "Team B" }],
        loserGoesTo: null,
        winnerGoesTo: null,
      };
      const lowerRounds = [
        {
          title: "Lower Round 1",
          seeds: [
            {
              id: 0,
              teams: [{ name: "Team C" }, { name: "" }],
            },
          ],
        },
      ];
      const setLowerRounds = jest.fn();
      // When there is no loser mapping, the function returns early.
      handleTeamLoss(losingTeam, seed, lowerRounds, setLowerRounds);
      expect(setLowerRounds).not.toHaveBeenCalled();
    });
  });