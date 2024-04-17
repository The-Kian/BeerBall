import { createContext, useContext, useState } from 'react';
import { IRoundProps } from 'react-brackets';

export const TournamentContext = createContext({ rounds: [] as IRoundProps[], setRounds: (value: IRoundProps[]) => {} });

export const TournamentProvider = ({ children }: any) => {
  const [rounds, setRounds] = useState<IRoundProps[]>([]);

  return (
    <TournamentContext.Provider value={{ rounds, setRounds }}>
      {children}
    </TournamentContext.Provider>
  );
};