<template>
  <div class="category">
    <!-- Dropdown for selecting a category -->
    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
  </div>
  <div class="feed-list">
    <!-- Show error message if there is an error -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Loop through articles and pass article data to FeedItem component -->
    <!-- <FeedItem v-for="article in articles" :key="article.id" :article="article" /> -->
    <FeedItem v-for="article in sortedArticles" :key="article.link" :article="article" />

  </div>
</template>

<script>
import FeedItem from "@/components/FeedItem.vue";

export default {
  components: {
    FeedItem,
  },
  data() {
    return {
      articles: [], // This will hold the articles fetched from the RSS feed
      error: null, // This will hold any error messages
      selectedCategory: null, // This will hold the selected category
    };
  },
  computed: {
    categories() {
      // Get all unique categories from the articles
      const categories = new Set();
      this.articles.forEach(article => {
        article.categories.forEach(category => categories.add(category));
      });
      return Array.from(categories);
    },
    filteredArticles() {
      // Filter the articles based on the selected category
      if (!this.selectedCategory) {
        return this.articles;
      }
      return this.articles.filter(article => article.categories.includes(this.selectedCategory));
    },
    sortedArticles() {
      // Sort the articles by date
      return [...this.filteredArticles].sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    },
  },
  created() {
    this.fetchArticlesFromFeed('http://localhost:3000/rss-feed');
  },
  methods: {
    async fetchArticlesFromFeed(url) {
      try {
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Get all the items
        const items = xmlDoc.getElementsByTagName('item');

        // Loop through items and extract the data
        for (let i = 0; i < items.length; i++) {
          const title = items[i].getElementsByTagName('title')[0]?.textContent || 'No title';
          const link = items[i].getElementsByTagName('link')[0]?.textContent || '#';
          const description = items[i].getElementsByTagName('description')[0]?.textContent || 'No description';
          const pubDate = items[i].getElementsByTagName('pubDate')[0]?.textContent || 'No date';
          const categories = Array.from(items[i].getElementsByTagName('category')).map(el => el.textContent);
          const author = items[i].getElementsByTagName('author')[0]?.textContent || 'Unknown author';
          const imageUrl = items[i].getElementsByTagName('media:content')[0]?.getAttribute('url') || '';

          // Push the article data to the articles array
          this.articles.push({ title, link, description, pubDate, categories, author, imageUrl });
        }
      } catch (error) {
        this.error = 'Error fetching the RSS feed: ' + error.message;
        console.error('Error fetching the RSS feed:', error);
      }
    },
  },
  /*async created() {
    try {
      // Replace the RSS feed URL with your server's URL
      const response = await fetch('http://localhost:3000/rss-feed');
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Get all the items
      const items = xmlDoc.getElementsByTagName('item');

      // Loop through items and extract the data
      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0]?.textContent || 'No title';
        const link = items[i].getElementsByTagName('link')[0]?.textContent || '#';
        const description = items[i].getElementsByTagName('description')[0]?.textContent || 'No description';
        const pubDate = items[i].getElementsByTagName('pubDate')[0]?.textContent || 'No date';
        const categories = Array.from(items[i].getElementsByTagName('category')).map(el => el.textContent);
        const author = items[i].getElementsByTagName('author')[0]?.textContent || 'Unknown author';
        const imageUrl = items[i].getElementsByTagName('media:content')[0]?.getAttribute('url') || '';

        // Push the article data to the articles array
        this.articles.push({ title, link, description, pubDate, categories, author, imageUrl });
      }
    } catch (error) {
      this.error = 'Error fetching111 the RSS feed: ' + error.message;
      console.error('Error fetching222 the RSS feed:', error);
    }
  }*/
  /*async created() {
    try {
      const response = await fetch('https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss');
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Get all the items
      const items = xmlDoc.getElementsByTagName('item');

      // Loop through items and extract the data
      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0]?.textContent || 'No title';
        const link = items[i].getElementsByTagName('link')[0]?.textContent || '#';
        const description = items[i].getElementsByTagName('description')[0]?.textContent || 'No description';
        const pubDate = items[i].getElementsByTagName('pubDate')[0]?.textContent || 'No date';
        const categories = Array.from(items[i].getElementsByTagName('category')).map(el => el.textContent);
        const author = items[i].getElementsByTagName('author')[0]?.textContent || 'Unknown author';
        const imageUrl = items[i].getElementsByTagName('media:content')[0]?.getAttribute('url') || '';

        // Push the article data to the articles array
        this.articles.push({ title, link, description, pubDate, categories, author, imageUrl });
      }
    } catch (error) {
      this.error = 'Error fetching111 the RSS feed: ' + error.message;
      console.error('Error fetching222 the RSS feed:', error);
    }
  }*/
  /*async created() {
const response = await fetch('https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss');
const data = await response.text();
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(data, "text/xml");

// Get all the items
const items = xmlDoc.getElementsByTagName('item');

// Loop through items and extract the data
for (let i = 0; i < items.length; i++) {
const title = items[i].getElementsByTagName('title')[0].textContent;
const link = items[i].getElementsByTagName('link')[0].textContent;
const description = items[i].getElementsByTagName('description')[0].textContent;
const pubDate = items[i].getElementsByTagName('pubDate')[0].textContent;
const categories = Array.from(items[i].getElementsByTagName('category')).map(el => el.textContent);
const author = items[i].getElementsByTagName('author')[0].textContent;
const imageUrl = items[i].getElementsByTagName('media:content')[0].getAttribute('url');

// Push the article data to the articles array
this.articles.push({title, link, description, pubDate, categories, author, imageUrl});
}
}*/
};
</script>

<style scoped>

.error {
  color: red;
}

.feed-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.category {
  align-items: center;
  display: flex;
  justify-content: center;
}

.category select {
  width: 200px;
  height: 30px;
  font-size: 16px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

</style>


