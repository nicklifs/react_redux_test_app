import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import { connect } from 'react-redux'

import * as SearchActions from '../../actions/SearchActions'
import * as HouseActions from '../../actions/HouseActions'
import { bindActionCreators } from 'redux'

export class App extends Component {
    constructor(props) {
        super(props);
    }
    /*componentDidMount() {
        //console.log('output2', this.props);
    }*/
    render() {

        console.log('get context app render', this.context, this)
        return (
            <div className='container'>
                <ul className='nav nav-pills'>
                    <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
                    <li><NavLink to='/propertySearch'>House Search</NavLink></li>
                    <li><NavLink to='/favourites'>Favourites</NavLink></li>
                </ul>
                {this.props.children}
                {/*React.cloneElement(this.props.children, { searchList: this.props.searchList })*/}
            </div>
        )
    }
}

/*App.contextTypes = {
    store: React.PropTypes.object
};*/

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)