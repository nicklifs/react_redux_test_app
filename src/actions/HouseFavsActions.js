/*eslint-disable*/

import {
    ROUTING
} from '../constants/Routing'

export function addHouseToFavs(payload) {

  return (dispatch, getState) => {

    let store = getState();
    let oldHouses = store.favHouses ? store.favHouses : [];
    let newHouse = payload.house;
    newHouse.fav = true;

    let houses = [newHouse].concat(oldHouses.filter(function (value) {
      return value.img_url != payload.house.img_url;
    }));


    dispatch({
      type: 'ADD_HOUSE_TO_FAVS',
      payload: {
        houses: houses
      }
    })

    window.localStorage.setItem('housesList', JSON.stringify(houses));
  }
}

export function removeHouseFromFavs(payload) {

  return (dispatch, getState) => {

    let store = getState();
    let oldHouses = store.favHouses ? store.favHouses : [];
    let houses = [];

    if (oldHouses.length) {
      houses = oldHouses.filter(function (value) {
        return value.img_url != payload.house.img_url;
      });
    }


    dispatch({
      type: 'REMOVE_HOUSE_FROM_FAVS',
      payload: {
        houses: houses
      }
    })

    window.localStorage.setItem('housesList', JSON.stringify(houses));


    dispatch({
      type: ROUTING,
      payload: {
        method: 'push',
        nextUrl: '/favourites'
      }
    })
  }
}


