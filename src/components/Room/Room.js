import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import UserList from './UserList';
import ChatBox from './ChatBox';
import DrawingBoard from '../DrawingBoard';
import GamePanel from '../GamePanel';

class Room extends Component {
    state = {
        room: {},
        user: {},
        users: [],
        messages: [],
        drawingData: {}
    }

    componentDidMount() {
        const { match, socket } = this.props;
        const { id, maxPoints, roundDuration } = match.params;

        socket.on('users', (users) => this.setState({ users }));
        socket.on('currentUser', (user) => this.setState({ user }));
        socket.on('message', (msg) => this.setState({ messages: [...this.state.messages, msg] }));

        this.setState({ room: { name: id, maxPoints, roundDuration }}, () => {
            socket.emit('joinRoom', id, +maxPoints, +roundDuration);
        });
    }

    componentWillUnmount() {
        this.props.socket.emit('leaveRoom', this.state.room.name);
    }

    handleSubmitMessage = (msg) => {
        this.props.socket.emit('sendMessage', this.state.room.name, msg);
    }

    render() {
        const { room, user, users, messages} = this.state;
        return (
            <Grid columns={2}>
                <Grid.Row stretched>
                    <Grid.Column width={10}>
                        <DrawingBoard
                            socket={this.props.socket}
                            room={room}
                            user={user}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <UserList users={users} />
                        <ChatBox
                            messages={messages}
                            onSubmit={this.handleSubmitMessage}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <GamePanel
                            socket={this.props.socket}
                            user={user}
                            room={room}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Room;