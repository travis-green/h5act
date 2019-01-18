<template>
  <div>
    <mt-swipe :auto="3000" :show-indicators="false">
      <mt-swipe-item v-for="item in items" :key="item.id">
        <!-- <a :href="item.href"> -->
        <img :src="item.url" class="img">
        <!-- <span class="desc"></span> -->
        <!-- </a> -->
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui";
import "mint-ui/lib/style.css";

export default {
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].style.margin = "0";
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  data() {
    return {
      items: [
        {
          title: "活动111",
          href: "http://google.com",
          url: "http://localhost:8080/static/swiper/swiper1.JPG"
        },
        {
          title: "活动222",
          href: "http://baidu.com",
          url: "http://localhost:8080/static/swiper/swiper2.JPG"
        },
        {
          title: "活动222",
          href: "http://baidu.com",
          url: "http://localhost:8080/static/swiper/swiper3.JPG"
        },
        {
          title: "活动222",
          href: "http://baidu.com",
          url: "http://localhost:8080/static/swiper/swiper4.JPG"
        },
        {
          title: "活动222",
          href: "http://baidu.com",
          url: "http://localhost:8080/static/swiper/swiper5.JPG"
        }
      ]
    };
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
.mint-swipe {
  height: 218px;
}

body {
  margin: 0;
}
.desc {
  font-weight: 600;
  opacity: 0.9;
  padding: 5px;
  height: 20px;
  line-height: 20px;
  width: 100%;
  color: #fff;
  background-color: gray;
  position: absolute;
  bottom: 0;
}
</style>