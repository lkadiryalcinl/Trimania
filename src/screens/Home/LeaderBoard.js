import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl
} from 'react-native'

import React,
{
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'

import LeaderBoardCard from './LeaderBoardCard'
import colors from '../../utils/colors'

import getAllUsers from '../../firebase/getAllUsers'
import LeaderBoardFields from './LeaderBoardFields'

const LeaderBoard = ({ user }) => {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  // Fetch users function
  const fetchUsers = async () => {
    setLoading(true)
    const users = await getAllUsers();
    setAllUsers(users);
    setLoading(false);
    setRefreshing(false);
  }

  // useEffect to fetch users when refreshing state changes to true
  useEffect(() => {
    if(refreshing){
      fetchUsers();
    }
  }, [refreshing])

  // FlatList reference
  const flatListRef = useRef();

  useEffect(() => {
    if (!refreshing && user && allUsers.length > 0) {
      const userIndex = allUsers.findIndex(item => item.userID === user.userID);
      if (userIndex >= 0) {
        flatListRef?.current?.scrollToIndex({ index: userIndex, animated: true });
      }
    }
  }, [user, allUsers, refreshing])

  const renderItem = ({ item, index }) =>
    <LeaderBoardCard
      id={index + 1}
      icon={item?.icon}
      score={item?.score}
      username={item?.username}
      user={user}
      userID={item?.userID}
    />

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Leaderboard</Text>
      </View>
      <LeaderBoardFields />
      <View style={styles.bottom}>
        {loading ? <ActivityIndicator size={100} style={styles.indicator} color={colors.ac} /> :
          <FlatList
            ref={flatListRef} // FlatList reference
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.ac,colors.bg]}/>
            }
            showsVerticalScrollIndicator={false}
            data={allUsers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(data, index) => (
              {length: 80, offset: 80 * index, index}
            )}
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