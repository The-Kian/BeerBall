"use client";

import React, { useState } from "react";
import PlayerInput from "./PlayerInput";
import PlayerList from "./PlayerList";
import { PlayerTeamProvider } from "@/app/context/PlayerTeamContext";
import TeamList from "./TeamList";

const TournamentSetup = () => {
  return (
    <div>
        <PlayerList />
        <PlayerInput />
        <TeamList />
    </div>
  );
};

export default TournamentSetup;
