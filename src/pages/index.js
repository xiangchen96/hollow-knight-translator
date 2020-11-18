import React, { Component } from 'react'

import AllText from './all_text.json'
import Layout from '../components/layout'
import Flags from '../components/flags'

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
    const { inputText } = this.state
    if (inputText === '') {
      this.setState({ variables: [] })
    } else {
      const variables = []
      Object.entries(AllText).forEach(([lang, data]) => {
        Object.entries(data).forEach(([k, v]) => {
          if (variables.includes(k)) return
          if (!v) return
          if (v.toLowerCase().includes(inputText.toLowerCase()) || k.toLowerCase().includes(inputText.toLowerCase())) {
            variables.push(k)
          }
        })
      })
      variables.sort()
      this.setState({ variables }, () => this.searchText())
    }
  }

  searchText() {
    const { variables, selectedLanguages } = this.state
    let selectedVariable = this.state.selectedVariable || variables[0]

    let results = []
    if (variables.length === 0) {
      this.setState({ results })
    } else {
      Object.entries(AllText).forEach(([lang, data]) => {
        if (
          (selectedLanguages.size === 0 || selectedLanguages.has(lang)) &&
          selectedVariable in data
        ) {
          let text = data[selectedVariable]
          //TODO: replace <br>, <page>?
          results.push([lang, text])
        }
      })
      this.setState({ results })
    }
  }

  componentDidMount() {
    this._isMounted = true
    const inputText = getParameterByName('search')
    const selectedLanguages = new Set()
    const lang = getParameterByName('lang')
    if (lang)
      lang.split(',').forEach(x => x.length > 0 && selectedLanguages.add(x))
    if (inputText) {
      this.setState({ inputText, selectedLanguages }, () => {
        this.search()
      })
    }
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
    if (value === 'All') selectedLanguages.clear()
    else {
      if (selectedLanguages.has(value)) {
        selectedLanguages.delete(value)
      } else {
        selectedLanguages.add(value)
      }
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
    const { results, showAlert } = this.state
    const cards = []
    results.sort().forEach(([k, v]) => {
      if (!v) return
      v = v.trim()
      k = k.trim()
      cards.push(
        <div
          key={k + v}
          className="flex-grow sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2"
        >
          <div className="bg-gray-200 rounded px-2 py-2 shadow h-full">
            <div
              role="button"
              className="hover:bg-gray-400 hover:text-black text-gray-200 cursor-pointer px-2 rounded flex flex-row"
              onClick={() =>
                this.setState({ showAlert: true }, () => {
                  navigator.clipboard.writeText(v)
                  setTimeout(() => this.setState({ showAlert: false }), 1000)
                })
              }
            >
              {this.renderIcon(k)}
              <p className="px-1">{showAlert ? 'Copied!' : 'Copy text'}</p>
            </div>
            <p className="px-2 py-2 break-words">{v}</p>
          </div>
        </div>
      )
    })
    return <div className="flex flex-row flex-wrap">{cards}</div>
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
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={selectedVariable}
        required
        onChange={event => {
          this.setState({ selectedVariable: event.target.value }, () =>
            this.searchText()
          )
        }}
      >
        {options}
      </select>
    )
  }

  render() {
    const { inputText, selectedLanguages } = this.state
    return (
      <Layout>
        <div>
          <form>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="text"
            >
              Text to search for
            </label>
            <input
              id="search"
              type="text"
              name="search"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inputText}
              placeholder="Text"
              onChange={e => this.setState({ inputText: e.target.value })}
            />
            <input
              type="hidden"
              id="lang"
              name="lang"
              value={Array.from(selectedLanguages).sort()}
            />
          </form>
          <Flags
            onSelect={this.onSelect}
            selectedLanguages={selectedLanguages}
          />
          {this.renderSelector()}
          {this.renderResults()}
        </div>
      </Layout>
    )
  }
}
