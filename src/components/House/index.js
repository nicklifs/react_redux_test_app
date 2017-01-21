import React, { Component } from 'react'

import * as HouseActions from '../../actions/HouseActions'
import * as HouseFavsActions from '../../actions/HouseFavsActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import $ from 'jquery'

export class House extends Component {
  constructor(props) {
    super(props);
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);

    this.state = {house: null};
  }
  onBtnClickHandler = e => {
    e.preventDefault();

    if (this.state.house) {

        let action = $(e.target).attr('data-action');
        if (action == 'add') {
            this.props.actionsHouseFavs.addHouseToFavs({house: this.state.house});
        } else if (action == 'remove') {
            this.props.actionsHouseFavs.removeHouseFromFavs({house: this.state.house});
        }
    } else {

      console.log('unknown house');
    }
  }
  componentWillMount() {

      let house = null;
      let number = parseInt(this.props.routeParams.number);
      if (this.props.route.path == '/favourites/:number') {
          if (number >= 0 && number <= this.props.favHouses.length) {
              house = this.props.favHouses[number];
          }
      } else if (this.props.route.path == '/houseDetails') {
          house = this.props.currentHouse;
      }

      if (house) {
          this.setState({house: house});
      }
  }
  componentDidMount() {
      console.log('component mount', this.props);

      const {store} = this.context;

      this.unsubscribe = store.subscribe(() => {
          console.log('forceUpdate');
          this.forceUpdate()
      })
      // test using context
      this.props.dispatch({
          type: 'TEST',
          payload: {}
      })
  }
  componentWillUnmount() {
      console.log('component unmount');
      this.unsubscribe();
  }
  componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps - nextProps', nextProps, 'current fav:', this.props.currentHouse.fav);
  }
  shouldComponentUpdate(nextProps, nextState) {
      console.log('shouldComponentUpdate - nextProps|nextState', nextProps, nextState, 'current fav:', this.props.currentHouse.fav);
      return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate - nextProps|nextState', nextProps, nextState)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate - prevProps|prevState', prevProps, prevState)
  }
  render() {

    let description;
    let house = this.state.house;

    if (house) {

      description = <div className='col-md-12'>
          <h4>{house.price_formatted}</h4>
          <h5>{house.title}</h5>
          <div className='house-image'><img src={house.img_url} /></div>
          <div className='mt10'>bed: {house.bedroom_number} <br/></div>
          bathroom: {house.bathroom_number} <br/>
          <div className='mt10'>bed: {house.summary}</div>
          <a className='mt10 display-block' target='_blank' href={house.lister_url}>SHOW MORE (link to origin site)</a>
        </div>;
    } else {
      description = <div className='col-md-12'>not found</div>;
    }

    return (
      <div className='row mobile-block'>
        {
          house &&
          <button onClick={this.onBtnClickHandler}
                  data-action={house.fav ? 'remove' : 'add'}
                  className='fr mr10'>{house.fav ? '-' : '+'}</button>
        }
        <h3 className='mobile-block__title'>House details</h3>
        {description}
      </div>
    )
  }
}

House.contextTypes = {
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
    actionsHouseFavs: bindActionCreators(HouseFavsActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)
// export default connect ()(House) || export default connect (mapStateToProps)(House) ->
// dispatch AVAILABLE in component House (this.props.dispatch)