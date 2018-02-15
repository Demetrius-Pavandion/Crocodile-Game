import React, { Component } from 'react';
import { Segment, Form, Icon, Comment } from 'semantic-ui-react';

class ChatBox extends Component {
    state = {
        message: ''
    }

    componentDidUpdate() {
        this.scrollBottom();
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    handleSubmit = () => {
        if (this.state.message === '') {
            return;
        }

        this.props.onSubmit(this.state.message);
        this.setState({ message: '' });
    }

    scrollBottom = () => {
        const { messageList } = this.refs;

        if (!messageList) {
            return;
        }

        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {
        return (
            <Segment.Group>
                <Segment>
                    <Comment.Group size='small'>
                        <div
                            ref='messageList'
                            style={{ height: 170, overflowY: 'scroll' }}
                        >
                            {
                                this.props.messages.map(({ message, userName }, i) => (
                                    <Comment key={i}>
                                        <Icon name='user' />
                                        <Comment.Author as='a'>{userName}</Comment.Author>
                                        <Comment.Text>{message}</Comment.Text>
                                    </Comment>
                                ))
                            }
                        </div>
                    </Comment.Group>
                </Segment>
                <Segment>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            name='message'
                            value={this.state.message}
                            placeholder='Enter a message...'
                            onChange={this.handleChange}
                            action={{
                                content: 'Send',
                                type: 'submit'
                            }}
                        />
                    </Form>
                </Segment>
            </Segment.Group>
        );
    }
}

export default ChatBox;