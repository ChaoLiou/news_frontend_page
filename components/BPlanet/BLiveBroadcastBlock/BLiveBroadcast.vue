<template>
  <nuxt-link
    class="b-live-broadcast"
    :to="pageLink"
    :href="pageLink ? pageLink : link"
    :target="pageLink ? 'self' : '_blank'"
  >
    <div class="b-live-broadcast__card" :style="{ width: size, height: size }">
      <div class="b-live-broadcast__thumbnail" ref="thumbnailImg"></div>
      <div v-if="live" class="b-live-broadcast__frame"></div>
      <div v-if="live" class="b-live-broadcast__live-label">LIVE</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default: undefined
    },
    live: {
      type: Boolean,
      default: false
    },
    pageLink: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "52px"
    }
  },
  computed: {
    s_thumbnail() {
      return this.thumbnail ? `url(${this.thumbnail})` : "transparent";
    }
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
    }
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
    }
  }
};
</script>

<style scoped>
.b-live-broadcast {
  display: block;
}
.b-live-broadcast__card {
  position: relative;
  margin: auto;
}
.b-live-broadcast__thumbnail {
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
  z-index: 2;
  position: absolute;
  width: 97%;
  height: 97%;
  top: 50%;
  left: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
}
.b-live-broadcast__frame {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(90deg, #000000, #d4d4d4);
}
.b-live-broadcast__live-label {
  position: absolute;
  z-index: 3;
  font-size: 0.7em;
  top: 0px;
  right: 0px;
  color: #ffffff;
  background-color: #393939;
  border-radius: 6px;
  padding: 0px 4px;
}
</style>
