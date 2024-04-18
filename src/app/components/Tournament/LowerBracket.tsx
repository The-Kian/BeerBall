import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { IRenderSeedProps, Seed, SeedItem, SeedTeam, Bracket, IRoundProps } from "react-brackets";
interface LowerBracketProps {
    rounds: IRoundProps[];
    setRounds: (rounds: IRoundProps[]) => void;
}

const LowerBracket = ({ rounds, setRounds }: LowerBracketProps) => {
    const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
        return (
            <Seed mobileBreakpoint={breakpoint} className="text-sm">
                <SeedItem>
                    <div>
                        <div className="flex justify-between items-center my-1">
                            {seed.id}
                            <SeedTeam className="flex-grow">{seed.teams[0]?.name || 'NO TEAM'}</SeedTeam>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleTeamWin(seed.teams[0], roundIndex, seedIndex, rounds, setRounds)}>
                                Win
                            </button>
                        </div>
                        <div className="flex justify-between items-center my-1">
                        {seed.id}

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
    }

    return (
        <div>
            <Bracket rounds={rounds} renderSeedComponent={CustomSeed}></Bracket>
        </div>
    );
};
export default LowerBracket;