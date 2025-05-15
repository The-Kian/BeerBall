import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { handleTeamLoss } from "@/app/utils/Tournament/handleTeamLoss";
import {
  IRenderSeedProps,
  Seed,
  Bracket,
  IRoundProps,
} from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import Match from "./Match";

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

  const winHandler = (team: any, extendedSeed: IExtendedSeedProps) => 
    handleTeamWin({
      winningTeam: team,
      seed: extendedSeed,
      upperRounds: upperRounds,
      setUpperRounds: setUpperRounds,
      lowerRounds: lowerRounds,
      setLowerRounds: setLowerRounds,
      finalRounds,
      setFinalRounds,
    })

  const loseHandler = (team: any, extendedSeed: IExtendedSeedProps) => {
    handleTeamLoss(team, extendedSeed, lowerRounds, setLowerRounds);
  };

  const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
    // Cast seed to our extended type so we have access to the mapping.
    const extendedSeed = seed as IExtendedSeedProps;
    return (
      <Seed mobileBreakpoint={breakpoint} className="text-sm">
          <Match
            extendedSeed={extendedSeed}
            onWin={winHandler}
            onLose={loseHandler}
            showActions={true}
          />
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
