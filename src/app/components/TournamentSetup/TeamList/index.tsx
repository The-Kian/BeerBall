import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { teamMemberStyle } from "@/app/styles/styles";
import { useContext } from "react";

const TeamList = () => {
  const { teams } = useContext(PlayerTeamContext);

  return (
    <div>
      <h1 className="text-1xl font-bold underline">Team List</h1>
      <ul className="border-2 border-white rounded">
        {teams.map((team, index) => (
          <li key={index}>
            <ul className="text-2xl">{team.name}</ul>
            <ul>
              {team.members.map((member, index) => (
                <li key={index} className={teamMemberStyle}>
                  {member.playerName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
