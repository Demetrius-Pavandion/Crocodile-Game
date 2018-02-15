import React from 'react';
import { Segment } from 'semantic-ui-react';

function Timer(props) {
    return(
        <Segment textAlign='center' size='massive'>
            {props.timer.minutes.toString().padStart(2, '0')}:{props.timer.seconds.toString().padStart(2, '0')}
        </Segment>
    );
}

export default Timer;