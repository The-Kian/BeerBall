
import React, { useContext, useRef } from "react";
import {PlayerTeamContext} from "@/app/context/PlayerTeamContext";

const PlayerInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addPlayer } = useContext(PlayerTeamContext);
return (
    <div>
        <input
            className="text-black"
            type="text"
            placeholder="Enter a player"
            ref={inputRef}
        />
        <button
            className="border-2 border-darkgreen p-2 m-2"
            type="button"
            onClick={() =>
                { if(inputRef.current) {
                    addPlayer({id: Math.random().toString(), playerName: inputRef.current.value})
                } else {
                    console.log("Please enter a player name")
                }
            }
        }
        >
            Add Player
        </button>

    </div>
);
};

export default PlayerInput;
