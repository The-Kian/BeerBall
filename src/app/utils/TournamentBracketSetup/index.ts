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

    // Number of rounds in the upper bracket
    const numberOfUpperRounds = Math.log2(numTeams);

    // Number of rounds in the lower bracket (should be equal to numberOfUpperRounds - 1 for powers of 2)
    const numberOfLowerRounds = numberOfUpperRounds - 1;

    // Create matches for the upper bracket
    for (let round = 0; round < numberOfUpperRounds; round++) {
        const numberOfMatches = numTeams / Math.pow(2, round + 1);
        const upperRoundMatches: ISeedProps[] = [];

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

    // Create matches for the lower bracket
    for (let round = 0; round < numberOfLowerRounds * 2; round++) {
        const numberOfMatches = round % 2 === 0
            ? numTeams / Math.pow(2, (round / 2) + 2)
            : numTeams / Math.pow(2, Math.ceil((round + 1) / 2) + 1);

        const lowerRoundMatches: ISeedProps[] = [];

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
                seeds: [{ id: matchId++, teams: [{}, {}] }],
                id: 0,
                teams: [],
            },
        ],
    };
};

export default createInitialMatches;
