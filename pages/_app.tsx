// pages/_app.tsx
import { PlayerTeamContext, PlayerTeamProvider } from "@/app/context/PlayerTeamContext";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Player, Team } from "@/app/types";
import { NextPageContext } from "next";
import Layout from "@/app/layout";
import playersJSON from "../src/storage/playersJSON";
import teamsJSON from "../src/storage/teamsJSON";
import Tournament from "@/app/components/Tournament";
import { TournamentProvider } from "@/app/context/TournamentContext";
import { createInitialMatches } from "@/app/utils/TournamentBracketSetup";

function MyApp({ Component, pageProps, initialPlayers, initialTeams }: AppProps & { initialPlayers: Player[], initialTeams: Team[] }) {
  useEffect(() => {
    if (window) {
      window.localStorage.setItem("players", JSON.stringify(initialPlayers));
      window.localStorage.setItem("teams", JSON.stringify(initialTeams));
    }
  }, []);

  return (
    <Layout>

      <PlayerTeamProvider initialPlayers={initialPlayers} initialTeams={initialTeams}>
        <TournamentProvider initialRounds={initialPlayers}>
          <Component {...pageProps} />
        </TournamentProvider>
      </PlayerTeamProvider>
    </Layout>
  );
}

MyApp.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    const initialRounds = createInitialMatches(teamsJSON).rounds;
    return { initialPlayers: playersJSON, initialTeams: teamsJSON, initialRounds };
  }

  const players = JSON.parse(process.env.PLAYERS_JSON || ``);
  const teams = JSON.parse(process.env.TEAMS_JSON || `[]`);
  const initialRounds = createInitialMatches(teams).rounds;

  return { initialPlayers: players, initialTeams: teams, initialRounds };
};

export default MyApp;