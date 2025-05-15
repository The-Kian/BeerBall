import { IRenderSeedProps, Seed, Bracket, IRoundProps } from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import Match from "./Match";
import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";

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
  setFinalRounds
}: LowerBracketProps) => {

  const winHandler = (team: any, extendedSeed: IExtendedSeedProps) => {
    handleTeamWin({
      winningTeam: team,
      seed: extendedSeed,
      upperRounds: rounds,
      setUpperRounds: setRounds,
      lowerRounds: rounds,
      setLowerRounds: setRounds,
      finalRounds,
      setFinalRounds,
    });
  };

    const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
      const extendedSeed = seed as IExtendedSeedProps;
      return (
        <Seed mobileBreakpoint={breakpoint} className="text-sm">
          <Match
            extendedSeed={extendedSeed}
            onWin={winHandler}
            showActions={true}
          />
        </Seed>
      );
    };

    return (
      <div>
        <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
      </div>
    );
} 

export default LowerBracket;
