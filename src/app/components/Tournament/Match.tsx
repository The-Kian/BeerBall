import { IExtendedSeedProps } from "@/app/types/ExtendedSeedProps";
import { SeedItem, SeedTeam } from "react-brackets";

interface MatchProps {
  extendedSeed: IExtendedSeedProps;
  onWin: (team: any, extendedSeed: IExtendedSeedProps) => void;
  onLose?: (team: any, extendedSeed: IExtendedSeedProps) => void;
  showActions?: boolean;
}

const Match = ({
  extendedSeed,
  onWin,
  onLose,
  showActions = true,
}: MatchProps) => {
  const winLoseButtonStyle =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded";
  return (
    <SeedItem>
      <div>
        {/* First team */}
        <div className="flex justify-between items-center my-1">
          {extendedSeed.id}
          <SeedTeam className="flex-grow">
            {extendedSeed.teams[0]?.name || "NO TEAM"}
          </SeedTeam>
          {showActions && (
            <button
              className={winLoseButtonStyle}
              onClick={() => onWin(extendedSeed.teams[0], extendedSeed)}
            >
              Win
            </button>
          )}
          {showActions && onLose && (
            <button
              className={winLoseButtonStyle}
              onClick={() => onLose(extendedSeed.teams[1], extendedSeed)}
            >
              Lose
            </button>
          )}
        </div>
        {/* Second team */}
        <div className="flex justify-between items-center my-1">
          {extendedSeed.id}
          <SeedTeam className="flex-grow">
            {extendedSeed.teams[1]?.name || "NO TEAM"}
          </SeedTeam>
          <button
            className={winLoseButtonStyle}
            onClick={() => onWin(extendedSeed.teams[1], extendedSeed)}
          >
            Win
          </button>
          {showActions && onLose && (
            <button
              className={winLoseButtonStyle}
              onClick={() => onLose(extendedSeed.teams[1], extendedSeed)}
            >
              Lose
            </button>
          )}
        </div>
      </div>
    </SeedItem>
  );
};

export default Match;
