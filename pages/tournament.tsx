import Tournament from "@/app/components/Tournament";
import { PlayerTeamProvider } from "@/app/context/PlayerTeamContext";
import React from "react";

const TournamentPage = () => (
  <PlayerTeamProvider>
    <Tournament />
  </PlayerTeamProvider>
);

export default TournamentPage;