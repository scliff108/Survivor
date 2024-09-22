import React, { useEffect, useState } from 'react';

import axios from 'axios';
import styles from './PlayerSelection.module.css';
import PlayerList from '../components/PlayerList';

const PlayerSelection = () => {
    // State to store players
    const [players, setPlayers] = useState([]);
    // State to hold selected players
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);
    // Error state
    const [error, setError] = useState(null);

    // Fetch players from the API when the component mounts
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                // Make the API request
                const response = await axios.get('api/players');
                // Sort players alphabetically
                response.data.sort((a, b) => a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0));
                // Set players in state
                setPlayers(response.data);
                setLoading(false);
            } catch (err) {
                console.log('Error fetching players:', err);
                // Set error if request fails
                setError('Failed to fetch players');
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);  // Empty dependency array ensures this runs once on component mount

    // Handle player selection
    const handlePlayerSelect = (playerId) => {
        if (selectedPlayers.includes(playerId)) {
            // Deselect Player
            setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
        } else if (selectedPlayers.length < 4) {
            // Select player
            setSelectedPlayers([...selectedPlayers, playerId]);
        }
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
            {loading && <p>Loading players...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <form onSubmit={handleSubmit}>
                    {/* List of Unselected Players */}
                    <PlayerList
                        key={1}
                        players={players.filter((player) => !selectedPlayers.includes(player.id))}
                        onSelect={handlePlayerSelect}
                        isSelected={false}
                        isDisabled={selectedPlayers.length === 4}
                    />
                    
                    {/* List of Selected Players */}
                    <h2>Selected Players</h2>
                    <PlayerList
                        key={2}
                        players={players.filter((player) => selectedPlayers.includes(player.id))}
                        onSelect={handlePlayerSelect}
                        isSelected={true}
                        isDisabled={false}
                    />

                    <button
                        type="submit"
                        className={selectedPlayers.length === 4 ? styles.submitButton : styles.submitButtonDisabled}
                        disabled={selectedPlayers.length !== 4}>
                        Submit Players
                    </button>
                </form>
            )}
        </div>
    );
};

export default PlayerSelection;