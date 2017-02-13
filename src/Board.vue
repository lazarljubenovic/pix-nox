<template>
  <div id="board">
    <div class="board">
      <div class="board-row" v-for="(row, i) of values">
        <board-cell v-for="(cell, j) of row"
                    :symbol="cell"
                    @click.native="play(i, j)"
        ></board-cell>
      </div>
    </div>
  </div>
</template>

<script>
import BoardCell from './Board-Cell.vue';

export default {
  name: 'board',

  props: ['values'],

  components: {BoardCell},

  data() {
    return {

    };
  },

  methods: {
    play(i, j) {
      this.$emit('play', [i, j]);
    }
  },
}
</script>

<style>
#board {
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  font-weight: 100;
  margin: 100px;
  user-select: none;
}

.board-row {
  display: flex;
}

.board-cell {
  font-size: 3em;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
}

.board-cell:hover {
  background-color: rgba(255, 255, 255, .01);
}

.board-row:not(:last-child) > .board-cell {
  border-bottom: solid 1px rgba(255, 255, 255, .4);
}

.board-row > .board-cell:not(:last-child) {
  border-right: solid 1px rgba(255, 255, 255, .4);
}
</style>
