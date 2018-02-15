import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomForm from './RoomForm';

class HomePage extends Component {
    state = {
        rooms: [] 
    }

    componentDidMount() {
        this.props.socket.on('rooms', (rooms) => {
            this.setState({ rooms })
        });

        this.props.socket.emit('getRooms');
    }

    handleRoomCreation = (room, maxPoints, roundDuration) => {
        if (this.state.rooms.includes(room)) {
            return; // add some warning to user
        }

        this.handleJoinRoom(room, maxPoints, roundDuration);
    } 

    handleJoinRoom = (room, maxPoints, roundDuration) => {
        this.props.history.push(`/room/${room}/${maxPoints}/${roundDuration}`);
    } 

    render() {
        return (
            <div>
                <RoomForm onCreate={this.handleRoomCreation} />
                <RoomList 
                    rooms={this.state.rooms} 
                    onAdd={this.handleClick} 
                    onJoinRoom={this.handleJoinRoom}
                />
            </div>
        );
    }
}

export default HomePage;