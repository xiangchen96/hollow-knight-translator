import React, { Component } from 'react'

import Flag from './flag'

export default class Flags extends Component {
  render() {
    const { onSelect, selectedLanguages } = this.props
    const langs = [
      'JP',
      'FR',
      'RU',
      'PT',
      'SC',
      'ES',
      'KO',
      'IT',
      'JA',
      'DE',
      'EN',
      'BP',
      'ZH',
    ]
    langs.sort()
    langs.unshift('All')
    return (
      <div className="flex flex-row flex-wrap w-full justify-start py-2">
        {langs.map(k => (
          <Flag
            key={k}
            value={k}
            onSelect={onSelect}
            selectedLanguages={selectedLanguages}
          />
        ))}
      </div>
    )
  }
}
