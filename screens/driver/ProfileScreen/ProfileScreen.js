import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
    const user = useSelector(state => state.user);
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: user.profilePicture }} 
                style={styles.profileImage} 
            />
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.email}>{user.email}</Text>
            {/* <Button title="Edit Profile" onPress={() => {}} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
});

export default ProfileScreen;