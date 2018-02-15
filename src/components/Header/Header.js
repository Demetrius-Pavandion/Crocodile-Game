import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserForm from '../HomePage/UserForm';

class Header extends Component {
    state = { 
        activeItem: 'home',
        userName: '' 
    };

    componentDidMount() {
        this.props.socket.on('currentUser', ({ name }) => {
            this.setState({ userName: name })
        });
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.history.push(`/${name !== 'home' ? name : ''}`);
    } 

    handleChangeName = (name) => {
        this.props.socket.emit('changeName', name);
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu inverted>
                <Menu.Item 
                    active={activeItem === 'home'} 
                    onClick={this.handleItemClick}
                    name='home' 
                />
                <Menu.Item 
                    link
                    active={activeItem === 'about'} 
                    onClick={this.handleItemClick}
                    name='about' 
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <UserForm 
                            userName={this.state.userName} 
                            onNameChange={this.handleChangeName}
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;