import { ICharacters, ICharactersAction } from './index';
import { GET_REQUEST, GET_FAILURE, GET_SUCCESS } from './index';

/** Initial State */
const initialState: ICharacters = {
  isFetching: false,
};

/** Reducer */
export function charactersReducer(state = initialState, action: ICharactersAction) {
  switch (action.type) {
    case GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        character: action.payload.data,
      });

    case GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.payload.message,
        error: true,
      });

    default:
      return state;
  }
}

// /** Async Action Creator */
// export function getCharacters() {
//   return (dispatch) => {
//     dispatch(charactersRequest());
//
//     return fetch('http://localhost:4444/api/marvelapi/characters?categories=x-men')
//       .then((res) => {
//         if (res.ok) {
//           return res.json()
//             .then((res) => dispatch(charactersSuccess(res)));
//         } else {
//           return res.json()
//             .then((res) => dispatch(charactersFailure(res)));
//         }
//       })
//       .catch((err) => dispatch(charactersFailure(err)));
//   };
// }

/** Action Creator */
export function charactersRequest(): ICharactersAction {
  return {
    type: GET_REQUEST,
  };
}

/** Action Creator */
export function charactersSuccess(data: any): ICharactersAction {
  return {
    type: GET_SUCCESS,
    payload: {
      data,
    },
  };
}

/** Action Creator */
export function charactersFailure(message: any): ICharactersAction {
  return {
    type: GET_FAILURE,
    payload: {
      message,
    },
  };
}
