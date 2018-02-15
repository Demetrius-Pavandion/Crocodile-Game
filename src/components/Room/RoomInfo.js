import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';

function RoomInfo(props) {
    return(
        <Segment size='large'>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}><b>Room:</b> "{props.room.name}"</Grid.Column>
                    <Grid.Column width={5}><b>Max score:</b> {props.room.maxPoints} points</Grid.Column>
                    <Grid.Column width={5}><b>Round duration:</b> {props.room.roundDuration} min</Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}

export default RoomInfo;