import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { buttonStyle, teamMemberStyle } from "@/app/styles/styles";
import { Team } from "@/app/types";
import shuffleTeams from "@/app/utils/shuffleTeams";
import { useContext } from "react";

const TeamList = () => {
  const { teams, setTeams } = useContext(PlayerTeamContext);



  return (
    <div>
      <h1 className="text-1xl font-bold underline">Team List</h1>
      <ul className="border-2 border-white rounded">
        {teams.map((team, index) => (
          <li key={index}>
            <ul className="text-2xl">{team.name}</ul>
            <ul>
              {team.members.map((member, memberIndex) => (
                <li key={`${index}-${memberIndex}`} className={teamMemberStyle}>
                  {member.playerName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button className={buttonStyle} onClick={() => {
        console.log("Before shuffle:", teams);
        const shuffledTeams = shuffleTeams(teams);
        console.log("After shuffle:", shuffledTeams);
        setTeams(shuffledTeams);
}}>
      Shuffle Teams
    </button>
    </div >
  );
};

export default TeamList;
function useState<T>(arg0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}

