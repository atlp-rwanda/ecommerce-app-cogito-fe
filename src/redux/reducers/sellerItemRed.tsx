import {
    GET_ITEM_DETAILS_REQUEST,
    GET_ITEM_DETAILS_SUCCESS,
    GET_ITEM_DETAILS_FAILURE,
    GET_COLLECTION_REQUEST,
    GET_COLLECTION_SUCCESS,
    GET_COLLECTION_FAILURE,
  } from '../../type/actionTypes';
  
  import { Item, CollectionItem } from '../../type/types';
  
  interface AppState {
    loading: boolean;
    error: string | null;
    selectedItem: Item | null;
    collection: CollectionItem[];
  }
  
  const initialState: AppState = {
    loading: false,
    error: null,
    selectedItem: null,
    collection: [],
  };
  
  const rootReducer = (state = initialState, action: any): AppState => {
    switch (action.type) {
      case GET_ITEM_DETAILS_REQUEST:
      case GET_COLLECTION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_ITEM_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          selectedItem: action.payload,
        };
      case GET_COLLECTION_SUCCESS:
        return {
          ...state,
          loading: false,
          collection: action.payload,
        };
      case GET_ITEM_DETAILS_FAILURE:
      case GET_COLLECTION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  