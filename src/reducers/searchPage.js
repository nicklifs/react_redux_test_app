const initialState = {
  location: '',
  housesList: {
    data: []
  },
  showMoreUploading: false,
  goUploading: false,
  errorMessage: null,
  searchList: JSON.parse(window.localStorage.getItem('searchList')) || []
}

export default function searchpagestate(state = initialState, action) {

  switch (action.type) {
    
    case 'SEARCH_LIST_ADD_ITEM':
      return {...state, searchList: action.payload.searchList}

    case 'GET_HOUSES_BY_LOCATION_REQUEST':
      return {...state, location: action.payload.location, goUploading: true}

    case 'GET_HOUSES_BY_LOCATION_SUCCESS':
      return {...state, location: action.payload.location, housesList: action.payload.housesList, goUploading: false, errorMessage: null}

    case 'GET_HOUSES_BY_LOCATION_ERROR':
      return {...state, housesList: { data: []}, errorMessage: 'There are was problem with your search', goUploading: false}

    case 'GET_HOUSES_MORE_REQUEST':
      return {...state, showMoreUploading: true}

    case 'GET_HOUSES_MORE_SUCCESS':
      return {...state, location: action.payload.location, housesList: action.payload.housesList, showMoreUploading: false}
    
    default:
      return state
    }
}
