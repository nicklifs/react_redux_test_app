/*eslint-disable*/

import $ from 'jquery';

export function getHousesByLocation(payload) {

  return (dispatch, getState) => {

    dispatch({
      type: 'GET_HOUSES_BY_LOCATION_REQUEST',
      payload: {
        location: payload.location,
      }
    })

    let store = getState();
    let place_name = payload.location;

      $.ajax({
        url: "http://api.nestoria.co.uk/api?pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=" + place_name,
        dataType: 'jsonp',
        success: function (data){
          console.log(data.response.status_code, data);

          if (data.response != undefined && data.response.status_code == 200 && data.response.locations.length){

            console.log('ok', data.response.locations[0].place_name, data.response.total_results, data.response.page, ' from ',  data.response.total_pages)

            dispatch({
              type: 'GET_HOUSES_BY_LOCATION_SUCCESS',
              payload: {
                location: data.response.locations[0].place_name,
                housesList: {
                  total_results: data.response.total_results,
                  total_pages: data.response.total_pages,
                  upload_pages: 1,
                  data: data.response.listings
                }
              }
            })

            let searchList = [{
              text: place_name,
              count: data.response.total_results
            }].concat(store.searchPage.searchList.filter(function (value) {
              return value.text != place_name;
            }));

            dispatch({
              type: 'SEARCH_LIST_ADD_ITEM',
              payload: {
                searchList: searchList
              }
            })

            window.localStorage.setItem('searchList', JSON.stringify(searchList));
          } else {

            /* error */
            dispatch({
              type: 'GET_HOUSES_BY_LOCATION_ERROR',
              payload: {}
            })
          }
        }
      })
  }
}

export function getHousesMore(payload) {

  return (dispatch, getState) => {

    dispatch({
      type: 'GET_HOUSES_MORE_REQUEST',
      payload: {}
    })
    
    let store = getState();
    let place_name = store.searchPage.location;
    let page = store.searchPage.housesList.upload_pages + 1;

    $.ajax({
      url: "http://api.nestoria.co.uk/api?action=search_listings&encoding=json&listing_type=buy&page=" + page +"&place_name=" + place_name,
      dataType: 'jsonp',
      success: function (data){
        console.log(data.response.status_code, data);

        if (data.response != undefined && data.response.status_code == 200){

          console.log('ok', data.response.locations[0].place_name, data.response.total_results, data.response.page, ' from ',  data.response.total_pages)
          console.log('data.response.listings = ', data.response.listings.length);

          dispatch({
            type: 'GET_HOUSES_MORE_SUCCESS',
            payload: {
              location: data.response.locations[0].place_name,
              housesList: {
                total_results: data.response.total_results,
                total_pages: data.response.total_pages,
                upload_pages: page,
                data: store.searchPage.housesList.data.concat(data.response.listings)
              }
            }
          })
        }
      }
    })

  }
}

