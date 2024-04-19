import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { TournamentContext } from "@/app/context/TournamentContext";
import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { useContext, useEffect } from "react";
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam } from "react-brackets";
import UpperBracket from "./UpperBracket";
import LowerBracket from "./LowerBracket";
import FinalsBracket from "./FinalsBracket";

const Tournament = () => {
  const { teams } = useContext(PlayerTeamContext)
  const { upperRounds, setUpperRounds, lowerRounds, setLowerRounds, finalRounds, setFinalRounds } = useContext(TournamentContext)
  // console.log("🚀 ~ Tournament ~ lowerRounds:", lowerRounds)
  // console.log("🚀 ~ Tournament ~ upperRounds:", upperRounds)

  return (
    <div>
      <UpperBracket upperRounds={upperRounds} setUpperRounds={setUpperRounds}
        lowerRounds={lowerRounds} setLowerRounds={setLowerRounds} 
        finalRounds={finalRounds} setFinalRounds={setFinalRounds}></UpperBracket>
      <LowerBracket rounds={lowerRounds} setRounds={setLowerRounds} finalRounds={finalRounds} setFinalRounds={setFinalRounds} ></LowerBracket>
      <FinalsBracket rounds={finalRounds} setRounds={setFinalRounds} />
    </div>
  );
};

export default Tournament;