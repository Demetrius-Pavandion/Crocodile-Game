import React, { Component } from 'react';
import { SegmentGroup, Modal } from 'semantic-ui-react';

import PresenterPanel from './PresenterPanel';
import ParticipantPanel from './ParticipantPanel';
import Timer from './Timer';
import RoomInfo from '../Room/RoomInfo';

class GamePanel extends Component {
    state = {
        message: '',
        messageIsHidden: true,
        modalIsOpen: false,
        modalMessage: '',
        roundStarted: false,
        timer: {
            minutes: 0,
            seconds: 0
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.on('sendWordToPresenter',(word) => this.setState({ word, roundStarted: true }));
        socket.on('roundStarted', (modalMessage) => {
            this.setState({ 
                modalMessage, 
                modalIsOpen: true,
                roundStarted: true
            });
        });
        socket.on('wrongAnswer', (message) => {
            this.setState({ 
                messageIsHidden: false,
                message
            });
        });
        socket.on('roundEnded', (modalMessage) => {
            this.setState({
                modalMessage,
                modalIsOpen: true,
                roundStarted: false, 
                timer: {
                    minutes: 0,
                    seconds: 0
                }
            });
        });
        socket.on('timer', (timer) => {
            this.setState({ timer })
        });
    }
    
    handleChangeWord = () => this.props.socket.emit('changeWord');
    handleStartRound = () => this.props.socket.emit('startRound');
    handleCheckAnswer = (word) => this.props.socket.emit('checkAnswer', word);
    handleCloseModal = () => {
        this.setState({
            message: null,
            messageIsHidden: true,
            modalIsOpen: false,
            modalMessage: null,
            word: null
        });
    }

    render() {
        const { user, room } = this.props;
        const { word, messageIsHidden, message, modalIsOpen, modalMessage, roundStarted, timer } = this.state;

        return(
            <SegmentGroup horizontal>
                {
                    user.isPresenter 
                    ? <PresenterPanel 
                        onStartRound={this.handleStartRound} 
                        onChangeWord={this.handleChangeWord}
                        word={word}
                        roundStarted={roundStarted}
                    />
                    : <ParticipantPanel 
                        onCheckAnswer={this.handleCheckAnswer} 
                        messageIsHidden={messageIsHidden}
                        message={message}
                        roundStarted={roundStarted}
                    />
                }
                <Timer timer={timer} />
                <RoomInfo room={room} />
                <Modal
                    size='mini'
                    open={modalIsOpen}
                    onClose={this.handleCloseModal}
                >
                    <Modal.Header>Message</Modal.Header>
                    <Modal.Content>{modalMessage}</Modal.Content>
                </Modal>
            </SegmentGroup>
        );
    }
}

export default GamePanel;