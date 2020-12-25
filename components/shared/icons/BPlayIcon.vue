<template>
  <div class="b-play-icon" :style="{ width: size, height: size }">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM35.5264 25.5027L19.7369 15.7898V34.2108L35.5264 25.5027Z"
        fill="white"
        fill-opacity="0.97"
      />
    </svg>
  </div>
</template>

<script>
/**
 * 播放鍵 Icon
 */
export default {
  props: {
    /**
     * Icon 尺寸(css 寬高)
     */
    size: {
      type: String,
      default: "50px",
    },
  },
};
</script>

<style>
</style>
