import React, { Component } from 'react'
import { Link } from 'react-router'

import './styles.scss'

export default class NavLink extends Component {
  render() {
    return <Link activeClassName='active'
                 {...this.props}
                 activeStyle={{color: 'green'}} /> // now you can assign other activeClassName in NavLink
  }
}

/*
// equal
var AppLink = function(props) {
  return <Link {...props} activeClassName='active' />;
}*/
