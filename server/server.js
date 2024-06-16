import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/rss-feed', async (req, res) => {
    try {
        const response = await fetch('https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss');
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
        res.status(500).send('Error fetching the RSS feed: ' + error.message);
    }
});

// Add a new route that acts as a proxy for the Mercury API
app.post('/webparser', async (req, res) => {
    try {
        const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching the article content:', error);
        res.status(500).send('Error fetching the article content: ' + error.message);
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
