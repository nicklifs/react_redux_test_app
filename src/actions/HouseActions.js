/*eslint-disable*/

import {
    ROUTING
} from '../constants/Routing'


export function saveHouseForViewDetails(payload) {

  return (dispatch, getState) => {

    let store = getState();
    let house = payload.type && payload.type == 'favs' ?
        store.favHouses[payload.number] :
        store.searchPage.housesList.data[payload.number];

    dispatch({
      type: 'SAVE_HOUSE_FOR_VIEW',
      payload: {
        house: house
      }
    })

    // route to '/houseDetails'
    dispatch({
      type: ROUTING,
      payload: {
        method: 'push',
        nextUrl: '/houseDetails'
      }
    })
  }
}


