import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const LeaderBoardFields = () => {
    return (
        <View style={styles.container}>
            <View style={styles.id} >
                <Text style={styles.text}>Rank</Text>
            </View>
            <View style={styles.icon}>
                <Text style={styles.text}>Icon</Text>
            </View>
            <View style={styles.username}>
                <Text style={styles.text}>Username</Text>
            </View>
            <View style={styles.score}>
                <Icon name='crown' size={24} color={'gold'}/>
            </View>
        </View>
    )
}

export default LeaderBoardFields

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height:Dimensions.get('screen').height/18,
        alignItems:'center',
        borderBottomWidth:1
    },
    id: {
        flex: 1,
        alignItems:'center',
    },
    icon: {
        flex: 1,
        alignItems:'center',
        marginLeft:4
    },
    username: {
        flex: 3,
        alignItems:'center'
    },
    score: {
        flex: 1,
        alignItems:'center',
        marginRight:4
    },
    text:{
        fontSize:18,
        color:colors.black

    },

})