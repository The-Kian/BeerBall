
import React, { useContext, useRef } from "react";
import { PlayerTeamContext } from "@/app/context/PlayerTeamContext";
import { v4 as uuid } from "uuid";

const PlayerInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { addPlayer } = useContext(PlayerTeamContext);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputRef.current) {
            addPlayer({ id: uuid(), playerName: inputRef.current.value });
            inputRef.current.value = "";
        } else {
            console.log("Please enter a player name");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    className="text-black"
                    type="text"
                    placeholder="Enter a player"
                    ref={inputRef}
                />
                <button
                    className="border-2 border-darkgreen p-2 m-2"
                    type="submit"
                >
                    Add Player
                </button>
            </form>
        </>
    );
};

export default PlayerInput;
