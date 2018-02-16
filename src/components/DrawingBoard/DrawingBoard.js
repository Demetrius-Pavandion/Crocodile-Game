import React, { Component } from 'react';
import { Segment, Sidebar, Label } from 'semantic-ui-react';
import ReactResizeDetector from 'react-resize-detector';
import Panel from './Panel';

class DrawingBoard extends Component {
    state = {
        width: 0,
        height: 350,
        lineWidth: 5,
        color: 'black',
        panelVisible: true
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.container = this.refs.container;

        this.setState({
            height: this.container.clientHeight,
            width: this.container.clientWidth
        });

        this.props.socket.on('draw', ({ x0, y0, x1, y1, color, lineWidth }) => {
            this.drawLine(x0, y0, x1, y1, color, lineWidth);
        });

        this.props.socket.on('clear', () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }

    drawLine = (x0, y0, x1, y1, color, lineWidth) => {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    handleMouseDown = (ev) => {
        this.setCursorPosition(ev);
        this.drawing = true;
    }

    handleMouseMove = (ev) => {
        if (!this.drawing) {
            return;
        }

        const { top, left } = this.canvas.getBoundingClientRect();
        let drawData = {
            x0: this.x,
            y0: this.y,
            x1: ev.clientX - left,
            y1: ev.clientY - top,
            color: this.state.color,
            lineWidth: this.state.lineWidth
        };
        this.props.socket.emit('drawing', this.props.room.name, drawData);
        if (this.props.user.isPresenter) {
            const {x0, y0, x1, y1, color, lineWidth} = drawData;
            this.drawLine(x0, y0, x1, y1, color, lineWidth);
        }

        this.setCursorPosition(ev);
    }

    handleMouseUp = (ev) => {
        this.setCursorPosition(ev);
        this.drawing = false;
    }

    setCursorPosition(ev) {
        const { top, left } = this.canvas.getBoundingClientRect();
        this.x = ev.clientX - left;
        this.y = ev.clientY - top;
    }

    handleResize = () => {
        if (!this.container) {
            return;
        }

        let h = this.container.clientHeight;
        let w = this.container.clientWidth;

        let difH = Math.abs(this.state.height - h);
        let difW = Math.abs(this.state.width - w);

        let result = {
            width: difW > 5 ? w : this.state.width,
            height: difH > 5 ? h : this.state.height,
        }

        this.setState(result);
    }

    handleChangeColor = (color) => this.setState({ color });
    handleChangeLineWidth = (lineWidth) => this.setState({ lineWidth });
    handleClearBoard = () => {
        if (this.props.user.isPresenter) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } 

        this.props.socket.emit('clearBoard', this.props.room.name);
    };
    toggleVisibility = () => {
        if (this.props.user.isPresenter) {
            this.setState({ panelVisible: !this.state.panelVisible });
        }
    }

    onMouseLeave = () => {
        if (this.drawing) {
            this.drawing = false;
        }  
    }

    render() {
        const { panelVisible, lineWidth, width, height } = this.state;
        return (
            <Sidebar.Pushable as={Segment}>
                <Sidebar 
                    as={Segment}
                    animation='overlay'
                    width='thin'
                    visible={this.props.user.isPresenter ? panelVisible : false}
                    direction='right'
                    vertical
                >
                    <Panel
                        lineWidth={lineWidth}
                        onChangeColor={this.handleChangeColor}
                        onChangeLineWidth={this.handleChangeLineWidth}
                        onClear={this.handleClearBoard}
                    />
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment basic>
                        <Label 
                            as='a' 
                            color='black' 
                            ribbon 
                            onClick={this.toggleVisibility}
                            content='Panel' 
                        />
                        <div ref='container'>
                            <canvas
                                ref='canvas'
                                width={width}
                                height={height}

                                onMouseDown={this.props.user.isPresenter ? this.handleMouseDown : null}
                                onMouseMove={this.props.user.isPresenter ? this.handleMouseMove  : null}
                                onMouseUp={this.props.user.isPresenter ? this.handleMouseUp : null}
                                onMouseLeave={this.props.user.isPresenter ? this.onMouseLeave : null}
                            />
                            <ReactResizeDetector
                                handleWidth
                                handleHeight
                                onResize={this.handleResize}
                            />
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default DrawingBoard;