<template>
  <div class="b-n-icon" :style="{ width: size, height: size }">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" :fill="color" />
      <path
        d="M6.80138 5.5C6.35879 5.5 6 5.85879 6 6.30138V13.9296C6 14.2446 6.25539 14.5 6.57043 14.5C6.88548 14.5 7.14087 14.2446 7.14087 13.9296V7.12877C7.14087 7.11334 7.15337 7.10084 7.16879 7.10084C7.1775 7.10084 7.18571 7.1049 7.19099 7.11182L12.5966 14.1926C12.7445 14.3863 12.9743 14.5 13.2181 14.5C13.6499 14.5 14 14.1499 14 13.7181V6.07043C14 5.75539 13.7446 5.5 13.4296 5.5C13.1145 5.5 12.8591 5.75539 12.8591 6.07043V12.7956C12.8591 12.811 12.8466 12.8235 12.8312 12.8235C12.8225 12.8235 12.8143 12.8195 12.809 12.8126L7.4371 5.81346C7.28543 5.61584 7.05049 5.5 6.80138 5.5Z"
        fill="white"
        stroke="white"
        stroke-width="0.3"
      />
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
      default: "16px",
    },
  },
};
</script>

<style scoped>
.b-n-icon {
  display: inline-block;
}
</style>
