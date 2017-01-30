import React, { Component } from 'react'
import NavLink from '../../components/NavLink'

export default class App extends Component {
    
    render() {

        return (
            <div className='container'>
                <ul className='nav nav-pills'>
                    <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
                    <li><NavLink to='/propertySearch'>House Search</NavLink></li>
                    <li><NavLink to='/favourites'>Favourites</NavLink></li>
                    <li><NavLink to='/react-test'>React Test</NavLink></li>
                    <li><NavLink to='/jsx'>JSXLiveCompiler</NavLink></li>
                    <li><NavLink to='/tests-jest'>Tests jest</NavLink></li>
                </ul>
                {this.props.children}
                {/*React.cloneElement(this.props.children, { searchList: this.props.searchList })*/}
            </div>
        )
    }
}

/*
* !!!!! this.props.children return array || object (array - if count children > 1)
*
* let items = React.Children.forEach(this.props.children, child => child)
* let items = React.Children.map(this.props.children, fn)
* let items = React.Children.toArray(this.props.children)
*
* React.Children.only() - return single object always
*
* let fn = child => React.cloneElement(child, {
*   onClick: this.selectItem.bind(this, child.props.value);
* }
* let items = React.Children.map(this.props.children, fn)
*
* */