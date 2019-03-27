import React from 'react';
import axios from 'axios';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Checkbox,
    Button,
    message
} from 'antd';

const {TextArea} = Input;

class SignupForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    axios
                        .post('/api/signup', {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        address: values.address,
                        website: values.website
                    })
                        .then(({data}) => {
                            console.log(data);
                            message.success(data.msg);
                        })
                }
            });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            }, {
                                required: true,
                                message: 'Please input your E-mail!'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Password">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!'
                            }, {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input type="password"/>)}
                </Form.Item>
                <Form.Item label="Confirm Password">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            }, {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item
                    label={(
                    <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                    </span>
                )}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Address">
                    {getFieldDecorator('address', {
                        rules: [
                            {
                                type: 'string',
                                required: true,
                                message: 'Please select your habitual residence!'
                            }
                        ]
                    })(
                        <TextArea rows={4}></TextArea>
                    )}
                </Form.Item>

                <Form.Item label="Website">
                    {getFieldDecorator('website', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input website!'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {valuePropName: 'checked'})(
                        <Checkbox>I have read the agreement
                        </Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({name: 'register'})(SignupForm);
