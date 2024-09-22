import axios from 'axios';
import { Map, Marker } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';

const GeolocationTracker = () => {
    const getInitialPosition = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.location) {
            return [user.location.latitude, user.location.longitude];
        }
        return [51.505, -0.09];
    };

    const getValues = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return user.inserted_id;
        }
        return null;
    }

    const [userId, setUserId] = useState(null);
    const [inserted_id, setInserted_id] = useState(getValues());
    const [position, setPosition] = useState(getInitialPosition());
    const [allUsersLocations, setAllUsersLocations] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserId(user.userId);
            setInserted_id(user.inserted_id);
        }

        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);
                    console.log({ latitude, longitude });
                    console.log({ inserted_id });
                    updateUserLocation(latitude, longitude);
                },
                (error) => {
                    console.error('Error watching position:', error);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchAllUsersLocations();
        }, 2000); // Fetch locations every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    const updateUserLocation = (latitude, longitude) => {
        const session = JSON.parse(localStorage.getItem('user'));
        if (session) {
            session.location = { latitude, longitude };
            console.log(inserted_id);
            localStorage.setItem('user', JSON.stringify(session));

            axios.post(`${process.env.REACT_APP_API_SERVICE_URL}/update-user-location`, {
                inserted_id: inserted_id,
                location: { latitude, longitude },
            })
                .then((response) => {
                    console.log('Location updated:', response.data);
                })
                .catch((error) => {
                    console.error('Error updating location:', error);
                });
        }
    };

    const fetchAllUsersLocations = () => {
        //const otherUserIds = ['user1', 'user2']; // Replace with actual user IDs
        const headers = {
            'ngrok-skip-browser-warning': 'any_value_here', // Set it to any non-empty value'Content-Type': 'application/json'// Set appropriate content type if sending JSON payload
        };

        axios.get(`${process.env.REACT_APP_API_SERVICE_URL}/user-results`, { headers })
            .then((response) => {
                const { users } = response.data;
                const locations = users.map(user => JSON.parse(user.geolocation));

                console.log(locations);
                setAllUsersLocations(locations);
            })
            .catch((error) => {
                console.error('Error fetching other users\' locations:', error);
            });
    };

    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;

    return (
        <>
            <h1>Hi, {userId}, This is your current position</h1>
            <Map height={600} defaultCenter={position} defaultZoom={13}>
                {allUsersLocations.map((userLocation, index) => (
                    <Marker
                        key={index}
                        width={50}
                        anchor={[userLocation.latitude, userLocation.longitude]}
                        color={`hsl(${(hue + 60 * (index + 1)) % 360}deg 39% 70%)`}
                    />
                ))}
            </Map>
        </>
    );
};

export default GeolocationTracker;
