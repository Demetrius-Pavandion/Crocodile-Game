import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';

class RoomList extends Component {
    render() {
        const { rooms, onJoinRoom } = this.props;
        return (
            <Segment>
                <List animated selection divided size='massive'>
                    {
                        rooms.length ?
                            rooms.map((room, i) =>
                                <List.Item key={i} onClick={() => onJoinRoom(room.name, room.maxPoints, room.roundDuration)}>
                                    <List.Icon name='users' />
                                    <List.Content>{room.name}</List.Content>
                                </List.Item>
                            )
                            : 'The list of rooms is empty'
                    }
                </List>
            </Segment>
        );
    }
}

export default RoomList;