import React, { Component } from 'react';
import { Segment, Form, Message } from 'semantic-ui-react';

class ParticipantPanel extends Component {
    handleChange = (e, { name, value }) => this.setState({ [name]: value});
    handleSubmit = () => this.props.onCheckAnswer(this.state.answer);

    render() {
        return(
            <Segment>
                <Form onSubmit={this.handleSubmit} error>
                    <Form.Input
                        required
                        disabled={!this.props.roundStarted}
                        name='answer'
                        placeholder='Enter your answer...'
                        onChange={this.handleChange}
                        action={{
                            content: 'Send',
                            type: 'submit'
                        }}
                    />
                    <Message
                        error
                        size='mini'
                        hidden={this.props.messageIsHidden}
                        header={this.props.message}
                    />
                </Form>
            </Segment>
        );
    }
}

export default ParticipantPanel;