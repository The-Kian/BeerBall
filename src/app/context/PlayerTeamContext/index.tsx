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

export const PlayerTeamProvider = ({ children }: ProviderProps) => {
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
  const getPlayers = () => {
    fetch("storage/players.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("File not found");
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        localStorage.setItem("players", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error.message);
        const localData = localStorage.getItem("players");
        if (localData) {
          setPlayers(JSON.parse(localData));
        }
      });
  };

  const getTeams = () => {
    fetch("storage/teams.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("File not found");
        }
        return response.json();
      })
      .then((data) => {
        setTeams(data);
        localStorage.setItem("teams", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error.message);
        const localData = localStorage.getItem("teams");
        if (localData) {
          setTeams(JSON.parse(localData));
        }
      });
  };

  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getPlayers();
    getTeams();
  }, []);

  return (
    <PlayerTeamContext.Provider
      value={{ players, teams, addPlayer, addTeam, removePlayer }}
    >
      {children}
    </PlayerTeamContext.Provider>
  );
};
