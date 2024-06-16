// src/services/rssService.js
export async function fetchRSSFeed(url) {
    const response = await fetch(url);
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    // Get all the items
    const items = xmlDoc.getElementsByTagName('item');
    const articles = [];

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
        articles.push({ title, link, description, pubDate, categories, author, imageUrl });
    }

    return articles;
}


/*import axios from 'axios';
import RSSParser from 'rss-parser';

const parser = new RSSParser();
const RSS_URL = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss';

export const fetchRSSFeed = async (url = RSS_URL) => {
    try {
        const response = await axios.get(url);
        const feed = await parser.parseString(response.data);
        return feed.items;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return [];
    }
};*/

