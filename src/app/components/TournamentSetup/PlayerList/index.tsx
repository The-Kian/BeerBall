import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { buttonStyle } from "@/app/styles/styles";
import { Player } from "@/app/types";
import allocateTeams from "@/app/utils/TeamSetup/allocateTeams";
import React, { useContext } from "react";


const PlayerList = () => {

  const { players, addTeam } = useContext(PlayerTeamContext);
  const handleSavePlayers = () => {
    const playersJson = JSON.stringify(
      players.map((player) => ({ name: player }))
    );
    console.log(playersJson);
    };
    const handleAllocateTeams = () => {
      addTeam(allocateTeams(players));       
    };


  return (
    <div>
      <h1 className="text-1xl font-bold underline">Player List</h1>
      <ul className="border-2 border-white rounded">
        {players.map((player, index) => (
          <li key={index}>{player.playerName}</li>
        ))}
      </ul>
      <button className={buttonStyle} type="button" onClick={handleAllocateTeams}>
        Allocate Teams 
      </button>
      <button className={buttonStyle} type="button" onClick={handleSavePlayers}>
        Save Players
      </button>
    </div>
  );
};

export default PlayerList;