import React, { useState } from 'react';
import styles from './PlayerSelection.module.css';

const PlayerSelection = () => {
    // Player List
    // TODO: Fetch from the backend
    const players = [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
        { id: 4, name: 'Player 4' },
        { id: 5, name: 'Player 5' },
    ];

    // State to hold selected players
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    // Handle player selection
    const handlePlayerSelect = (event) => {
        const playerId = parseInt(event.target.value);
        setSelectedPlayers((prev) =>
            prev.includes(playerId)
                ? prev.filter((id) => id !== playerId) // Deselect if already selected
                : [...prev, playerId] // Select player
        );
    };

    // Placeholder function for form submission
    // TODO: Submit selected players to backend
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Selected players: ${selectedPlayers.join(', ')}`);
    };

    return (
        <div>
            <h1>Select Your Players</h1>
            <p>Select up to 4 players from the list below:</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.playerList}>
                    {players.map((player) => (
                        <div key={player.id} className={styles.playerItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={player.id}
                                    checked={selectedPlayers.includes(player.id)}
                                    onChange={handlePlayerSelect}
                                    disabled={selectedPlayers.length >= 4 && !selectedPlayers.includes(player.id)}
                                />
                                {player.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className={selectedPlayers.length === 4 ? styles.submitButton : styles.submitButtonDisabled}
                    disabled={selectedPlayers.length !== 4}>
                    Submit Players
                </button>
            </form>
        </div>
    );
};

export default PlayerSelection;