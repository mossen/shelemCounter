import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import T from 'tailwind-rn';
import {
  View,
  Platform,
  TextInput,
  StatusBar,
  ScrollView,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Dispatch, RootState} from '../store';
import Round from '../components/round';
import Rounds from '../components/rounds';

const Main = () => {
  const dispatch = useDispatch<Dispatch>();
  const teams = useSelector((state: RootState) => ({
    teamA: state.game.teamA,
    teamB: state.game.teamB,
  }));

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback
        style={T('h-full bg-red-600')}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={T('flex bg-gray-100 h-full')}>
          <SafeAreaView style={T('flex')}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View style={T('flex flex-row justify-between')}>
                <TextInput
                  style={T(
                    'flex-1 bg-green-100 border border-green-700 rounded p-2 m-2',
                  )}
                  value={teams.teamA}
                  onChangeText={(text) =>
                    dispatch.game.setTeamName({name: text, team: 'teamA'})
                  }
                />
                <TextInput
                  style={T(
                    'flex-1 bg-green-100 border border-green-700 rounded p-2 m-2 text-right',
                  )}
                  value={teams.teamB}
                  onChangeText={(text) =>
                    dispatch.game.setTeamName({name: text, team: 'teamB'})
                  }
                />
              </View>
              <Rounds />
              <Round />
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Main;
