import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { TournamentContext } from "@/app/context/TournamentContext";
import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { useContext, useEffect } from "react";
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam } from "react-brackets";
import UpperBracket from "./UpperBracket";
import LowerBracket from "./LowerBracket";

const Tournament = () => {
  const { teams } = useContext(PlayerTeamContext)
  const { upperRounds, setUpperRounds, lowerRounds, setLowerRounds } = useContext(TournamentContext)
  // console.log("🚀 ~ Tournament ~ lowerRounds:", lowerRounds)
  // console.log("🚀 ~ Tournament ~ upperRounds:", upperRounds)
  
  return (
    <div>
      <UpperBracket upperRounds={upperRounds} setUpperRounds={setUpperRounds}
       lowerRounds={lowerRounds} setLowerRounds={setLowerRounds}></UpperBracket>
      <LowerBracket rounds={lowerRounds} setRounds={setLowerRounds}></LowerBracket>
    </div>
  );
};

export default Tournament;