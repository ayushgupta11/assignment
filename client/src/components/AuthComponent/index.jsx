import React, { Component } from 'react'
import Login from './Login'
import Signup from './Signup'
import { post } from '@utils/makeRequest'
import setcookie from '@utils/setcookie'
import { notification } from 'antd'

export default class AuthComponent extends Component {
    constructor(){
        super()
        this.state = {
            current: 'login',
            isLoading: false
        }
    }
    loginUser = (values) => {
        this.toggleLoading()
        post('user/login', {
            data: values
        }).then((response) => {
            this.toggleLoading()
            if(!response.data.error){
                setcookie('access_token', response.data.data.token, 2)
                this.props.history.push('/')
            }
        }).catch((error) => {
            this.toggleLoading()
            console.log(error)
            notification.error({
                message: 'Error',
                description: error.response.data.data
            })
        })
    }
    signupUser = (values) => {
        this.toggleLoading()
        post('user/signup', {
            data: values
        }).then((response) => {
            this.toggleLoading()
            if(!response.data.error){
                setcookie('access_token', response.data.data.token, 2)
                this.props.history.push('/')
            }
        }).catch((error) => {
            this.toggleLoading()
            console.log(error)
            notification.error({
                message: 'Error',
                description: error.response.data.data
            })
        })
    }
    toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        })
    }
    openSignup = () => {
        this.setState({
            current: 'signup'
        })
    }
    openLogin = () => {
        this.setState({
            current: 'login'
        })
    }
    render() {
        return (
            <div className="auth-container">
                <div className="form-container">
                    {
                        this.state.current == 'login'?
                        <Login 
                            loginUser={this.loginUser} 
                            isLoading={this.state.isLoading} 
                            openSignup={this.openSignup} 
                        />
                        :
                        <Signup 
                            signupUser={this.signupUser} 
                            isLoading={this.state.isLoading} 
                            openLogin={this.openLogin}
                        />
                    }
                </div>
                <div className="showcase-container">
                    <div>Showcase</div>
                </div>
            </div>
        )
    }
}