import TournamentSetup from "./components/TournamentSetup";


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Beerball</h1>
      <p className="text-xl">Beerball: The Game of Beer and Ball </p>
      <TournamentSetup />
    </main>
  );
}
