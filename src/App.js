import React, { Component } from 'react';
import './App.css';
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import JSON5 from 'json5';

const jsToCss = (input) => {
  const json = JSON5.parse(input)
  return postcss()
    .process(json, {parser: postcssJs})
}

class Result extends Component{
  state = { css: "" }
  componentWillReceiveProps({input}){
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
    input: ""
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
