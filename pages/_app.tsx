// pages/_app.tsx
import { PlayerTeamContext, PlayerTeamProvider } from "@/app/context/PlayerTeamContext";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Player, Team } from "@/app/types";
import { NextPageContext } from "next";
import Layout from "@/app/layout";

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
      <Component {...pageProps} />
    </PlayerTeamProvider>
    </Layout>
  );
}

MyApp.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { initialPlayers: [], initialTeams: [] };
  }

  const players = JSON.parse(process.env.PLAYERS_JSON || '[]');
  const teams = JSON.parse(process.env.TEAMS_JSON || '[]');

  return { initialPlayers: players, initialTeams: teams };
};

export default MyApp;