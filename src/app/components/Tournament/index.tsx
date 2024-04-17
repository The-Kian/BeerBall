import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { TournamentContext } from "@/app/context/TournamentContext";
import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { useContext, useEffect } from "react";
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam } from "react-brackets";

const Tournament = () => {
  const { teams } = useContext(PlayerTeamContext)
  const { rounds, setRounds } = useContext(TournamentContext)
  console.log("🚀 ~ Tournament ~ rounds:", rounds)
  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
    return (
      <Seed mobileBreakpoint={breakpoint} className="text-sm">
        <SeedItem>
          <div>
            <div className="flex justify-between items-center my-1">
              <SeedTeam className="flex-grow">{seed.teams[0]?.name || 'NO TEAM'}</SeedTeam>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" 
                      onClick={() => handleTeamWin(seed.teams[0], roundIndex, seedIndex, rounds, setRounds)}>
                Win
              </button>
            </div>
            <div className="flex justify-between items-center my-1">
              <SeedTeam className="flex-grow">{seed.teams[1]?.name || 'NO TEAM'}</SeedTeam>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" 
                      onClick={() => handleTeamWin(seed.teams[1], roundIndex, seedIndex, rounds, setRounds)}>
                Win
              </button>
            </div>
          </div>
        </SeedItem>
      </Seed>
    );
  };

  return (
    <div>
      <Bracket rounds={rounds}  renderSeedComponent={CustomSeed}></Bracket>
    </div>
  );
};

export default Tournament;