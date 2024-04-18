import { Team } from "@/app/types";
import { IRoundProps, ISeedProps } from "react-brackets";

interface ITournamentData {
    upperRounds: IRoundProps[];
    lowerRounds: IRoundProps[];
}

const createInitialMatches = (teams: Team[]): ITournamentData => {
    const numTeams = teams.length;
    let matchId = 0;
    const upperBracketRounds: IRoundProps[] = [];
    const lowerBracketRounds: IRoundProps[] = [];

    const numberOfRounds = Math.log2(numTeams);

    for (let round = 0; round < numberOfRounds; round++) {
        const numberOfMatches = numTeams / Math.pow(2, round + 1);
        const upperRoundMatches = [];

        for (let i = 0; i < numberOfMatches; i++) {
            upperRoundMatches.push({
                id: matchId++,
                teams: round === 0 ? [teams[2 * i], teams[2 * i + 1]] : [{}, {}],
            });
        }
        upperBracketRounds.push({
            title: `Upper Bracket Round ${round + 1}`,
            seeds: upperRoundMatches,
            id: round,
            teams: [],
        });
    }
    const numberOfLowerRounds = numberOfRounds - 1;

    // Initialize Lower Bracket Rounds
    for (let round = 0; round < numberOfLowerRounds; round++) {
        let numberOfMatches;
        if (round === 1) { // Specifically adjusting for round 2 of the lower bracket
            // Assuming 2 losers from the upper bracket round 2 go to lower bracket round 2
            // This might need adjustment based on the total number of teams and the tournament structure
            numberOfMatches = (numTeams / Math.pow(2, round + 2)) + 1; // Add extra match for the 2 losers
        } else {
            numberOfMatches = numTeams / Math.pow(2, round + 2); // Fewer matches per round in the lower bracket
        }
        const lowerRoundMatches = [];
    
        for (let i = 0; i < numberOfMatches; i++) {
            lowerRoundMatches.push({
                id: matchId++,
                teams: [{}, {}],
            });
        }
        lowerBracketRounds.push({
            title: `Lower Bracket Round ${round + 1}`,
            seeds: lowerRoundMatches,
            id: round,
            teams: [],
        });
    }
    
    return {
        upperRounds: upperBracketRounds,
        lowerRounds: lowerBracketRounds,
    };
};

export default createInitialMatches;
