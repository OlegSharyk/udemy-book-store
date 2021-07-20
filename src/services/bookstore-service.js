export default class BookStoreService {
  data = [
    {
      id: 1,
      title: 'JavaScript: The Definitive Guide',
      author: 'David Flanagan',
      price: 29,
      coverImage:
        'https://images-na.ssl-images-amazon.com/images/I/510JjoNTdOL._SX379_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'JavaScript Patterns',
      author: 'Stoyan Stefanov',
      price: 17,
      coverImage:
        'https://images-na.ssl-images-amazon.com/images/I/51PKxi4d03S._SX379_BO1,204,203,200_.jpg',
    },
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data);
        // reject(new Error('Something wrong'));
      }, 700);
    });
  }
}
