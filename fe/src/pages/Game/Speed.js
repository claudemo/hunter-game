import axios from 'axios';
import { Map, Marker } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';

const GeolocationTracker = () => {
    const [userId, setUserId] = useState(null);
    const [inserted_id, setInserted_id] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.inserted_id : null;
    });
    const [position, setPosition] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.location ? [user.location.latitude, user.location.longitude] : [42.361145, -71.057083];
    });
    const [allUsersData, setAllUsersData] = useState({});

    useEffect(() => {
        const intervalId = setInterval(fetchAllUsersData, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchAllUsersData = () => {

        axios.get(`${process.env.REACT_APP_API_SERVICE_URL}/user-results`, {
            headers: {
                'ngrok-skip-browser-warning': 'any_value_here', // Set it to any non-empty value'Content-Type': 'application/json'// Set appropriate content type if sending JSON payload

                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                // Check if users data is available and is an array
                if (response.data && Array.isArray(response.data.users)) {
                    const newUsersData = {};
                    response.data.users.forEach(user => {
                        const { userId, geolocation, timestamp } = user;
                        const { latitude, longitude } = JSON.parse(geolocation);
                        const newTimestamp = new Date(timestamp).getTime();

                        if (allUsersData[userId]) {
                            const oldData = allUsersData[userId];
                            const oldTimestamp = oldData.timestamp;
                            const timeDiff = (newTimestamp - oldTimestamp) / 1000; // Time in seconds
                            const speed = calculateSpeed(
                                oldData.latitude,
                                oldData.longitude,
                                latitude,
                                longitude,
                                timeDiff
                            );

                            newUsersData[userId] = { latitude, longitude, timestamp: newTimestamp, speed };
                        } else {
                            newUsersData[userId] = { latitude, longitude, timestamp: newTimestamp, speed: 0 };
                        }
                    });
                    setAllUsersData(newUsersData);
                } else {
                    console.error('Unexpected data format or no users data:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };
    const calculateSpeed = (lat1, lon1, lat2, lon2, time) => {
        if (time <= 0) return 0;
        const distance = calculateDistance(lat1, lon1, lat2, lon2); // in km
        const speed = distance / time; // Speed in km/h
        return speed;
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };

    return (
        <>



            <Map height={600} style={{ marginRight: '2rem' }} defaultCenter={position} defaultZoom={13}>
                {Object.entries(allUsersData).map(([id, data], index) => (
                    <Marker
                        key={index}
                        width={50}
                        anchor={[data.latitude, data.longitude]}
                        color={`hsl(${(index * 60) % 360}deg 39% 70%)`}
                    />
                ))}
            </Map>
            <div style={{ overflowY: 'auto', maxHeight: '50vh', padding: '10px' }}>
                {/* This div will scroll if content exceeds its max height */}
                {Object.entries(allUsersData).map(([userId, userData]) => (
                    <div key={userId} style={{ margin: '2px' }}>
                        User: {userId}: Position - Lat: {userData.latitude.toFixed(2)}, Long: {userData.longitude.toFixed(2)}, Speed: {userData.speed.toFixed(2)} m/s
                    </div>
                ))}
            </div>
        </>
    );
};

export default GeolocationTracker;