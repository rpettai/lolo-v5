<template>
  <div class="feed-item poppins-regular">
    <a :href="article.link" @click.prevent="openModal">
      <h2 class="poppins-bold">{{ article.title }}</h2>
      <img v-if="article.imageUrl" :src="article.imageUrl" alt="Article image">
      <p>{{ article.description }}</p>
      <p>Published on: {{ article.pubDate }}</p>
      <p>Categories: {{ article.categories.join(', ') }}</p>
      <p>Author: {{ article.author }}</p>
    </a>
    <ArticleModal v-if="showModal" :content="content" @close="closeModal" />
  </div>
</template>

<script>
import ArticleModal from "@/components/ArticleModal.vue";

export default {
  components: {
    ArticleModal,
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      content: '',
    };
  },
  methods: {
    async openModal() {
      this.showModal = true;
      await this.fetchArticleContent();
    },
    closeModal() {
      this.showModal = false;
      this.content = '';
    },
    async fetchArticleContent() {
      console.log(this.article.link);  // Log the value of this.article.link
      const response = await fetch('http://localhost:3000/webparser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: this.article.link})
      });
      const data = await response.json();
      console.log('Response from Mercury API:', data); // Log the response data

      // Check if data.content exists before calling trim
      if (data.content && data.content.trim() === "You can’t perform that action at this time.") {
        this.content = "Content not available.";
      } else {
        this.content = data.content || '';
      }
    }
  }
};
</script>

<style scoped>

.feed-item {
  /* Add your styles here */
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  border: 1px solid #55bccb;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Adjust as needed */
  margin-left: auto;
  margin-right: auto;
  background-color: #a8c4c7;
}

.feed-item img {
  width: 100%;
  height: auto;
  margin-bottom: 1em;
}

.feed-item a {
  text-decoration: none;
  color: #ffffff;
}

.feed-item a h2 {
  color: #056d7a;
}

</style>
