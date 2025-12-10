// HomePage.jsx and GamesPanel.jsx combined for convenience
// You can split them into separate files later.
import React, { useEffect, useState } from "react";
import GamesPanel from "./components/GamesPanel";
import { fetchNeuroRehabGames } from "./services/firebaseFunctions";



export default function HomePage() {

    const [games,setGames]=useState([])
    console.log(games);
    

useEffect(() => {
  async function loadGames() {
    const data = await fetchNeuroRehabGames();
    console.log(data);
    setGames(data);
  }

  loadGames();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <header className="w-full max-w-4xl text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 drop-shadow-sm">
          HappyMoves Game Hub
        </h1>
        <p className="text-blue-500 mt-2 text-lg">
          Select a game to begin your therapeutic session
        </p>
      </header>

      <div className="w-full max-w-3xl">
        <GamesPanel games={games}/>
      </div>
    </div>
  );
}
