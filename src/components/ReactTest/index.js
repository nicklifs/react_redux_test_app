import React from 'react'
import ReactDOM from 'react-dom';

//const App = () => <h1>Hello world</h1>;

export default class ReactTest extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is state txt',
      event: '---',
      a: null,
      b: null
    }
    this.updateTypeEvent = this.updateTypeEvent.bind(this);
  }
  update( e ) {
    this.setState({
      txt: e.target.value
    })
  }
  updateTypeEvent( e ) {
    this.setState({event: e.type})
  }
  updateRefs( ) {
    this.setState({
      a: this.a.refs.input.value, // ReactDOM.findDOMNode(this.a).value
      b: this.refs.b.value
    })
  }
  render () {
    //return <h1>Hello world..</h1>
    //return React.createElement('h1', null, 'Hello world...');

    let txt = this.props.txt;
    return (
        <div>
          <Title text='Title page'/>

          <h1>Hello world...</h1>
          <b>bold</b>
          <div>{txt}</div>
          <br/><br/>

          <Widget update={this.update.bind(this)} />
          <Widget update={this.update.bind(this)} />
          <h4>
            <div>state.txt:</div>
            {this.state.txt}
          </h4>

          <Button> I <Heart /> React</Button>


          <br/><br/>
          events:<br/>
                <textarea
                    onKeyPress={this.updateTypeEvent}
                    onCopy={this.updateTypeEvent}
                    onCut={this.updateTypeEvent}
                    onPaste={this.updateTypeEvent}
                    onFocus={this.updateTypeEvent}
                    onBlur={this.updateTypeEvent}
                    onDoubleClick={this.updateTypeEvent}
                    onTouchStart={this.updateTypeEvent}
                    onTouchMove={this.updateTypeEvent}
                    onTouchEnd={this.updateTypeEvent} />
          <h4>{this.state.event}</h4>


          <hr/>
          refs:<br/>
          <Input
              ref={component => this.a = component}
              update={this.updateRefs.bind(this)}
          /> {this.state.a}
          <hr/>
          <input ref='b' type='text'
                 onChange={this.updateRefs.bind(this)} /> {this.state.b}
          <hr/>


          <hr/>
          lifecycle:<br/>
          <WrapperLC />
          <hr/>
          <div id='lc2'><LC2 /></div>
          <hr/>

          <hr/>
          ArrayMap fetch:<br/>
          <ArrayMap />
          <hr/>

          <hr/>
          ExampleHOC:<br/>
          <ExampleHOC />
          <hr/>

          <br/><br/><br/><br/><br/><br/>

        </div>
    )
  }
}

ReactTest.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

ReactTest.defaultProps = {
  txt: 'default text'
}

class WrapperLC extends React.Component {
  mount() {
    ReactDOM.render(<LC />, document.getElementById('a'))
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }
  render() {
    return (
        <div>
          <button onClick={this.mount.bind(this)}>mount</button>
          <button onClick={this.unmount.bind(this)}>unmount</button>
          <div id='a'></div>
        </div>
    )
  }
}

class LC extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    }
    this.update = this.update.bind(this);
  }
  update() {
    this.setState({
      value: this.state.value + 1
    })
  }
  componentWillMount() {
    console.log('componentWillMount LC');
    this.setState({m: 2})
  }
  componentDidMount() {
    console.log('componentDidMount LC', ReactDOM.findDOMNode(this));
    this.inc = setInterval(this.update, 500)
  }
  render () {
    console.log('render LC');
    return <button onClick={this.update}>{this.state.value * this.state.m}</button>
  }
  componentWillUnmount() {
    console.log('componentWillUnmount LC');
    clearInterval(this.inc);
  }
}

class LC2 extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.state = {increasing: false}
  }
  update() {
    ReactDOM.render(<LC2 value={this.props.value + 1}/>, document.getElementById('lc2'))
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps LC2');
    this.setState({increasing: nextProps.value > this.props.value})
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate LC2', nextProps, nextState);
    return nextProps.value % 5 === 0;
  }
  render() {
    console.log('render LC2');
    return (
        <div>
          increasing: {this.state.increasing}
          <button
              onClick={this.update}>{this.props.value}</button>
        </div>
    )
  }
  componentDidUpdate(prevProps) { //prevProps, prevState
    console.log('ComponentDidUpdate LC2 prev value:', prevProps.value);
  }
}
LC2.defaultProps = {
  value: 0
}


class ArrayMap extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }
  componentWillMount() {
    fetch('http://swapi.co/api/people/?format=json')
        .then(response => response.json())
        .then(({results: items}) => this.setState({items}))
  }
  filter(e) {
    this.setState({
      filter: e.target.value
    })
  }
  render() {
    let items = this.state.items;
    if (this.state.filter){
      items = items.filter(item =>
          item.name.toLowerCase().includes(this.state.filter.toLowerCase())
      )
    }
    return (
        <div>
          <input type='text'
                 onChange={this.filter.bind(this)} />
          {/*<h5 key={index}>{item.name}</h5>*/}
          {items.map((item, index) =>
              <Person key={index} person={item} />
          )}
        </div>
    )
  }
}

const Person = (props) => <h5>{props.person.name}</h5>;

/*==============================================================*/
class ExampleHOC extends React.Component {
  render() {
    return (
        <div>
          {/*<label>label</label>*/}
          <hr/>
          <ButtonH>button</ButtonH><br/>
          <LabelHOC>label</LabelHOC>
        </div>
    )
  }
}

const HOC = (InnerComponent) => class extends React.Component {
  constructor() {
    super();
    this.state = {count: 0}
  }
  update() {
    this.setState({count: this.state.count + 1})
  }
  componentWillMount() {
    console.log('HOC will mount');
  }
  render() {
    return (
        <InnerComponent
            {...this.props}
            {...this.state}
            update={this.update.bind(this)}
        />
    )
  }
}

const ButtonH = HOC((props) =>
    <button onClick={props.update}>{props.children} - {props.count}</button>
)

class Label extends React.Component {
  componentWillMount() {
    console.log('label will mount');
  }
  render() {
    return (
        <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
    )
  }
}

const LabelHOC = HOC(Label);

/*==============================================================*/

class Input extends React.Component {
  render() {
    return <input ref='input' type='text' onChange={this.props.update} />
  }
}

const Widget = (props) =>
    <input type='text' onChange={props.update} />;

const Button = (props) => <button>{props.children}</button>;
const Heart = () => <span>&hearts;</span>;

const Title = (props) => <h1>Title: {props.text}</h1>;
Title.propTypes = {
  text(props, propName) { //props, propName, component
    if (!(propName in props)) {
      return new Error(`missing ${propName}`);
    }
    if (props[propName].length < 6) {
      return new Error(`${propName} was too short`);
    }
  }
}