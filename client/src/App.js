import React, { Component } from 'react'
import './App.scss';
import Routes from './routes'
import { getAuth } from '@utils/makeRequest'
import getcookie from '@utils/getcookie'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loadRouter: false
    }
  }
  componentDidMount() {
    if (getcookie('access_token') != '') {
      getAuth('authenticate').then((response) => {
        this.props.history.push('/')
        this.setState({
          loadRouter: true
        })
      }).catch((error) => {
        this.props.history.push('/auth')
        this.setState({
          loadRouter: true
        })
      })
    }
    else {
      this.props.history.push('/auth')
      this.setState({
        loadRouter: true
      })
    }
  }
  render() {
    return (
      <div className="App">
        {
          this.state.loadRouter ?
            <Routes />
            : null
        }
      </div>
    )
  }
}