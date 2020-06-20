import React, { Component } from 'react'

import Flag from './flag'

export default class Flags extends Component {
  render() {
    const { onSelect } = this.props
    return (
      <div class="flex flex-row flex-wrap w-full justify-start flex-wrap py-2">
        <Flag value="JP" onSelect={onSelect} />
        <Flag value="FR" onSelect={onSelect} />
        <Flag value="RU" onSelect={onSelect} />
        <Flag value="PT" onSelect={onSelect} />
        <Flag value="SC" onSelect={onSelect} />
        <Flag value="ES" onSelect={onSelect} />
        <Flag value="KO" onSelect={onSelect} />
        <Flag value="IT" onSelect={onSelect} />
        <Flag value="JA" onSelect={onSelect} />
        <Flag value="DE" onSelect={onSelect} />
        <Flag value="EN" onSelect={onSelect} />
        <Flag value="BP" onSelect={onSelect} />
        <Flag value="ZH" onSelect={onSelect} />
      </div>
    )
  }
}
