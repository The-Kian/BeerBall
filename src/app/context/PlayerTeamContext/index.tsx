import React, { createContext, useEffect, useState } from "react";

import { Player, Team } from "../../types";

interface ContextProps {
  players: Player[];
  teams: Team[];
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
  addTeam: (teams: Team[], team?: Team) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const PlayerTeamContext = createContext<ContextProps>({
  players: [],
  teams: [],
  addPlayer: () => {},
  removePlayer: () => {},
  addTeam: () => {},
});

export const PlayerTeamProvider = ({ children, initialPlayers, initialTeams }: ProviderProps & { initialPlayers: Player[], initialTeams: Team[] }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [teams, setTeams] = useState(initialTeams);
  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers, player];
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });
  };

  const removePlayer = (player: Player) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.filter(
        (prevPlayer) => prevPlayer.playerName !== player.playerName
      );
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });
  };

  const addTeam = (teams: Team[], team?: Team) => {
    if (!team) {
      setTeams([...teams]);
    } else {
      setTeams([...teams, team]);
    }
    localStorage.setItem("teams", JSON.stringify(teams));
  };


useEffect(() => {
  const playersData = JSON.parse(process.env.PLAYERS_JSON || '[]');
  setPlayers(playersData);
  localStorage.setItem("players", JSON.stringify(playersData));
}, []);

  return (
    <PlayerTeamContext.Provider
      value={{ players, teams, addPlayer, addTeam, removePlayer }}
    >
      {children}
    </PlayerTeamContext.Provider>
  );
};
