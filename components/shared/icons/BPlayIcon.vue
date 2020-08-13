<template>
  <div
    class="b-play-icon"
    :style="{
      width:`calc(${size} * 2.5)`,
      height:`calc(${size} * 2.5)`,
      fontSize: size
    }"
  >
    <div class="b-play-icon__triangle"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "12px"
    }
  }
};
</script>

<style scoped>
.b-play-icon {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
}
.b-play-icon__triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0.577em 0 0.577em 1em;
  border-color: transparent transparent transparent #ffffff;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: absolute;
}
</style>
