<template>
  <div class="home-view poppins-bold">
    <div class="top">
    <h1>Welcome to Lolo v5</h1>
    <FeedManager @feed-added="updateFeedList" />
    </div>
    <FeedList ref="feedList" :feeds="feeds" />
  </div>
</template>

<script>
import FeedList from "@/components/FeedList.vue";
import FeedManager from "@/components/FeedManager.vue";

export default {
  components: {
    FeedList,
    FeedManager
  },
  data() {
    return {
      feeds: [],
    };
  },
  methods: {
    updateFeedList(url) {
      this.feeds.push(url);
      this.$refs.feedList.fetchArticlesFromFeed(url);
    },
  },
};
</script>

<style scoped>

.home-view h1{
  align-items: center;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 50px;
}

.top {
  background: linear-gradient(to bottom, #056d7a, transparent);
  padding: 20px;
}

</style>
