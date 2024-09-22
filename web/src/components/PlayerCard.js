import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PlayerCard = ({ player }) => {

    return (
        <Card sx={{ display: 'flex', height: '100%' }}>
            {/* Image on the left */}
            <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={player.image_url}
                alt={`Image of ${player.name}`}
            />

            {/* Content on the right */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sc={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {player.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                        <p><strong>Age</strong>: {player.age}</p>
                        <p><strong>Occupation</strong>: {player.occupation}</p>
                        <p><strong>Hometown</strong>: {player.hometown}</p>
                        <p><strong>Current Residence</strong>: {player.current_residence}</p>
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default PlayerCard;