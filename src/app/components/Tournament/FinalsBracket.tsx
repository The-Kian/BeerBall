import { handleTeamWin } from "@/app/utils/Tournament/handleTeamWin";
import { IRenderSeedProps, Seed, SeedItem, SeedTeam, Bracket, IRoundProps } from "react-brackets";
interface FinalsBracketProps {
    rounds: IRoundProps[];
    setRounds: (rounds: IRoundProps[]) => void;
}

const FinalsBracket = ({ rounds, setRounds }: FinalsBracketProps) => {
    const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
        const isLowerBracket = false;
        return (
            <Seed mobileBreakpoint={breakpoint} className="text-sm">
                <SeedItem>
                    <div>
                        <div className="flex justify-between items-center my-1">
                            {seed.id}
                            <SeedTeam className="flex-grow">{seed.teams[0]?.name || 'NO TEAM'}</SeedTeam>
                        </div>
                        <div className="flex justify-between items-center my-1">
                        {seed.id}

                            <SeedTeam className="flex-grow">{seed.teams[1]?.name || 'NO TEAM'}</SeedTeam>
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
export default FinalsBracket;