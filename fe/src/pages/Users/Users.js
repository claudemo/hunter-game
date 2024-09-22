import axios from "axios";
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import UserList from "./UserList";
//import axios from 'axios';

const UHome = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = () => {
            //const res = await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/user-results`);

            // console.log(results);


            const headers = {
                'ngrok-skip-browser-warning': 'any_value_here', // Set it to any non-empty value'Content-Type': 'application/json'// Set appropriate content type if sending JSON payload
            };
            //const otherUserIds = ['user1', 'user2']; // Replace with actual user IDs
            axios.get(`${process.env.REACT_APP_API_SERVICE_URL}/user-results`, {
                headers

            })
                .then((response) => {

                    console.log('these are the current users', response.data);
                    const { users } = response.data
                    setUsers(users);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching the users:', error);
                });



        };
        fetchData();
    }, []);

    return (
        <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
            {loading ? (
                <ActivityIndicator
                    style={[styles.centering]}
                    color="#ff8179"
                    size="large"
                />
            ) : (
                <UserList users={users} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "whitesmoke",
        marginTop: '60px'
    },
    centering: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        height: "100vh"
    }
});

export default UHome;