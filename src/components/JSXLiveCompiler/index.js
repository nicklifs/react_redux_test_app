import React, { Component } from 'react'

import './styles.scss'

export default class JSXLiveCompiler extends Component {
  constructor() {
    super();
    this.state = {
      input: '/* add your jsx here */',
      output: '',
      err: ''
    }
  }
  update(e) {
    let code = e.target.value;
    try{
      this.setState({
        output: window.Babel.transform(code, {presets: ['react', 'es2015']}).code,
        err: ''
      })
    } catch(err) {
      this.setState({err: err.message})
    }
  }
  render() {

    return (
      <div>
        <div className='header'>{this.state.err}</div>
        <div className='JSXLiveCompiler'>
          <textarea
              onChange={this.update.bind(this)}
              defaultValue={this.state.input}
          />
          <pre>
            {this.state.output}
          </pre>
        </div>
      </div>
    )
  }
}