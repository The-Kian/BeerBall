import { Team } from "@/app/types";
import { IRoundProps, ISeedProps } from "react-brackets";

interface ITournamentData {
    rounds: IRoundProps[];
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

    const lowerRoundMatches = [];
    for (let i = 0; i < numTeams / 2; i++) {
        lowerRoundMatches.push({
            id: i + numTeams / 2, 
            teams: [{}, {}], 
        });
    }


    return {
        rounds: upperBracketRounds
        ,
    };
};

export default createInitialMatches;
