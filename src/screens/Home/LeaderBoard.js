import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LeaderBoardCard from './LeaderBoardCard'
import colors from '../../utils/colors'

import getAllUsers from '../../firebase/getAllUsers'
import LeaderBoardFields from './LeaderBoardFields'

const LeaderBoard = () => {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchUsers = async () => {
      setAllUsers(await getAllUsers())
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const renderItem = (item) => <LeaderBoardCard id={item.index + 1} icon={item.item.icon} score={item.item.score} username={item.item.username} />

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Leaderboard</Text>
      </View>
      <LeaderBoardFields />
      <View style={styles.bottom}>
        {loading ? <ActivityIndicator size={100} style={styles.indicator} color={colors.ac}/> :
          <FlatList
            data={allUsers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    </View>
  )
}

export default LeaderBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: 'white'
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.ac,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  bottom: {
    flex: 10
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white'
  }
})