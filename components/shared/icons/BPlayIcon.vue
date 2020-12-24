<template>
  <div
    class="b-play-icon"
    :style="{
      width: `calc(${size} * 3)`,
      height: `calc(${size} * 3)`,
      backgroundColor: color,
      fontSize: size,
    }"
  >
    <div
      class="b-play-icon__triangle"
      :style="{
        borderLeftColor: arrowColor,
      }"
    ></div>
  </div>
</template>

<script>
/**
 * 播放 Icon
 */
export default {
  props: {
    /**
     * Icon 底色(css color)
     */
    color: {
      type: String,
      default: "#000000b3",
    },
    /**
     * 箭頭顏色(css color)
     */
    arrowColor: {
      type: String,
      default: "#ffffff",
    },
    /**
     * 箭頭尺寸, 也會影響整個 Icon 尺寸(Icon 的寬高是箭頭的三倍)
     */
    size: {
      type: String,
      default: "16px",
    },
  },
};
</script>

<style scoped>
.b-play-icon {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.b-play-icon__triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent transparent transparent;
  border-width: 0.5em 0px 0.5em 0.866em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
