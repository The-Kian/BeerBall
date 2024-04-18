import { Team } from '@/app/types';
import createInitialMatches from '@/app/utils/TournamentBracketSetup';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IRoundProps } from 'react-brackets';
import { PlayerTeamContext } from '../PlayerTeamContext';



interface TournamentContextType {
  rounds: IRoundProps[];
  setRounds: (value: IRoundProps[]) => void;
}

const defaultState: TournamentContextType = {
  rounds: [],
  setRounds: () => {},
};

export const TournamentContext = createContext<TournamentContextType>(defaultState);

interface TournamentProviderProps {
  children: ReactNode;
}

export const TournamentProvider = ({ children }: TournamentProviderProps) => {
  const [rounds, setRounds] = useState<IRoundProps[]>([]);

  const { teams } = useContext(PlayerTeamContext);
  console.log("🚀 ~ TournamentProvider ~ teams:", teams)

  

    useEffect(() => {
        if (teams) {
        const newRounds = createInitialMatches(teams);
        setRounds(newRounds.rounds);
        }
    }, [teams]);
  return (
    <TournamentContext.Provider value={{ rounds, setRounds }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => useContext(TournamentContext);