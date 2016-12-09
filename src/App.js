import React, { Component } from 'react';
import './App.css';
import JSON5 from 'json5';
import jsOutCss from './js-out-css'

const first = `
balloon: {
  fontSize: "12px",
  ":after": {
    top: "100%",
    content: '" "',
  },
  ":before": {
    top: "200%",
    content: '" "',
  }
},
foo: {
  color: "red"
}
`
const parseJsString = (jsStr) => {
  try{
    return JSON5.parse(jsStr)
  }catch(e){
    // wrap {}
    return JSON5.parse(`{${jsStr}}`)
  }
}



class Result extends Component{
  state = { css: "" }
  componentWillMount(){
    this.update(this.props.input)
  }
  componentWillReceiveProps({input}){
    this.update(input)
  }
  update(input){
    let json = parseJsString(input)
    jsOutCss(json)
      .then( (result) => {
        this.setState({css: result.css})
      })
  }
  render(){
    return <pre className={"result"}>
      <code>{this.state.css}</code>
    </pre>
  }
}

class App extends Component {
  state = {
    input: first
  }
  render() {
    return (
      <div className="App">
        <textarea className="input"
          placeholder={`{input: "your css js"}`}
          value={this.state.input}
          onChange={(e) => this.setState({input: e.target.value })}
        />
        <Result input={this.state.input} />
      </div>
    );
  }
}

export default App;
