"use client";

import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import createInitialMatches from "@/app/utils/TournamentBracketSetup";
import { useContext, useEffect, useState } from "react";
import { Bracket, IRoundProps } from "react-brackets";

const Tournament = () => {
    const { teams } = useContext(PlayerTeamContext)
    const initialRound = createInitialMatches(teams);
    const [rounds, setRounds] = useState<IRoundProps[]>([]);
    console.log("🚀 ~ Tournament ~ initialRound:", initialRound)

    useEffect(() => {
        setRounds(initialRound.rounds);
    }, []);

    return (
        <div>
            <Bracket rounds={rounds}></Bracket>
        </div>
    );
};

export default Tournament;