import React, { Component } from 'react';

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({ search: evt.target.value })
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label>search</label>
            <input type="text" name='search' onChange={this.handleChange} />
          </div>
        </form>
      </div>
    )
  }
} 