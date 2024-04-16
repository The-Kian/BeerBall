import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { buttonStyle } from "@/app/styles/styles";
import { Player } from "@/app/types";
import allocateTeams from "@/app/utils/TeamSetup/allocateTeams";
import React, { useContext } from "react";

const PlayerList = () => {
  const { players, addTeam, removePlayer } = useContext(PlayerTeamContext);
  const handleSavePlayers = () => {
    const playersJson = JSON.stringify(
      players.map((player) => ({ name: player }))
    );
    console.log(playersJson);
  };
  const handleAllocateTeams = () => {
    if (players.length % 2 !== 0) {
      alert("Please add an even number of players");
      return;
    }
    addTeam(allocateTeams(players));
  };
  const handleRemovePlayer = (playerToRemove: Player) => {
    removePlayer(playerToRemove);
  };

  return (
    <div>
      <h1 className="text-1xl font-bold underline">Player List</h1>
      <ul className="border-2 border-white rounded">
        {players.map((player, index) => (
          <div key={index} className="flex justify-between items-center">
            <li className="mr-4">{player.playerName}</li>
            <button
              onClick={() => handleRemovePlayer(player)}
              className={buttonStyle + "align-right"}
            >
              Remove
            </button>
          </div>
        ))}
      </ul>
      <button
        className={buttonStyle}
        type="button"
        onClick={handleAllocateTeams}
      >
        Allocate Teams
      </button>
      <button className={buttonStyle} type="button" onClick={handleSavePlayers}>
        Save Players
      </button>
    </div>
  );
};

export default PlayerList;
