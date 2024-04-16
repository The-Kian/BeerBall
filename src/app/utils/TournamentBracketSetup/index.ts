import { Team } from "@/app/types";
import { IRoundProps } from "react-brackets";

interface ITournamentData {
    rounds: IRoundProps[];
}

const createInitialMatches = (teams: Team[]): ITournamentData => {
    const upperBracketMatches = [];
    const lowerBracketMatches = [];

    for (let i = 0; i < teams.length / 2; i++) {
        upperBracketMatches.push({
            id: i,
            teams: [teams[i], teams[teams.length - 1 - i]],
        });
    }

    // Initially, the lower bracket is empty because no team has lost yet
    for (let i = 0; i < teams.length / 2; i++) {
        lowerBracketMatches.push({
            id: i + teams.length / 2, // To ensure unique IDs
            teams: [{}, {}], // Initialize with empty objects
        });
    }

    return {
        rounds: [
            {
                title: "Upper Bracket Round 1",
                seeds: upperBracketMatches,
            },
            {
                title: "Lower Bracket Round 1",
                seeds: lowerBracketMatches,
            },
        ],
    };
};

export default createInitialMatches;