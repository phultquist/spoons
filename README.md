# Spoons Simulation
Simulation of the Spoons Card Game to Find the Best Position

## Example
See this [Demo](https://phultquist.github.io/spoons)

## About
Have you ever played the spoons card game and wondered if it's better to start at the beginning or the end? I have, and I wanted to build a simulation machine to find out.

### The Game
The game rules listed on [bicyle.com](https://bicyclecards.com/how-to-play/spoons/) are followed in this simulation.
It's a fun game and doesn't require too much focus.

The simulation is easy to hack to allow different amounts of cards, like having 5 cards in a hand instead of 4.

You can also easily change the number of people playing.

### How Does it Work?
The simulation uses a simple algorithm similar to how humans play that forces a player to play for their own benefit. If a player has a lot of one card, and picks it up, it will keep it for the best chance of winning.

## The Results
It's clear from the **Demo** that being the last player, or the garbage player, wins the most. 

### How Could this be?
The simplest explanation is that the garbage player sees all of the cards, although this isn't entirely proven.

But it makes sense, doesn't it? If you're the first player in a 10 player game (as in the current config),  **that's 36 out of 52 cards that you'll never see!**
