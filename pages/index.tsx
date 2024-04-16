import React from "react";
import Link from "next/link";
import TournamentSetup from "../src/app/components/TournamentSetup";
import { buttonStyle } from "../src/app/styles/styles";

export default function Home() {
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
