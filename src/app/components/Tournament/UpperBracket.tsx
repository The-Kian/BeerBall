import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { handleTeamLoss } from "@/app/utils/Tournament/handleTeamLoss";
import { useContext } from "react";
import { IRenderSeedProps, Seed, SeedItem, SeedTeam, Bracket, IRoundProps } from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/extendedSeedProps";

interface UpperBracketProps {
  upperRounds: IRoundProps[];
  lowerRounds: IRoundProps[];
  finalRounds: IRoundProps[];
  setUpperRounds: (rounds: IRoundProps[]) => void;
  setLowerRounds: (rounds: IRoundProps[]) => void;
  setFinalRounds: (rounds: IRoundProps[]) => void;
}

const UpperBracket = ({
  upperRounds,
  setUpperRounds,
  lowerRounds,
  setLowerRounds,
  finalRounds,
  setFinalRounds,
}: UpperBracketProps) => {
  const { teams } = useContext(PlayerTeamContext);

  const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
    // Cast seed to our extended type so we have access to the mapping.
    const extendedSeed = seed as IExtendedSeedProps;
    return (
      <Seed mobileBreakpoint={breakpoint} className="text-sm">
        <SeedItem>
          <div>
            {/* First team */}
            <div className="flex justify-between items-center my-1">
              {extendedSeed.id}
              <SeedTeam className="flex-grow">
                {extendedSeed.teams[0]?.name || "NO TEAM"}
              </SeedTeam>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() =>
                  handleTeamWin(
                    extendedSeed.teams[0],
                    extendedSeed,
                    upperRounds,
                    setUpperRounds,
                    lowerRounds,
                    setLowerRounds,
                    finalRounds,
                    setFinalRounds
                  )
                }
              >
                Win
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() =>
                  handleTeamLoss(
                    extendedSeed.teams[0],
                    extendedSeed,
                    lowerRounds,
                    setLowerRounds
                  )
                }
              >
                Lose
              </button>
            </div>
            {/* Second team */}
            <div className="flex justify-between items-center my-1">
              {extendedSeed.id}
              <SeedTeam className="flex-grow">
                {extendedSeed.teams[1]?.name || "NO TEAM"}
              </SeedTeam>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() =>
                  handleTeamWin(
                    extendedSeed.teams[1],
                    extendedSeed,
                    upperRounds,
                    setUpperRounds,
                    lowerRounds,
                    setLowerRounds,
                    finalRounds,
                    setFinalRounds
                  )
                }
              >
                Win
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() =>
                  handleTeamLoss(
                    extendedSeed.teams[1],
                    extendedSeed,
                    lowerRounds,
                    setLowerRounds
                  )
                }
              >
                Lose
              </button>
            </div>
          </div>
        </SeedItem>
      </Seed>
    );
  };

  return (
    <div>
      <Bracket rounds={upperRounds} renderSeedComponent={CustomSeed} />
    </div>
  );
};

export default UpperBracket;
