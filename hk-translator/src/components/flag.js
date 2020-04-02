import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox'

export default class Flag extends Component {
  state = {
    checked: false,
  }

  renderIcon() {
    const { value } = this.props
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
    const className = `flag-icon flag-icon-${flagSuffix}`
    return <span className={className} />
  }

  render() {
    const { value, onSelect } = this.props
    const { checked } = this.state
    return (
      <div
        role="button"
        style={{
          display: 'flex',
          maxHeight: 22,
          maxWidth: 100,
          marginTop: 30,
          cursor: 'pointer',
        }}
        onClick={() => {
          this.setState({ checked: !checked })
          onSelect(value)
        }}
      >
        <Checkbox value={value} checked={checked} />
        {this.renderIcon()}
        <p>{value}</p>
      </div>
    )
  }
}
