import React, { Component } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { Layout } from 'antd'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '@actions/userAction'

const { Content } = Layout

class MainContainer extends Component {
    componentDidMount(){
        this.props.actions.getUser()
    }
    render() {
        return (
            <Layout>
                <Header
                    user={this.props.user}
                />
                <Content>
                    {this.props.children}
                </Content>
                {/* <Footer /> */}
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        actions: bindActionCreators({
            getUser
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)