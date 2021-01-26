<template>
  <div class="b-flame-icon" :style="{ width: size, height: size }">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.35981 7.85562C3.35981 7.85562 3.82496 8.53664 4.79987 9.11308C4.79987 9.11308 4.0938 3.16616 8.69432 2.13333C7.51565 6.44444 10.1936 7.66024 11.1698 5.38259C12.8 7.55168 11.5622 9.44409 11.5622 9.44409C12.2307 9.54007 12.7922 8.81228 12.7922 8.81228C12.7972 8.90193 12.8 8.9922 12.8 9.08311C12.8 11.725 10.651 13.8667 8.00002 13.8667C5.34905 13.8667 3.20001 11.725 3.20001 9.08309C3.20001 8.65872 3.25575 8.24736 3.35981 7.85562Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "14px",
    },
  },
};
</script>

<style>
</style>
