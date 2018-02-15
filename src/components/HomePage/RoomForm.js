import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';

class RoomForm extends Component {
    state = { 
        isOpen: false,
        maxPoints: 5,
        roundDuration: 2
    };
    
    handleOpen = () => this.setState({ isOpen: true });
    handleClose = () => this.setState({ isOpen: false });
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value})
    } ;
    handleFocus = (el) => el ? el.focus() : null;
    
    handleSubmit = () => {
        const { maxPoints, roundDuration } = this.state;
        this.props.onCreate(this.state.room, maxPoints, roundDuration);
        this.setState({ isOpen: false });
    } 

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen}>New Room</Button>
                <Modal
                    size='mini'
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Header>Create room</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    ref={this.handleFocus}
                                    required
                                    placeholder='Room name'
                                    name='room'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Group>
                                <Form.Field
                                    control={NumericInput}
                                    name='maxPoints'
                                    label='Max points'
                                    min={1}
                                    max={10}
                                    value={this.state.maxPoints}
                                    onChange={(e) => this.setState({maxPoints: e})}
                                />
                                <Form.Field
                                    control={NumericInput}
                                    name='roundDuration'
                                    label='Round duration'
                                    min={1}
                                    max={5}
                                    value={this.state.roundDuration}
                                    onChange={(e) => this.setState({roundDuration: e})}
                                />
                            </Form.Group>
                            <Button type='submit'>Create</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
} 

export default RoomForm;