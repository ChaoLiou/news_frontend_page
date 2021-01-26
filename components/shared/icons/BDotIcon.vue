<template>
  <div class="b-dot-icon" :style="{ width: size, height: size }">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" :fill="color" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#FF9500",
    },
    size: {
      type: String,
      default: "10px",
    },
  },
};
</script>

<style scoped>
.b-dot-icon {
  display: inline-block;
}
</style>
