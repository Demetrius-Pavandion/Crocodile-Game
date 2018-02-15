import React, { Component } from 'react';
import { Button, Modal, Form, Input, Label, Icon } from 'semantic-ui-react';

class UserForm extends Component {
    state = { 
        isOpen: false
    };
    
    handleOpen = () => this.setState({ isOpen: true });
    handleClose = () => this.setState({ isOpen: false });
    handleChange = (e, { name, value }) => this.setState({ [name]: value});
    handleFocus = (el) => el ? el.focus() : null;
    
    handleSubmit = () => {
        this.props.onNameChange(this.state.userName);
        this.setState({ isOpen: false });
    } 

    render() {
        return (
            <div>
                <Label as='a' onClick={this.handleOpen} size='large'>
                    <Icon name='user' />{`${this.props.userName}`}
                </Label> 
                <Modal
                    size='mini'
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Header>Change user name</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    ref={this.handleFocus}
                                    required
                                    placeholder='Enter user name...'
                                    name='userName'
                                    value = {this.state.userName}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Button type='submit'>Change</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
            
        );
    }
} 

export default UserForm;