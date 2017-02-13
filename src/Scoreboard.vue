<template>
  <div id="scoreboard">
    <div class="player">
      <div class="icon">{{ isHumanX ? 'X' : 'O' }}</div>
      <div class="name">Human</div>
      <div class="score">{{ human }}</div>
    </div>
    <div class="player">
      <div class="icon">{{ isHumanX ? 'O' : 'X' }}</div>
      <div class="name">Computer</div>
      <div class="score">{{ computer }}</div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'scoreboard',

  props: ['isHumanX', 'human', 'computer'],

  data() {
    return {

    };
  },

}
</script>

<style>
#scoreboard {
  font-size: 1.2em;
  font-weight: 100;
  width: 200px;
  display: flex;
  flex-direction: column;
  margin: 50px;
}

.player {
  display: flex;
  justify-content: space-between;
  padding-top: .33ex;
  padding-bottom: .33ex;
}

.player:not(:last-child) {
  border-bottom: solid 1px rgba(255, 255, 255, .06);
}

.icon {
  width: 50px;
}

.name {
  margin-left: 1em;
  margin-right: 1em;
  width: 100%;
}

.score {
  width: 50px;
  text-align: right;
}
</style>
