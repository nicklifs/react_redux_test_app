import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import SearchList from '../../components/SearchList'
import HousesList from '../../components/HousesList'
import './styles.scss'

import * as SearchActions from '../../actions/SearchActions'
import * as HouseActions from '../../actions/HouseActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery'

export class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.onBtnGoClickHandler = this.onBtnGoClickHandler.bind(this);
    this.onBtnLocationClickHandler = this.onBtnLocationClickHandler.bind(this);
  }

  onBtnGoClickHandler = e => {
      e.preventDefault();
      this.props.actions.getHousesByLocation({location: this.textInput.value})
  }

  onBtnLocationClickHandler = e => {
      e.preventDefault();

      let locations = ['london', 'liverpool', 'leeds', 'reding', 'newyork', 'boston', 'dallas', ''];
      function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
      }
      let location = locations[getRandomInt(0, locations.length)];

      $('input.input').val(location);
      $('.go-btn').trigger('click');
  }

  render() {
    return (
      <div className='row mobile-block'>
        <NavLink className='faves-btn' to='/favourites'>Faves</NavLink>
        <h3 className='mobile-block__title'>House Search</h3>
        <div className='col-md-12 mobile-block__description'>Use the form below to search for houses to buy. You can search by place-name, postcode, or click 'My location', to search in your current location!</div>

        <form className='col-md-12 searchForm' onSubmit={this.handleSubmit}>
          <input type='text'
                 className='input'
                 placeholder='location'
                 defaultValue={this.props.searchPage.location}
                 ref={(input) => { this.textInput = input; }} />
          <button className='go-btn'
                  type='submit'
                  disabled={this.props.searchPage.goUploading}
                  onClick={this.onBtnGoClickHandler}>GO</button>
          {
              this.props.searchPage.goUploading &&
              <img className='spinner' src='../src/images/loading.gif' />
          }
          <button type='submit'
                  disabled={this.props.searchPage.goUploading}
                  onClick={this.onBtnLocationClickHandler}>My Location</button>
        </form>
          
          {
              this.props.searchPage.housesList.data.length == 0 &&
              this.props.searchPage.errorMessage == null &&
              this.props.searchPage.searchList.length > 0 &&

              <SearchList searchList={this.props.searchPage.searchList} />
          }

          {
              this.props.searchPage.housesList.data.length > 0 &&

              <HousesList 
                  housesList={this.props.searchPage.housesList} 
                  getHousesMore={this.props.actions.getHousesMore} 
                  getHousesDetails={this.props.actionsHouse.saveHouseForViewDetails}
                  isUploading={this.props.searchPage.showMoreUploading} />
          }

          {
              this.props.searchPage.errorMessage &&
              <div className='col-md-12 mt10'>{this.props.searchPage.errorMessage}</div>
          }
      </div>
    )
  }
}


function mapStateToProps(state) {
    return {
        searchPage: state.searchPage,
        currentHouse: state.currentHouse
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SearchActions, dispatch),
        actionsHouse: bindActionCreators(HouseActions, dispatch)
        /*actions: {
            SearchActions: bindActionCreators(SearchActions, dispatch),
            HouseActions: bindActionCreators(HouseActions, dispatch)
        }*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertySearch)
