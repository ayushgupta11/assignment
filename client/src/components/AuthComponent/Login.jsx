import React, { Component } from 'react'
import { Form, Input, Button, Icon } from 'antd'

class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.props.loginUser(values)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <h1>Login</h1>
                <span>Don't have an account? <a onClick={this.props.openSignup}>Create your account</a> ,it takes less than a minute.</span>
                <div className="main-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your Email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button loading={this.props.isLoading} size="large" shape="round" type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </React.Fragment>
        )
    }
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(Login)

export default WrappedLoginForm