import axios from 'axios';

abstract class ImageUtils {

  static async getImageFromFile(imgLink: string): Promise<string|void> {
    imgLink = decodeURIComponent(imgLink);
    const params = {
      'action': 'query',
      'titles': imgLink.split('wiki/')[1],
      'prop': 'imageinfo',
      'iiprop': 'url',
      'format': 'json'
    }

    return axios.get('https://commons.wikimedia.org/w/api.php', { params })
      .then(response => {
        const data = response.data;
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const imageUrl = pages[pageId].imageinfo[0].url;

        return decodeURIComponent(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching image URL:', error.message);
      });
  }
}

export default ImageUtils;
