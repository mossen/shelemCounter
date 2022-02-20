import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import T from 'tailwind-rn';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Dispatch} from '../store';

const Round: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const [taken, setTaken] = useState<any>({takenAt: '', takenBy: ''});
  const [result, setResult] = useState<any>({teamA: '', teamB: ''});

  const handleAdd = () => {
    dispatch.game.addRound({...taken, result: {...result}});
    setResult({teamA: '', teamB: ''});
    setTaken({takenAt: '', takenBy: ''});
  };

  const handleSetTakenAt = (value: string) => {
    setTaken({...taken, takenAt: value});
  };

  const handleSetResult = (value: string, team: 'teamA' | 'teamB') => {
    const valueNumber = Number(value);
    let takenAtNumber = taken.takenAt;

    let remain: number = 165 - valueNumber;

    if (remain % 5 !== 0) {
      remain = 0;
    } else {
      if (remain < takenAtNumber) {
        //  double negative
        if (valueNumber >= 85) {
          takenAtNumber = takenAtNumber * 2;
        }
        remain = -takenAtNumber;
      }
    }

    setResult({
      [taken.takenBy]: remain ? remain.toString() : null,
      [team]: value.toString(),
    });
  };

  return (
    <View>
      <View style={T('flex flex-row justify-between')}>
        <TextInput
          style={[
            T(
              'flex-1 text-lg bg-gray-200 border-green-200 border rounded p-2 m-2 text-left',
            ),
            T(
              !!taken.takenAt && taken.takenBy === 'teamB'
                ? 'bg-green-100 border-green-700'
                : '',
            ),
            T(result.teamA % 5 !== 0 ? 'bg-red-100 border-red-700' : ''),
          ]}
          editable={
            !!taken.takenAt &&
            taken.takenBy === 'teamB' &&
            Math.abs(taken.takenAt) % 5 === 0
          }
          keyboardType="numeric"
          value={result.teamA}
          onChangeText={(text) => handleSetResult(text, 'teamA')}
        />
        <View style={T('flex flex-row items-center')}>
          <TouchableOpacity
            style={[
              styles.triangle,
              styles.triangleLeft,
              taken.takenBy &&
                taken.takenBy !== 'teamA' &&
                styles.triangleLeftDisabled,
            ]}
            onPress={() => setTaken({...taken, takenBy: 'teamA'})}
          />
          <TextInput
            style={T(
              `w-16 text-lg bg-green-100 border border-green-700 p-2 my-2 text-center
              ${taken.takenAt % 5 !== 0 ? 'border-red-700' : ''}
              `,
            )}
            keyboardType="numeric"
            value={taken.takenAt}
            onChangeText={(value) => handleSetTakenAt(value)}
          />
          <TouchableOpacity
            style={[
              styles.triangle,
              styles.triangleRight,
              taken.takenBy &&
                taken.takenBy !== 'teamB' &&
                styles.triangleRightDisabled,
            ]}
            onPress={() => setTaken({...taken, takenBy: 'teamB'})}
          />
        </View>
        <TextInput
          style={[
            T(
              'flex-1 text-lg bg-gray-200 border-green-200 border rounded p-2 m-2 text-left',
            ),
            T(
              !!taken.takenAt && taken.takenBy === 'teamA'
                ? 'bg-green-100 border-green-700'
                : '',
            ),
            T(result.teamB % 5 !== 0 ? 'bg-red-100 border-red-700' : ''),
          ]}
          editable={
            !!taken.takenAt &&
            taken.takenBy === 'teamA' &&
            Math.abs(taken.takenAt) % 5 === 0
          }
          keyboardType="decimal-pad"
          value={result.teamB}
          onChangeText={(value) => handleSetResult(value, 'teamB')}
        />
      </View>
      <View style={T('flex items-center mt-4')}>
        <TouchableOpacity
          disabled={!result.teamB || !result.teamA}
          style={[
            T('bg-green-200 border rounded border-green-300 w-32 p-3'),
            T(
              !result.teamB || !result.teamA
                ? 'bg-gray-100 border-green-200'
                : '',
            ),
          ]}
          onPress={handleAdd}>
          <Text
            style={[
              T('text-center text-lg'),
              T(
                !result.teamB || !result.teamA
                  ? 'text-gray-500'
                  : 'text-gray-700',
              ),
            ]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 19,
    borderRightWidth: 25,
    borderBottomWidth: 20,
    borderLeftWidth: 25,
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

export default Round;
