import React, { Component } from 'react'
import './styles.scss'

import $ from 'jquery'

export default class HousesList extends Component {
  constructor(props) {
      super(props);
      this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
      this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }
  onBtnClickHandler = e => {
      e.preventDefault();
      this.props.getHousesMore({});
  }
  onItemClickHandler = e => {
      e.preventDefault();
      
      let el = $(e.target).is('.house-item') ? $(e.target)  : $(e.target).parents('.house-item');
      let number = el.attr('data-number');

      this.props.getHousesDetails({number});
  }
  render() {
    const searchItems = this.props.housesList.data.map((house, index) =>
        <div className='house-item' key={index} data-number={index} onClick={this.onItemClickHandler}>
          <div className='house-image'><img src={house.thumb_url} /></div>
          <div className='house-text'>{house.title}</div>
        </div>
    );
    
    return (
        <div className='HousesList-container'>
          <h4 className='align-center'>{this.props.housesList.data.length} of {this.props.housesList.total_results} matches</h4>
          <div className='HousesList'>
           {searchItems}
              {
                  this.props.housesList.data.length < this.props.housesList.total_results &&
                  <div className='show-more-btn-container align-center'>
                      <button
                          disabled={this.props.isUploading}
                          className='show-more-btn' 
                          onClick={this.onBtnClickHandler}>SHOW MORE</button>
                      {
                          this.props.isUploading &&
                          <img className='spinner' src='../src/images/loading.gif' />
                      }
                  </div>
              }
          </div>

        </div>
    )
  }
}
