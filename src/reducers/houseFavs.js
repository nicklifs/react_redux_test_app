const initialState = JSON.parse(window.localStorage.getItem('housesList')) || [];

export default function housesfavstate(state = initialState, action) {

  switch (action.type) {

    case 'ADD_HOUSE_TO_FAVS':
    case 'REMOVE_HOUSE_FROM_FAVS':
      return action.payload.houses;

    case 'FETCH_ADD_FAVS':
      return [...action.payload.favs, ...state]

    case 'TEST':
      return state;
    
    default:
      return state
    }
}
