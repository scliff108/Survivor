import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerSelection from './pages/PlayerSelection';
// import Leaderboard from './pages/Leaderboard';
// import SeasonHistory from './pages/SeasonHistory';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/selection" element={<PlayerSelection />} />
                {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
                {/* <Route path="/history" element={<Season History />} /> */}
            </Routes>
        </Router>
    )
}

export default AppRoutes;