import React from 'react';
import {useSelector} from 'react-redux';
import T from 'tailwind-rn';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RootState} from '../store';

type Props = {};

const Rounds: React.FC<Props> = () => {
  const rounds = useSelector((state: RootState) => state.game.rounds);
  let resultTeamA = 0;
  let resultTeamB = 0;

  return rounds.length ? (
    <>
      <View style={T('m-2 border-b border-yellow-800')}>
        <Text style={T('text-yellow-900')}>Round 1</Text>
      </View>
      {rounds.map(
        (
          round: {
            result: {teamA: string; teamB: string};
            takenBy: string;
            takenAt: string;
          },
          index: number,
        ) => {
          resultTeamA = resultTeamA + parseInt(round.result.teamA, 0);
          resultTeamB = resultTeamB + parseInt(round.result.teamB, 0);

          return (
            <View key={index}>
              <View style={T('flex flex-row justify-between')}>
                <TextInput
                  style={T(
                    `flex-1 border rounded p-2 m-2 
                    text-left bg-gray-200 border-gray-300
                    ${
                      round.takenBy === 'teamA'
                        ? round.result.teamA >= round.takenAt
                          ? ' border border-green-700'
                          : ' border-red-700 border-red-600'
                        : ''
                    }`,
                  )}
                  editable={false}
                  value={round.result.teamA}
                />

                <View style={T('flex flex-row items-center')}>
                  <TouchableOpacity
                    style={[
                      styles.triangle,
                      styles.triangleLeft,
                      !!round.takenBy &&
                        round.takenBy !== 'teamA' &&
                        styles.triangleLeftDisabled,
                    ]}
                    disabled
                  />
                  <Text
                    style={T(
                      'w-12 bg-green-100 border border-green-700 p-2 my-2 text-center',
                    )}>
                    {round.takenAt}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.triangle,
                      styles.triangleRight,
                      !!round.takenBy &&
                        round.takenBy !== 'teamB' &&
                        styles.triangleRightDisabled,
                    ]}
                    disabled
                  />
                </View>
                <TextInput
                  style={T(
                    `flex-1 border rounded p-2 m-2 
                    text-right bg-gray-200 border border-gray-300
                    ${
                      round.takenBy === 'teamB'
                        ? round.result.teamB >= round.takenAt
                          ? ' border border-green-700'
                          : ' border-red-700 border-red-600'
                        : ''
                    }`,
                  )}
                  editable={false}
                  value={round.result.teamB}
                />
              </View>
              {(1 + index) % 4 === 0 && (
                <View style={T('m-2 border-b border-yellow-800')}>
                  <Text style={T('text-yellow-900')}>
                    Round {Math.floor(index / 4 + 2)}
                  </Text>
                </View>
              )}
            </View>
          );
        },
      )}
      <View style={T('flex flex-row py-4 px-6 justify-between bg-green-100')}>
        <Text style={T('text-lg')}>{resultTeamA}</Text>
        <Text style={T('text-lg')}>{resultTeamB}</Text>
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 18,
    borderRightWidth: 20,
    borderBottomWidth: 18,
    borderLeftWidth: 20,
  },
  triangleRight: {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#2f855a',
  },
  triangleLeft: {
    borderTopColor: 'transparent',
    borderRightColor: '#2f855a',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  triangleRightDisabled: {
    borderLeftColor: '#e2e8f0',
  },
  triangleLeftDisabled: {
    borderRightColor: '#e2e8f0',
  },
});

export default Rounds;
