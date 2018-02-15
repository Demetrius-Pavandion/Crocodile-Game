import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

class PresenterPanel extends Component {
    render() {
        const { word, onStartRound, roundStarted, onChangeWord } = this.props;

        return(
            <Segment textAlign='center' size='huge'>
                {
                    roundStarted 
                    ? (<Button 
                        content='Change word' 
                        onClick={onChangeWord} 
                    />) 
                    : (<Button 
                        content='Start round' 
                        onClick={onStartRound} 
                    />)
                }
                {word ? <h>Your word: <b>{word}</b></h> : null}
            </Segment>
        );
    }
}

export default PresenterPanel;