const initialState = null;

export default function housestate(state = initialState, action) {

  switch (action.type) {

    case 'SAVE_HOUSE_FOR_VIEW':
      return action.payload.house;
    
    default:
      return state
    }
}
