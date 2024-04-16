"use client";

import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import createInitialMatches from "@/app/utils/TournamentBracketSetup";
import { useContext } from "react";
import { Bracket, IRoundProps } from "react-brackets";

const Tournament = () => {
    const { teams } = useContext(PlayerTeamContext)
    const initialRound = createInitialMatches(teams);
    console.log("🚀 ~ Tournament ~ initialRound:", initialRound)

        return (
            <div>
            <Bracket rounds={initialRound.rounds}></Bracket>
            </div>
        );
};

export default Tournament;