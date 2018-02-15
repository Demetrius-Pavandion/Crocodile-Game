import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

const colors = [
    'black', 'yellow', 'red', 'green', 'blue', 'grey', 'orange', 'pink', 
    'olive', 'teal', 'violet', 'purple', 'brown', 'white'
];

class Panel extends Component {
    render() {
        const { lineWidth, onChangeColor, onChangeLineWidth, onClear } = this.props; 
        return (
            <Segment.Group>
                <Segment >
                    {
                        colors.map((color, i) =>
                            <Button
                                key={i}
                                size='tiny'
                                color={color !== 'white' ? color : null }
                                onClick={() => onChangeColor(color)}
                            />)
                    }
                </Segment>
                <Segment>
                    <Slider
                        ref='panelRange'
                        color='black'
                        settings={{
                            min: 0,
                            max: 40,
                            step: 2,
                            start: lineWidth,
                            onChange: (val) => onChangeLineWidth(val)
                        }}

                    />
                </Segment>
                <Segment>
                    <Button content='Clear' onClick={onClear} />
                </Segment>
            </Segment.Group>
        );
    }
}

export default Panel;