<template>
  <nuxt-link
    class="b-audiovisual"
    :to="pageLink"
    :href="pageLink ? pageLink : link"
    :target="pageLink ? 'self' : '_blank'"
  >
    <div class="b-audiovisual__card" :style="{ width }">
      <div class="b-audiovisual__thumbnail">
        <div class="b-audiovisual__thumbnail-img" ref="thumbnailImg"></div>
        <div class="b-audiovisual__play-icon b-audiovisual__play-icon_center">
          <b-play-icon />
        </div>
      </div>
      <div class="b-audiovisual__info">
        <div class="b-audiovisual__author">{{ author }}</div>
        <div class="b-audiovisual__title">{{ titleLabel }}</div>
        <div class="b-audiovisual__views">
          <div class="b-audiovisual__eye-icon"></div>
          <div>{{ views }}</div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default: undefined,
    },
    author: {
      type: String,
      default: "",
    },
    titleLabel: {
      type: String,
      default: "",
    },
    views: {
      type: String,
      default: "",
    },
    pageLink: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
  },
  mounted() {
    const thumbnailImgDOM = this.$refs.thumbnailImg;
    const $rootDOM = this.$el;
    const parentVueComp = this.$parent;
    var thumbnailImage = new Image();
    thumbnailImage.onload = () => {
      thumbnailImgDOM.style.backgroundImage = `url(${this.thumbnail})`;
      parentVueComp.$emit("heightChanged", $rootDOM.offsetHeight);
    };
    thumbnailImage.src = this.thumbnail;
  },
  methods: {
    heightChanged() {
      if (this.$el.offsetHeight > 0) {
        this.$parent.$emit("heightChanged", this.$el.offsetHeight);
      }
    },
  },
  watch: {
    thumbnail(value) {
      const thumbnailImgDOM = this.$refs.thumbnailImg;
      const $rootDOM = this.$el;
      const parentVueComp = this.$parent;
      var thumbnailImage = new Image();
      thumbnailImage.onload = () => {
        thumbnailImgDOM.style.backgroundImage = `url(${value})`;
        parentVueComp.$emit("heightChanged", $rootDOM.offsetHeight);
      };
      thumbnailImage.src = value;
    },
  },
};
</script>

<style scoped>
.b-audiovisual {
  display: block;
}
.b-audiovisual__card {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  border-radius: 6px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-audiovisual > div {
  background-color: #fafafa;
}
.b-audiovisual__thumbnail {
  position: relative;
}
.b-audiovisual__thumbnail-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 1;
}
.b-audiovisual__play-icon {
  position: absolute;
  width: fit-content;
  height: fit-content;
  z-index: 2;
}
.b-audiovisual__play-icon_center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}
.b-audiovisual__info {
  padding: 8px 6px;
  font-size: 0.8em;
}
.b-audiovisual__info > div:not(:last-child) {
  margin-bottom: 4px;
}
.b-audiovisual__views {
  display: flex;
  flex-direction: row;
}
.b-audiovisual__views,
.b-audiovisual__author {
  font-size: 0.8em;
  color: #b8b8b8;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 12px);
}
.b-audiovisual__title {
  font-weight: bold;
  height: 2.8em;
  overflow: hidden;
  position: relative;
  text-align: justify;
  padding-right: 16px;
}
.b-audiovisual__title:before {
  content: "…";
  position: absolute;
  right: 0;
  bottom: 0;
}
.b-audiovisual__title:after {
  content: "";
  position: absolute;
  right: 0;
  width: 1em;
  height: 1.5em;
  background: #fafafa;
}
.b-audiovisual__eye-icon {
  background-image: url("/icons/eye.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 0.6em;
  height: 0.6em;
  align-self: center;
  padding-right: 4px;
}
</style>
