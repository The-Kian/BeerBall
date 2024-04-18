import { RBSeedTeam } from "@/app/types";
import { IRoundProps } from "react-brackets";
import { handleTeamWin } from "./handleTeamWin";
import { handleTeamLoss } from "./handleTeamLoss";

export const handleMatchResult = (
    winningTeam: RBSeedTeam,
    losingTeam: RBSeedTeam,
    roundId: number,
    matchId: number,
    rounds: IRoundProps[], // Winners bracket rounds
    lowerRounds: IRoundProps[], // Losers bracket rounds
    setRounds: (value: IRoundProps[]) => void,
    setLowerRounds: (value: IRoundProps[]) => void
) => {
    // Handle winners bracket updates, as you already have done
    const updatedRounds = [...rounds];
    // ... existing logic for updating winners bracket

    handleTeamWin(winningTeam, roundId, matchId, updatedRounds, setRounds);
    handleTeamLoss(losingTeam, roundId, matchId, lowerRounds, setLowerRounds);
};
