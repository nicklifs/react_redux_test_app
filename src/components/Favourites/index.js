import React, { Component } from 'react'

import * as HouseActions from '../../actions/HouseActions'
import * as HouseFavsActions from '../../actions/HouseFavsActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './styles.scss'

import $ from 'jquery'

import {
    ROUTING
} from '../../constants/Routing'

export class Favourites extends Component {
  constructor(props) {
    super(props);
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }

  componentDidMount() {
    // test using context
    /*this.context.store.dispatch({
      type: 'TEST',
      payload: {}
    })*/
  }

  onItemClickHandler = e => {
    e.preventDefault();

    let el = $(e.target).is('.favs-item') ? $(e.target)  : $(e.target).parents('.favs-item');
    let number = el.attr('data-number');

    this.context.store.dispatch({
      type: ROUTING,
      payload: {
        method: 'push',
        nextUrl: '/favourites/' + number
      }
    })
  }

  render() {

    let favsItems = null;
    if (this.props.favHouses.length) {

      favsItems = this.props.favHouses.map((house, index) =>
          <div className='favs-item' key={index} data-number={index} onClick={this.onItemClickHandler}>
            <div className='favs-image'><img src={house.thumb_url} /></div>
            <div className='favs-content'>
              {house.price_formatted}<br/>
              {house.title}
            </div>
          </div>
      );
    } else {
      favsItems = <div className=''>You have not added any houses to your favourites</div>
    }

    return (
      <div className='row mobile-block'>
        <h3 className='mobile-block__title'>Favourites</h3>
        <div className='favsHouses'>{favsItems}</div>
      </div>
    )
  }
}

Favourites.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    currentHouse: state.currentHouse,
    favHouses: state.favHouses
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HouseActions, dispatch),
    actionsHouseFavs: bindActionCreators(HouseFavsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)
