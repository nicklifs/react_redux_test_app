import React, { Component, PropTypes } from 'react'
import Wellcome from './../Wellcome'

export default class Home extends Component {
    onChangeUsername(e) {
        this.props.changeUsername(e.target.value);
    }

    render() {
        return (
            <section className='home'>
                <h1>Home</h1>
                <Wellcome username={this.props.username} />
                <input
                    type="text"
                    name="username"
                    value={this.props.username}
                    onChange={this.onChangeUsername.bind(this)}
                />
            </section>
        )
    }
}

Home.propTypes = {
    changeUsername: PropTypes.func.isRequired
}