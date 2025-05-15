import { IRenderSeedProps, Bracket, IRoundProps } from "react-brackets";
import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import Match from "./Match";

interface FinalsBracketProps {
  rounds: IRoundProps[];
  setRounds: (rounds: IRoundProps[]) => void;
}

const FinalsBracket = ({ rounds }: FinalsBracketProps) => {
  const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
    const extendedSeed = seed as IExtendedSeedProps;
    return <Match extendedSeed={extendedSeed} showActions={false} onWin={()=>console.log('win')}/>;
  };

  return (
    <div>
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
    </div>
  );
};

export default FinalsBracket;
