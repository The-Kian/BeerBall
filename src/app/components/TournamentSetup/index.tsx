"use client";

import React, { useState } from "react";
import PlayerInput from "./PlayerInput";
import PlayerList from "./PlayerList";
import { PlayerTeamProvider } from "@/app/context/PlayerTeamContext";
import TeamList from "./TeamList";

const TournamentSetup = () => {
  return (
    <div>
      <PlayerTeamProvider>
        <PlayerList />
        <PlayerInput />
        <TeamList />
      </PlayerTeamProvider>
    </div>
  );
};

export default TournamentSetup;
