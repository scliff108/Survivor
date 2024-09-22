import styles from './PlayerList.module.css';
import PlayerListItem from './PlayerListItem';

const PlayerList = ({ players, onSelect, isSelected, isDisabled }) => {
    return (
        <div className={styles.playerList}>
            {players.map((player) => (
                <div
                    key={player.id}
                    className={styles.playerCardWrapper}
                    onClick={() => onSelect(player.id)}
                >
                    <PlayerListItem key={player.id} player={player} isSelected={isSelected} isDisabled={isDisabled} />
                </div>
            ))}
        </div>
    );
};

export default PlayerList;