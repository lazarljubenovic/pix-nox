<template>
  <div id="app">
    <div id="logo">
      <span class="text">
        <span id="p"><span class="dim"></span>p</span><span id="i"><span class="dim"></span>i</span><span>x-nox</span>
      </span>
      <div class="box"></div>
    </div>

    <board :values="board" @play="play($event)"></board>

    <div class="new-game-button">
      <button @click="newGame">New game</button>
    </div>

    <scoreboard :isHumanX="isHumanX"
                :human="score.human"
                :computer="score.computer"
    ></scoreboard>

    <div id="error" v-if="error != ''"><span>{{ error }}</span><div>
  </div>
</template>

<script>
import Board from './Board.vue';
import Scoreboard from './Scoreboard.vue';
import {isFull, getWinner, play, playRandomly, EMPTY_BOARD, SOME_BOARD} from './tic-tac-toe.js';

export default {
  name: 'app',

  components: {Board, Scoreboard},

  data() {
    return {
      board: EMPTY_BOARD,
      isGame: true,
      error: '',
      score: {
        human: 0,
        computer: 0,
      },
      isHumanX: true,
    };
  },

  methods: {
      newGame() {
        this.board = EMPTY_BOARD;
        this.isGame = true;
      },

      isEnd() {
        // console.log('Checking for ending...');
        const winner = getWinner(this.board);
        if (winner != null) {
          this.win(winner);
          return true;
        }
        if (isFull(this.board)) {
          this.draw();
          return true;
        }
        // console.log('Nope. The show goes on...');
        return false;
      },

      win(winner) {
        // console.log(`We have a winner: ${winner}`);
        this.isGame = false;
        if (this.isHumanX) {
          if (winner == 'x') this.score.human++;
          else this.score.computer++;
        } else {
          if (winner == 'x') this.score.computer++;
          else this.score.human++;
        }
      },

      draw() {
        this.isGame = false;
        // console.log('Draw!');
        this.score.computer++;
        this.score.human++;
      },

      play(position) {
        if (!this.isGame) {
          return this.displayError(`You have to start a new game to play!`);
        }
        // console.log(`Human plays at ${position[0]}, ${position[1]}`);
        const human = this.isHumanX ? 'x' : 'o';
        const computer = this.isHumanX ? 'o' : 'x';
        try {
          this.board = play(this.board, position, human);
          if (this.isEnd()) return;
          this.board = playRandomly(this.board, computer);
        }
        catch (e) {
          return this.displayError(e);
        }
        if (this.isEnd()) return;
      },

      displayError(e) {
        this.error = e.toString();
        setTimeout(() => this.error = '', 1500);
      }
  },
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(33, 33, 33);
  color: white;
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

#logo {
  font-weight: 100;
  font-size: 3.5em;
  position: relative;
  user-select: none;
}

#logo > .text {
}

#logo > .box {
  position: absolute;
  top: .48ex;
  height: calc(.64ex + 1ex);
  left: -.15em;
  width: calc(100% + .3em);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .87) inset;
}

.dim {
  position: absolute;
  z-index: 1;
}

#p {
  color: transparent;
  position: relative;
  z-index: 4;
}

#p:after {
  content: 'p';
  color: white;
  position: absolute;
  left: 0;
  z-index: 4;
}

#p > .dim {
  position: absolute;
  width: .33em;
  height: .33em;
  background-color: rgb(33, 33, 33);
  left: -.06em;
  bottom: .07ex;
  z-index: 1;
}

#i {
  position: relative;
  z-index: 2;
}

#i > .dim {
  content: '';
  position: absolute;
  width: .33em;
  height: .33em;
  top: calc(.64ex - .167em);
  left: -.06em;
  background-color: rgb(33, 33, 33);
}

button {
  outline: none;
  border: none;
  background-color: rgb(167, 143, 106);
  color: white;
  padding: .5em .8em;
  text-transform: uppercase;
  border-radius: 3px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

#error {
  pointer-events: none;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

#error > span {
  font-size: 1.2em;
  background-color: rgba(255, 255, 255, .03);
  padding: 1em 1.4em;
  display: inline-block;
  width: 100%;
  text-align: center;
  text-shadow: 1px 1px rgba(0, 0, 0, .5);
}
</style>
