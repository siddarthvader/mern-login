import React from 'react';
import {Menu, Icon, Spin} from 'antd';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {
    state = {
        current: 'home',
        loading: true
    }
    componentDidMount(){
      if (localStorage.getItem('token')) {
        this.setState({loading: true})
        axios
            .get('/api/validatetoken', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                if (data.err) {
                    this.setState({redirect: true})
                }
                this.setState({loading: false})

            })
    } else {
        this.setState({redirect: true});
        this.setState({loading: false})

    }
    }
    handleClick = (e) => {
        if (e.key === 'logout') {
            localStorage.removeItem('token');
            this.setState({redirect: true})
        }
        this.setState({current: e.key});
    }
    render() {
        const {redirect, loading} = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        if (loading) {
            return <div>
                <Spin/>
            </div>
        }
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode='horizontal'>
                <Menu.Item key="home">
                    <Icon type="home"/>Home
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout"/>Logout
                </Menu.Item>
                <Menu.Item key="portoflio">
                    <a href="http://siddharthjain.in" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default Home;