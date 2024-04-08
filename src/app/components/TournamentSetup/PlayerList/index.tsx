import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { buttonStyle } from "@/app/styles/buttons";
import { Player } from "@/app/types";
import React, { useContext } from "react";


const PlayerList = () => {

  const { players } = useContext(PlayerTeamContext);
  const handleSavePlayers = () => {
    const playersJson = JSON.stringify(
      players.map((player) => ({ name: player }))
    );
    console.log(playersJson);
    };
    const handleAllocateTeams = () => {
      console.log("Allocate Teams");
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