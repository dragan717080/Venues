const axios = require('axios');

const names = [
  'Tokyo',
  'New York City',
  'London',
  'Paris',
  'Singapore',
  'Dubai',
  'Rome',
  'Beijing',
  'Istanbul',
  'Los Angeles',
  'Sydney',
  'Cairo',
];

async function fetchImageForBoston() {
  names.forEach(async (name) => {
    try {

      const searchTerm = 'New York City';
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=${encodeURIComponent(
          name
        )}`
      );

      const pageId = Object.keys(response.data.query.pages)[0];
      const imageUrl = response.data.query.pages[pageId].original.source;

      console.log(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  })
}

fetchImageForBoston();