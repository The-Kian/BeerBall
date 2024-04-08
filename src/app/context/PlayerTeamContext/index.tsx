import React, { createContext, useState } from "react";

import { Player, Team } from "../../types";

interface ContextProps {
    players: Player[];
    teams: Team[];
    addPlayer: (player: Player) => void;
    addTeam: (team: Team, teams: Team[]) => void;
}

export const PlayerTeamContext = createContext<ContextProps>({
    players: [],
    teams: [],
    addPlayer: () => {},
    addTeam: () => {},
});

export const PlayerTeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const addPlayer = (player: Player) => {
        setPlayers([...players, player]);
    };

    const addTeam = (team: Team, teams: Team[]) => {
        setTeams([...teams, team]);
    };

    return (
        <PlayerTeamContext.Provider value={{ players, teams, addPlayer, addTeam }}>
            {children}
        </PlayerTeamContext.Provider>
    );
};
