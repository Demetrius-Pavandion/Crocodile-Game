import React from 'react';
import { Container, Header } from 'semantic-ui-react';

function About(props) {
    return (
        <Container text>
            <Header as='h2'>Crocodile (Charades)</Header>
            <p><b>What it is:</b> A classic big group game, easily suited for lots of different occasions and age levels. Players act out clues for their teammates to guess.</p>
            <p><b>Best for:</b> A group of about 8 to 10 people (though you can play with many more).</p>
            <p><b>How to play:</b> The object of the game is simple: players take turns drawing word suggestions. Other players try to guess the word, and player who guesses the most wins.</p>
        </Container>
    );
}

export default About;