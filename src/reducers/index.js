import { combineReducers } from 'redux'
import searchPage from './searchPage'
import house from './house'
import houseFavs from './houseFavs'

export const rootReducer = combineReducers({
  searchPage,
  currentHouse: house,
  favHouses: houseFavs
})
