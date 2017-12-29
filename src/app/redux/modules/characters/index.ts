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
