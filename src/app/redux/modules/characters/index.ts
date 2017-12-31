export interface ICharacter {
  _id: string;
  character: any;
}

export interface ICharacters {
  isFetching?: boolean;
  character?: ICharacter[];
  error?: boolean;
  message?: any;
}

export interface ICharactersAction {
  type: string;
  payload?: {
    data?: any;
    message?: any;
  };
}

/** Action Types */
export const GET_REQUEST: string = 'characters/GET_REQUEST';
export const GET_SUCCESS: string = 'characters/GET_SUCCESS';
export const GET_FAILURE: string = 'characters/GET_FAILURE';
