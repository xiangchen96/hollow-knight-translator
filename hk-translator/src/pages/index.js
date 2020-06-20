import React, { Component } from 'react'
import {
  TextField,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core'
import NativeSelect from '@material-ui/core/NativeSelect'
import { withPrefix } from 'gatsby'

import Layout from '../components/layout'
import Flags from '../components/flags'

const VAR_PATTERN = /name="([^"]*)"/
const TEXT_PATTERN = />(.*)</

function getParameterByName(name, url) {
  if (!url) url = window.location.href

  name = name.replace(/[[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)

  if (!results) return null
  if (!results[2]) return ''

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguages: new Set(),
      inputText: '',
      results: [],
      variables: [],
      selectedVariable: '',
      showAlert: false,
    }
  }

  search() {
    const assets = this.assets
    if (!assets) return
    const { inputText } = this.state
    if (inputText === '') {
      this.setState({ variables: [] })
    } else {
      const variables = []
      for (let i = 0; i < assets.length; i += 1) {
        if (assets[i].toLowerCase().includes(inputText.toLowerCase())) {
          let match = VAR_PATTERN.exec(assets[i])
          if (
            match &&
            match[1].length > 0 &&
            variables.indexOf(match[1]) < 0 &&
            match[1].toUpperCase() === match[1]
          ) {
            variables.push(match[1])
          }
        }
      }
      variables.sort(a => a.length)
      this.setState({ variables }, () => this.searchText())
    }
  }

  searchText() {
    const assets = this.assets
    const { variables, selectedLanguages } = this.state
    let selectedVariable = this.state.selectedVariable || variables[0]

    let currentLanguage
    let results = []
    if (variables.length === 0) {
      this.setState({ results })
    } else {
      assets.forEach(line => {
        if (line.startsWith('LANGUAGE')) {
          currentLanguage = line.substring(10).trim()
        }
        if (line.includes(`"${selectedVariable}"`)) {
          if (
            selectedLanguages.size === 0 ||
            selectedLanguages.has(currentLanguage)
          ) {
            let match = TEXT_PATTERN.exec(line)
            if (match && match[1].length > 0) {
              let text = `\t${match[1]}\n\n`
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, '')
              results.push([currentLanguage, text])
            }
          }
        }
      })
      this.setState({ results })
    }
  }

  componentDidMount() {
    this._isMounted = true
    fetch(withPrefix('/trimmedAssets.txt'))
      .then(r => r.text())
      .then(text => {
        this.assets = text.split('\n')
        const inputText = getParameterByName('search')
        if (inputText) {
          this.setState({ inputText }, () => {
            this.search()
          })
        }
      })
    window.onpopstate = () => {
      if (this._isMounted && window.location.href.includes('search=')) {
        const inputText = window.location.href.split('search=')[1]
        this.setState({ inputText, selectedVariable: '' }, () => {
          this.search()
        })
      }
    }
  }

  onSelect = value => {
    const { selectedLanguages } = this.state
    if (selectedLanguages.has(value)) {
      selectedLanguages.delete(value)
    } else {
      selectedLanguages.add(value)
    }
    this.setState({ selectedLanguages }, this.searchText())
  }

  renderIcon = value => {
    const lowerCaseSuffix = ['JP', 'FR', 'RU', 'PT', 'ES', 'IT', 'DE']
    let flagSuffix
    if (lowerCaseSuffix.indexOf(value) >= 0) {
      flagSuffix = value.toLowerCase()
    } else {
      switch (value) {
        case 'SC':
          flagSuffix = 'cn'
          break
        case 'KO':
          flagSuffix = 'kr'
          break
        case 'JA':
          flagSuffix = 'jp'
          break
        case 'EN':
          flagSuffix = 'gb'
          break
        case 'BP':
          flagSuffix = 'br'
          break
        case 'ZH':
          flagSuffix = 'cn'
          break
        default:
          flagSuffix = 'cn'
      }
    }
    return <span className={`flag-icon flag-icon-${flagSuffix}`} />
  }

  renderResults = () => {
    const { results } = this.state
    const cards = []
    results.forEach(([k, v]) => {
      v = v.trim()
      k = k.trim()
      cards.push(
        <Card style={{ margin: 10, width: 200 }}>
          <CardContent>
            <CardActionArea
              onClick={() =>
                this.setState({ showAlert: true }, () => {
                  navigator.clipboard.writeText(v)
                  setTimeout(() => this.setState({ showAlert: false }), 1000)
                })
              }
            >
              <div style={{ display: 'flex' }}>
                {this.renderIcon(k)}
                <Typography style={{ marginLeft: 10 }}>{k}</Typography>
              </div>
            </CardActionArea>
            <hr />
            <Typography>{v}</Typography>
          </CardContent>
        </Card>
      )
    })
    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{cards}</div>
  }

  renderSelector = () => {
    const { variables, selectedVariable } = this.state
    let options = []
    variables.forEach(a => {
      options.push(
        <option key={a} value={a}>
          {a}
        </option>
      )
    })
    return (
      <NativeSelect
        value={selectedVariable}
        style={{
          marginTop: 20,
        }}
        required
        onChange={event => {
          this.setState({ selectedVariable: event.target.value }, () =>
            this.searchText()
          )
        }}
      >
        {options}
      </NativeSelect>
    )
  }

  render() {
    const { inputText, showAlert } = this.state
    return (
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            inputProps={{ spellCheck: false }}
            value={inputText}
            style={{ width: '100%' }}
            label="Text to search for"
            onChange={e => this.setState({ inputText: e.target.value })}
            onBlur={() => {
              let newurl = window.location.protocol + '//'
              newurl += window.location.host + window.location.pathname
              newurl += `?search=${inputText}`
              if (newurl !== window.location.href) {
                window.history.pushState({ path: newurl }, '', newurl)
                this.setState({ selectedVariable: '' }, () => this.search())
              }
            }}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                let newurl = window.location.protocol + '//'
                newurl += window.location.host + window.location.pathname
                newurl += `?search=${inputText}`
                if (newurl !== window.location.href) {
                  window.history.pushState({ path: newurl }, '', newurl)
                  this.setState({ selectedVariable: '' }, () => this.search())
                }
                ev.preventDefault()
              }
            }}
          />
          <Flags onSelect={this.onSelect} />
          {this.renderSelector()}
          {!showAlert && <Typography style={{ height: 20 }}></Typography>}
          {showAlert && <Typography style={{ height: 20 }}>Copied!</Typography>}
          {this.renderResults()}
        </div>
      </Layout>
    )
  }
}
