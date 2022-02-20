import {createModel} from '@rematch/core';
import AsyncStorage from '@react-native-community/async-storage';

type TakenAt = string;
type TakenBy = 'teamA' | 'teamB' | null;
interface Taken {
  takenAt: TakenAt;
  takenBy: TakenBy;
}
type Result = {
  teamA: string;
  teamB: string;
};
interface Round extends Taken {
  result: Result;
}

type GameState = {
  teamA: string;
  teamB: string;
  rounds: Round[];
};

const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@games', jsonValue);
  } catch (e) {
    console.log('e :>> ', e);
  }
};
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@games');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('ee :>> ', e);
  }
};

export const game = createModel<GameState>()({
  state: {
    teamA: 'Team A',
    teamB: 'Team B',
    rounds: [],
  },
  reducers: {
    addRound(state, round: Round): any {
      const newState = {
        ...state,
        rounds: [...state.rounds, {...round}],
      };

      return newState;
    },
    setTeamName(
      state,
      {name, team}: {name: string; team: 'teamA' | 'teamB'},
    ): any {
      return {
        ...state,
        [team]: name,
      };
    },
  },
  effects: {
    // Effects functions that share a name with a reducer are called after their reducer counterpart.
    async addRound(round: Round, rootState) {
      await storeData([rootState.game]);
    },
  },
});
