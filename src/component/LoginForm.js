import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';


class LoginForm extends React.Component {
    state = {
        redirect: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    axios
                        .post('/api/login', {
                        email: values.email,
                        password: values.password
                    })
                        .then(({data}) => {
                            console.log(data);
                            if(data.err){
                              message.error(data.msg);
                            }
                            else{
                              localStorage.setItem('token',data.token);
                              this.setState({redirect: true})
                            }
                        })
                }

            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/home'/>;
        }
        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]
                    })(
                        <Input
                            prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                            placeholder="Username"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input
                            prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                            type="password"
                            placeholder="Password"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or
                    <a href="/signup">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({name: 'normal_login'})(LoginForm);