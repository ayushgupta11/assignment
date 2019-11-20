import React, { Component } from 'react'
import { Layout, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import setcookie from '@utils/setcookie'

const { Header } = Layout

class MainHeader extends Component {
    render() {
        return (
            <Header className="header-container">
                <div>Welcome, {this.props.user.name}</div>
                <div>
                    <Button type="link" onClick={() => this.props.history.push('/')}>
                        Home
                    </Button>
                    <Button type="link" onClick={() => this.props.history.push('/timeline')}>
                        Timeline
                    </Button>
                    {
                        this.props.user.hasOwnProperty('_id')?
                        <Button type="link" onClick={() => {setcookie('access_token', '', 2); this.props.history.push('/auth')}}>
                            Logout
                        </Button>
                        : null
                    }
                </div>
            </Header>
        )
    }
}


export default withRouter(MainHeader)