<template>
  <div>
    <select v-model="selectedCategory" @change="filterArticles">
      <option value="">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
  data() {
    return {
      selectedCategory: '',
    };
  },
  methods: {
    filterArticles() {
      this.$emit('filter-articles', this.selectedCategory);
    },
  },
};
</script>
