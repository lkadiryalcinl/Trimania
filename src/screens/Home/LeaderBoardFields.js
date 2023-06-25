import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'

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
                <Text style={styles.text}>Score</Text>
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
        alignItems:'center'
    },
    username: {
        flex: 3,
        alignItems:'center'
    },
    score: {
        flex: 1,
        alignItems:'center'
    },
    text:{
        fontSize:18,
        color:colors.black

    },

})