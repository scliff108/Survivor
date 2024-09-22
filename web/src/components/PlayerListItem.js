import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import styles from './PlayerListItem.module.css';

const PlayerListItem = ({ player, isSelected, isDisabled }) => {
    return (
        <Paper
            elevation={isSelected ? 8 : 1}
            className={`${styles.playerListItem} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
        >
            <Avatar
                alt={player.name}
                src={player.image_url}
                className={styles.avatar}
                imgProps={{
                    style: {
                        transform: 'scale(1.2)',
                        objectFit: 'cover',
                        objectPosition: 'top',
                    }
                }}
            />
            <Typography variant="body1" className={styles.typography}>
                {player.name}
            </Typography>
        </Paper>
    );
};

export default PlayerListItem;