"use client";

import React, { useState } from "react";
import PlayerInput from "./PlayerInput";
import PlayerList from "./PlayerList";
import { PlayerTeamProvider } from "@/app/context/PlayerTeamContext";

const TournamentSetup = () => {
  return (
    <div>
      <PlayerTeamProvider>
        <PlayerList />
        <PlayerInput />
      </PlayerTeamProvider>
    </div>
  );
};

export default TournamentSetup;
