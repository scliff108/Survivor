import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PlayerSelection.module.css';

const PlayerSelection = () => {
    // State to store players
    const [players, setPlayers] = useState([]);
    // State to store tribes
    const [tribes, setTribes] = useState([]);
    // State to hold selected players
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Fetch players from the API when the component mounts
    useEffect(() => {
        const fetchTribes = async () => {
            try {
                const response = await axios.get('api/tribes');  // Make the API request
                setTribes(response.data);  // Set the tribes in the state
            } catch (err) {
                console.log('Error fetching tribes', err);
                setError('Failed to fetch tribes');  // Set error if request fails
            }
        }

        const fetchPlayers = async () => {
            try {
                const response = await axios.get('api/players');  // Make the API request
                setPlayers(response.data);  // Set players in the state
                setLoading(false);
            } catch (err) {
                console.log('Error fetching players:', err);
                setError('Failed to fetch players');  // Set error if request fails
                setLoading(false);
            }
        };

        fetchTribes();
        fetchPlayers();
    }, []);  // Empty dependency array ensures this runs once on component mount

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
            <p>Select 4 players from the list below:</p>
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
                                {player.name} - {player.occupation} ({player.age} years old)
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