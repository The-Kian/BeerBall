import { Team } from '@/app/types';
import createInitialMatches from '@/app/utils/TournamentBracketSetup';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IRoundProps } from 'react-brackets';
import { PlayerTeamContext } from '../PlayerTeamContext';



interface TournamentContextType {
  upperRounds: IRoundProps[];
  lowerRounds: IRoundProps[]; 
  setUpperRounds: (value: IRoundProps[]) => void;
  setLowerRounds: (value: IRoundProps[]) => void;
}

const defaultState: TournamentContextType = {
  upperRounds: [],
  lowerRounds: [],
  setUpperRounds: () => {},
  setLowerRounds: () => {},
};

export const TournamentContext = createContext<TournamentContextType>(defaultState);

interface TournamentProviderProps {
  children: ReactNode;
}

export const TournamentProvider = ({ children }: TournamentProviderProps) => {
  const [lowerRounds, setLowerRounds] = useState<IRoundProps[]>([]);
  const [upperRounds, setUpperRounds] = useState<IRoundProps[]>([]);

  const { teams } = useContext(PlayerTeamContext);

  

    useEffect(() => {
        if (teams) {
        const newRounds = createInitialMatches(teams);
        setUpperRounds(newRounds.upperRounds);
        setLowerRounds(newRounds.lowerRounds);
        }
    }, [teams]);
  return (
    <TournamentContext.Provider value={{ upperRounds, setUpperRounds, lowerRounds, setLowerRounds }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => useContext(TournamentContext);