import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import {
  IRenderSeedProps,
  Seed,
  SeedItem,
  SeedTeam,
  Bracket,
  IRoundProps,
} from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/extendedSeedProps";

interface LowerBracketProps {
  rounds: IRoundProps[];
  setRounds: (rounds: IRoundProps[]) => void;
  finalRounds: IRoundProps[];
  setFinalRounds: (rounds: IRoundProps[]) => void;
}

const LowerBracket = ({
  rounds,
  setRounds,
  finalRounds,
  setFinalRounds,
}: LowerBracketProps) => {
  const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
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
                    // In lower bracket, we pass the lower bracket rounds for both upper and lower parameters.
                    rounds,
                    setRounds,
                    rounds,
                    setRounds,
                    finalRounds,
                    setFinalRounds
                  )
                }
              >
                Win
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
                    rounds,
                    setRounds,
                    rounds,
                    setRounds,
                    finalRounds,
                    setFinalRounds
                  )
                }
              >
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
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
    </div>
  );
};

export default LowerBracket;
