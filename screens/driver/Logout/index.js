import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearState as clearStateUser } from '../../../data/slices/user.slice'; // Adjust the import path as necessary
import { View, Text } from 'react-native';

const Logout = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(clearStateUser());
        navigation.navigate('RiderDriverScreen');
    }, [dispatch, navigation]);

    return (
        <View>
            <Text>Logging out...</Text>
        </View>
    );
};

export default Logout;