import { TournamentContext } from "@/app/context/TournamentContext";
import { useContext } from "react";
import UpperBracket from "./UpperBracket";
import LowerBracket from "./LowerBracket";
import FinalsBracket from "./FinalsBracket";

const Tournament = () => {
  const {
    upperRounds,
    setUpperRounds,
    lowerRounds,
    setLowerRounds,
    finalRounds,
    setFinalRounds,
  } = useContext(TournamentContext);

  return (
    <div>
      <UpperBracket
        upperRounds={upperRounds}
        setUpperRounds={setUpperRounds}
        lowerRounds={lowerRounds}
        setLowerRounds={setLowerRounds}
        finalRounds={finalRounds}
        setFinalRounds={setFinalRounds}/>
      <LowerBracket
        rounds={lowerRounds}
        setRounds={setLowerRounds}
        finalRounds={finalRounds}
        setFinalRounds={setFinalRounds}
      />
      <FinalsBracket rounds={finalRounds} setRounds={setFinalRounds} />
    </div>
  );
};

export default Tournament;
