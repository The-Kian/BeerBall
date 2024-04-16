import { Team } from "@/app/types";
import { IRoundProps } from "react-brackets";

interface ITournamentData {
    rounds: IRoundProps[];
}

const createInitialMatches = (teams: Team[]): ITournamentData => {
    const matches = [];
    for (let i = 0; i < teams.length / 2; i++) {
        matches.push({
            id: i,
            teams: [teams[i], teams[teams.length - 1 - i]],
        });
    }

    return {
        rounds: [
            {
                title: "Round 1",
                seeds: matches,
            },
        ],
    };
};


export default createInitialMatches;