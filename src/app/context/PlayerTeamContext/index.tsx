import React, { createContext, useState } from "react";

import { Player, Team } from "../../types";
import { get } from "http";

interface ContextProps {
    players: Player[];
    teams: Team[];
    addPlayer: (player: Player) => void;
    addTeam: (team: Team, teams: Team[]) => void;
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

export const PlayerTeamProvider = ({children}: ProviderProps) => {

    
        const addPlayer = (player: Player) => {
            setPlayers([...players, player]);
            localStorage.setItem("players", JSON.stringify(players))
        };
    
        const addTeam = (team: Team) => {
            setTeams([...teams, team]);
            localStorage.setItem("teams", JSON.stringify(teams))
        };
    
        const getPlayers = () => {
            return (localStorage.getItem("players") ? JSON.parse(localStorage.getItem("players")!) : [])
        }
    
        const getTeams = () => {
            return (localStorage.getItem("teams") ? JSON.parse(localStorage.getItem("teams")!) : [])
        }
    const [players, setPlayers] = useState<Player[]>(getPlayers());
    const [teams, setTeams] = useState<Team[]>(getTeams());

    return (
        <PlayerTeamContext.Provider value={{ players, teams, addPlayer, addTeam }}>
            {children}
        </PlayerTeamContext.Provider>
    );
};
