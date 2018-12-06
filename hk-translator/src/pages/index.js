import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { withPrefix } from 'gatsby'

import Layout from '../components/layout'
import Flags from '../components/flags'

const VAR_PATTERN = /name="([^"]*)"/
const TEXT_PATTERN = />(.*)</

export default class IndexPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedLanguages: new Set(),
      inputText: '',
      outputText: '',
      variables: [],
    }
  }

  searchVariable() {
    const assets = this.assets
    const { inputText } = this.state
    if (inputText === "") {
      this.setState({ variables: [] })
    } else {
      const variables = []
      for (let i = 0; i < assets.length; i += 1) {
        if (assets[i].toLowerCase().includes(inputText.toLowerCase())) {
          let match = VAR_PATTERN.exec(assets[i])
          if (!match) console.log(assets[i]);
          if (match && match[1].length > 0 && variables.indexOf(match[1]) < 0) {
            variables.push(match[1])
          }
        }
      }
      console.log(variables)
      this.setState({variables}, () => this.searchText())
    }
  }


  searchText() {
    const assets = this.assets
    const { variables, selectedLanguages } = this.state
    console.log(selectedLanguages);
    let currentLanguage
    let outputText = ''
    if (variables.length === 0) {
      this.setState({ outputText: '' })
    } else {
      assets.forEach((line) => {
        if (line.startsWith("LANGUAGE")) {
          currentLanguage = line.substring(10)
        }
        if (line.includes(variables[0])) {
           if (selectedLanguages.size === 0 || selectedLanguages.has(currentLanguage)) {
              let match = TEXT_PATTERN.exec(line);
              if (match && match[1].length > 0) {
                outputText += `(${currentLanguage})`
                outputText += `\t${match[1]}\n\n`
              }
          }
        }
      })
      this.setState({ outputText })
    }
  }

  componentDidMount() {
    fetch(withPrefix('/trimmedAssets.txt'))
    .then((r) => r.text())
    .then(text  => {
      this.assets = text.split('\n')
    })
  }

  onSelect = (value) => {
    const { selectedLanguages } = this.state
    if (selectedLanguages.has(value)){
      selectedLanguages.delete(value)
    } else {
      selectedLanguages.add(value)
    }
    this.setState({ selectedLanguages }, this.searchText())
  }

  render() {
    const { outputText, inputText } = this.state
    return (
      <Layout>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <TextField
            inputProps={{
              spellCheck: false,
            }}
            style={{ width: '100%'}}
            label='Text to search for'
            onChange={(e) => this.setState({inputText: e.target.value})}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.searchVariable(inputText)
                ev.preventDefault();
              }
            }}
          />
          <Flags onSelect={this.onSelect} />
          <TextField
            inputProps={{
              spellCheck: false,
            }}
            style={{ width: '100%', height: '100%', marginTop: 30}}
            multiline={true}
            value={outputText}
            rows={40}
          />
        </div>
      </Layout>
    )
  }
}
