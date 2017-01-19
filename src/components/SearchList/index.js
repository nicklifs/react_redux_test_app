import React, { Component } from 'react'
import './styles.scss'
import $ from 'jquery'

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    this.onSearchItemClickHandler = this.onSearchItemClickHandler.bind(this);
  }
  onSearchItemClickHandler = e => {
    e.preventDefault();

    $('input.input').val($(e.target).parents('.search-item').find('.search-text').text());
    $('.go-btn').trigger('click');
  }
  render() {
    const searchItems = this.props.searchList.map((search, index) =>
        <div className='search-item' key={index} onClick={this.onSearchItemClickHandler}>
          <div className='search-text'>{search.text}</div>
          <div className='search-count'>({search.count})</div>
        </div>
    );
    
    return (
        <div className='SearchList-container col-md-12 mt10'>
          Recent searches:
          <div className='SearchList'>
           {searchItems}
          </div>
        </div>
    )
  }
}
