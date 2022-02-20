import React, {useEffect, useState} from 'react';
import T from 'tailwind-rn';
import {View, StatusBar, ScrollView, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@games');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('ee :>> ', e);
  }
};

const History = () => {
  const [games, setGames] = useState([]);
  // let games: any = [];
  useEffect(() => {
    getData().then((data) => setGames(data));
  });
  console.log('games :>> ', games);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={T('flex')}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={T('font-bold text-lg mb-6')}>History</Text>
          <View style={T('flex flex-row justify-between')}>
            {games.map((game, index) => (
              <View key={index} style={T('bg-red-100 w-full p-4')}>
                <View style={T('justify-between bg-green-100 flex-row')}>
                  <Text>{game.teamA}</Text>
                  <Text>{game.teamB}</Text>
                </View>
                {game.rounds.map((round) => (
                  <View style={T('justify-between bg-green-100 flex-row')}>
                    <Text>{round.result.teamA}</Text>
                    <Text>{round.result.teamB}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default History;
