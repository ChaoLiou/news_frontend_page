<template>
  <div>
    <nuxt />
    <div :class="['float-btn-group', floatBtnShow ? 'float-btn-group_show' : '']">
      <div class="go-to-home" @click="goToHome">
        <div class="go-to-home__icon"></div>
      </div>
      <div class="go-to-previous" @click="goToPrevious">
        <div class="go-to-previous__icon"></div>
      </div>
      <div class="scroll-to-top" @click="scrollToTop">
        <div class="scroll-to-top__icon"></div>
      </div>
      <div class="float-btn-group__switch" @click="floatBtnShow = !floatBtnShow">
        <hr />
        <hr />
        <hr />
      </div>
    </div>
    <div :class="['tags', floatBtnShow ? 'tags_show' : '']">
      <div class="version-tag">ver. {{REVISION.version.replace(/"/g, '')}}</div>
      <!-- <div>{{fontSize}}px</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      floatBtnShow: false,
      REVISION: JSON.parse(process.env.REVISION),
      fontSize: 0
    };
  },
  mounted() {
    this.fontSize = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
  },
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
      this.floatBtnShow = false;
    },
    goToPrevious() {
      this.$router.go(-1);
      this.floatBtnShow = false;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
      this.floatBtnShow = false;
    }
  }
};
</script>
<style scoped>
.float-btn-group {
  margin: 20px;
  position: fixed;
  z-index: 99;
  bottom: 0px;
  right: 0px;
}
.float-btn-group > * {
  background-repeat: no-repeat;
  background-color: #ffffff;
  border-radius: 50%;
  border: 0.5px solid #dbdbdb;
  display: grid;
  justify-content: center;
  align-content: center;
  margin: auto;
  margin-top: 32px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.4);
}
.float-btn-group > *:not(:last-child),
.float-btn-group > *:not(:last-child) > * {
  width: 0px;
  height: 0px;
  opacity: 0;
  transition: 0.3s all ease-in;
}
.float-btn-group.float-btn-group_show > *:not(:last-child) {
  width: 48px;
  height: 48px;
  opacity: 1;
}
.float-btn-group.float-btn-group_show > *:not(:last-child) > * {
  width: 24px;
  height: 24px;
  opacity: 1;
}
.float-btn-group > * > * {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #ffffff;
  background-position: center;
  width: 24px;
  height: 24px;
}
.float-btn-group__switch {
  bottom: 0px;
  right: 0px;
  width: 64px;
  height: 64px;
  background-size: cover;
}
.float-btn-group__switch > hr {
  height: 0px;
  margin: 4px;
  border: 1px solid #26d07c;
}
.go-to-home {
  overflow: hidden;
}
.go-to-home__icon {
  width: 48px !important;
  height: 48px !important;
  background-size: cover;
  background-image: url("/icons/planet-home.svg");
}
.go-to-previous__icon {
  background-image: url("/icons/arrow-top_green.png");
  transform: rotate(-90deg);
}
.scroll-to-top__icon {
  background-image: url("/icons/arrow-top_green.png");
  transform: rotate(0deg);
}
.tags.tags_show > div {
  opacity: 1;
}
.tags {
  position: fixed;
  display: flex;
  bottom: 0px;
  left: 0px;
  margin: 20px;
}
.tags > div {
  margin: 4px;
  opacity: 0;
  transition: 0.3s all ease-in;
  background-color: #ffffff;
  padding: 4px 8px;
  border-radius: 8px;
  border: 0.5px solid #dbdbdb;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.4);
}
</style>
