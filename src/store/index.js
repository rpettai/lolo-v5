// src/store/index.js
import { createStore } from 'vuex';
import { fetchRSSFeed } from '@/services/rssService';

export default createStore({
    state: {
        feeds: [],
        articles: [],
    },
    mutations: {
        setFeeds(state, feeds) {
            state.feeds = feeds;
        },
        setArticles(state, articles) {
            state.articles = articles;
        },
        addFeed(state, feed) {
            state.feeds.push(feed);
        },
        removeFeed(state, feedUrl) {
            state.feeds = state.feeds.filter(feed => feed.url !== feedUrl);
        },
        updateFeed(state, updatedFeed) {
            const index = state.feeds.findIndex(feed => feed.url === updatedFeed.url);
            if (index !== -1) {
                state.feeds.splice(index, 1, updatedFeed);
            }
        },
    },
    actions: {
        async loadFeed({ commit }, url) {
            const articles = await fetchRSSFeed(url);
            commit('setArticles', articles);
        },
        addFeed({ commit }, feed) {
            commit('addFeed', feed);
        },
        removeFeed({ commit }, feedUrl) {
            commit('removeFeed', feedUrl);
        },
        updateFeed({ commit }, updatedFeed) {
            commit('updateFeed', updatedFeed);
        },
    },
    getters: {
        allArticles(state) {
            return state.articles;
        },
    },
});
