import { Team } from "@/app/types";
import { IRoundProps, ISeedProps } from "react-brackets";

interface ITournamentData {
    upperRounds: IRoundProps[];
    lowerRounds: IRoundProps[];
    finalRounds: IRoundProps[];
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
    const numberOfLowerRounds = numberOfRounds;

    for (let round = 0; round <= numberOfLowerRounds; round++) {
        let numberOfMatches;
        if (round === 1) { 
            numberOfMatches = (numTeams / Math.pow(2, round + 2)) + 1; 
        } else {
            numberOfMatches = numTeams / Math.pow(2, round + 2); 
        }
        console.log("🚀 ~ createInitialLowerMatches ~ numberOfMatches:", numberOfMatches, "round: ", round)

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
        finalRounds: [
            {
                title: 'Finals',
                seeds: [{ id: 0, teams: [{}, {}] }],
                id: 0,
                teams: [],
            },
        ],
    };
};

export default createInitialMatches;
