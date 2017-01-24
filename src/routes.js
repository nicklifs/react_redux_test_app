import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './components/Home'
import NotFound from './components/NotFound'

import PropertySearch from './components/PropertySearch'
import Favourites from './components/Favourites'
import House from './components/House'
import ReactTest from './components/ReactTest'
import JSXLiveCompiler from './components/JSXLiveCompiler'

export const routes = (
  <div>
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/propertySearch' component={PropertySearch} />
        <Route path='/houseDetails' component={House} />
        <Route path='/favourites' component={Favourites} />
        <Route path='/favourites/:number' component={House} />
        <Route path='/react-test' component={ReactTest} />
        <Route path='/jsx' component={JSXLiveCompiler} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)
