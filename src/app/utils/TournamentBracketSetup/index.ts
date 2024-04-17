import { TournamentContext } from "@/app/context/TournamentContext";
import { Team } from "@/app/types";
import { useContext } from "react";
import { IRoundProps, ISeedProps } from "react-brackets";

interface ITournamentData {
    rounds: IRoundProps[];
}

export const createInitialMatches = (teams: Team[]): ITournamentData => {
    const numTeams = teams.length;
    let matchId = 0;
    const upperBracketRounds: IRoundProps[] = [];
    const lowerBracketRounds: IRoundProps[] = [];

    const numberOfRounds = Math.log2(numTeams);

    for (let round = 0; round < numberOfRounds; round++) {
        const numberOfMatches = numTeams / Math.pow(2, round + 1);
        const upperRoundMatches = [];

        for (let i = 0; i < numberOfMatches / 2; i++) {
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

    // Initially, the lower bracket is empty because no team has lost yet
    const lowerRoundMatches = [];
    for (let i = 0; i < numTeams / 2; i++) {
        lowerRoundMatches.push({
            id: i + numTeams / 2, // To ensure unique IDs
            teams: [{}, {}], // Initialize with empty objects
        });
    }


    return {
        rounds: [
            ...upperBracketRounds,
            ...lowerBracketRounds,
        ],
    };
};

const handleTeamWin = (winningTeam: Team, roundId: number, matchId: number) => {
    const { rounds, setRounds } = useContext(TournamentContext);
    // Copy the current state of the rounds
    const updatedRounds = [...rounds];
  
    // Find the next match for the winning team
    const nextMatchId = Math.floor(matchId / 2);
    const nextTeamSlot = matchId % 2 === 0 ? 0 : 1;
  
    // Update the next match with the winning team
    updatedRounds[roundId + 1].seeds[nextMatchId].teams[nextTeamSlot] = winningTeam;
  
    // Update the state of the rounds
    setRounds(updatedRounds);
  };