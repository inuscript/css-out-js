import React, { Component } from 'react';
import './App.css';
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import JSON5 from 'json5';
import mapKeys from 'lodash/mapKeys'
import flatMap from 'lodash/flatMap'

const first = `

`
const parseJsString = (jsStr) => {
  try{
    return JSON5.parse(jsStr)
  }catch(e){
    // wrap {}
    return JSON5.parse(`{${jsStr}}`)
  }
}

const appendClassPrefix = (js) => {
  return mapKeys(js, (v, k) => {
    return `.${k}`
  })
}

const flattenPseudo = (js) => {
  
}

const jsToCss = (input) => {
  let json = parseJsString(input)
  json = appendClassPrefix(json)
  return postcss()
    .process(json, {parser: postcssJs})
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
    jsToCss(input)
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
