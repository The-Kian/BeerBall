import React, { useContext } from "react";
import Link from "next/link";
import TournamentSetup from "../src/app/components/TournamentSetup";
import { buttonStyle } from "../src/app/styles/styles";
import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";

export default function Home() {
  const { players, teams } = useContext(PlayerTeamContext);
  
  return (
    <main className="w-1/2 flex flex-col items-center justify-center p-24">
      <div>
        <h1 className="text-6xl font-bold">Beerball</h1>
        <p className="text-xl">Beerball: The Game of Beer and Ball </p>
        <TournamentSetup />
        <Link href="/tournament">
          <button className={buttonStyle + " mt-5"}>Start Tournament</button>
        </Link>
      </div>
    </main>
  );
}