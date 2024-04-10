import React, { createContext, useEffect, useState } from "react";

import { Player, Team } from "../../types";

interface ContextProps {
  players: Player[];
  teams: Team[];
  addPlayer: (player: Player) => void;
  addTeam: (teams: Team[], team?: Team) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const PlayerTeamContext = createContext<ContextProps>({
  players: [],
  teams: [],
  addPlayer: () => {},
  addTeam: () => {},
});

export const PlayerTeamProvider = ({ children }: ProviderProps) => {
  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers, player];
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
  const getPlayers = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("players")
        ? JSON.parse(localStorage.getItem("players")!)
        : [];
    }
    return [];
  };

  const getTeams = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("teams")
        ? JSON.parse(localStorage.getItem("teams")!)
        : [];
    }
    return [];
  };

  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setPlayers(getPlayers());
    setTeams(getTeams());
  }, []);

  return (
    <PlayerTeamContext.Provider value={{ players, teams, addPlayer, addTeam }}>
      {children}
    </PlayerTeamContext.Provider>
  );
};
