import React from 'react'
import { View, Text, Button } from 'react-native'

export default ({navigation}) => (
    <View>
        <Text>
            Detail
        </Text>
        <Button title="Go to Home" onPress={()=>navigation.navigate("Home")}></Button>
    </View>
);
