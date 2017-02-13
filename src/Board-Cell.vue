<template>
  <div class="board-cell">
    <template v-if="symbol == 'x'">
      <svg width="64" height="64">
        <path class="gold" d="M 35 0 L35 64 L29 64 L29 0 Z" />
        <path class="gold" d="M0 35 L23 35 L23 29 L0 29 Z" />
        <path class="gold" d="M64 35 L40 35 L40 29 L64 29 Z" />
      </svg>
    </template>
    <template v-else-if="symbol == 'o'">
      <svg width="64" height="64">
        <path class="white" d="M0 28 L6 28 L6 6 L58 6 L58 28 L64 28 L64 0 L6 0 L0 0 Z" />
        <path class="white" d="M0 36 L6 36 L6 58 L58 58 L58 36 L64 36 L64 64 L0 64 Z" />
      </svg>
    </template>
    <template v-else><template>
  </div>
</template>

<script>
export default {

  name: 'board-cell',

  props: ['symbol'],

  data() {
    return {

    }
  },

}
</script>

<style>
.board-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  transform: rotate(45deg) scale(.8);
}

.gold {
  fill: rgb(167, 143, 106);
}

.white {
  fill: rgb(233, 233, 233);
}
</style>
