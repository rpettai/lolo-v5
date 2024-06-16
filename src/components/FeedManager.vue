<template>
  <div>
    <h1>Manage Feeds</h1>
    <form @submit.prevent="addFeed(newFeedUrl)">
      <input v-model="newFeedUrl" placeholder="Enter RSS feed URL">
      <button type="submit">Add Feed</button>
    </form>
    <ul>
      <li v-for="feed in feeds" :key="feed">
        {{ feed }}
        <button @click="removeFeed(feed)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feeds: [],
    };
  },
  created() {
    this.loadFeeds();
  },
  methods: {
    loadFeeds() {
      this.feeds = Object.keys(localStorage);
    },
    addFeed(url) {
      localStorage.setItem(url, url);
      this.loadFeeds();
      this.$emit('feed-added', url);
    },
    removeFeed(url) {
      localStorage.removeItem(url);
      this.loadFeeds();
    },
  },
};
</script>

<style scoped>

button {
  background-color: #246b72;
  color: white;
  border-radius: 8px;
  border: none;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
}

button text {
  color: white;
}

input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  padding-right: 60px;
}

h1, form, ul {
  align-items: center;
  display: flex;
  justify-content: center;
}

h1 {
  color: white;
}

ul {
  padding-top: 20px;
}

</style>
