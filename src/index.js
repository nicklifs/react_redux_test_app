import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
//import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { routes } from './routes'

const store = configureStore()

class ProviderCustom extends React.Component {
    getChildContext() {
        return {
            store: this.props.store
        };
    }
    render() {
        return this.props.children;
    }
}
ProviderCustom.childContextTypes = {
    store: React.PropTypes.object
}

render(
    <ProviderCustom store={store}>
        <Router history={browserHistory} routes={routes} />
    </ProviderCustom>,
    document.getElementById('root')
)

// subscribe store
const showStoreState = () => {
    console.log('store', store.getState());
};
store.subscribe(showStoreState);
showStoreState();
/*store.subscribe(() => {
    console.log('subscribe', store.getState());
})*/

