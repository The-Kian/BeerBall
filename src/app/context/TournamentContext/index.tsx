import { Team } from '@/app/types';
import createInitialMatches from '@/app/utils/TournamentBracketSetup';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IRoundProps } from 'react-brackets';
import { PlayerTeamContext } from '../PlayerTeamContext';



interface TournamentContextType {
  upperRounds: IRoundProps[];
  lowerRounds: IRoundProps[]; 
  finalRounds: IRoundProps[];
  setUpperRounds: (value: IRoundProps[]) => void;
  setLowerRounds: (value: IRoundProps[]) => void;
  setFinalRounds: (value: IRoundProps[]) => void;
}

const defaultState: TournamentContextType = {
  upperRounds: [],
  lowerRounds: [],
  finalRounds: [],
  setUpperRounds: () => {},
  setLowerRounds: () => {},
  setFinalRounds: () => {},
};

export const TournamentContext = createContext<TournamentContextType>(defaultState);

interface TournamentProviderProps {
  children: ReactNode;
}

export const TournamentProvider = ({ children }: TournamentProviderProps) => {
  const [lowerRounds, setLowerRounds] = useState<IRoundProps[]>([]);
  const [upperRounds, setUpperRounds] = useState<IRoundProps[]>([]);
  const [finalRounds, setFinalRounds] = useState<IRoundProps[]>([]);

  const { teams } = useContext(PlayerTeamContext);
  console.log(`🚀 - KP -  ~ TournamentProvider ~ teams:`, teams.length)
    useEffect(() => {
        if (teams) {
        const newRounds = createInitialMatches(teams);
        setUpperRounds(newRounds.upperRounds);
        setLowerRounds(newRounds.lowerRounds);
        setFinalRounds(newRounds.finalRounds)
        }
    }, [teams]);
  return (
    <TournamentContext.Provider value={{ upperRounds, setUpperRounds, lowerRounds, setLowerRounds, finalRounds, setFinalRounds }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => useContext(TournamentContext);