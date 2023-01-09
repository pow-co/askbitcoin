import { Chance } from 'chance';

import { add, sub } from 'date-fns';

const chance = new Chance();

const products = [
  {
    id: 1,
    image: 'prod-1.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 25,
    salePrice: 350,
    offerPrice: 275,
    gender: 'male',
    categories: ['fashion', 'books'],
    colors: ['errorDark', 'orangeDark', 'errorMain', 'secondaryMain'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    isStock: true
  },
  {
    id: 2,
    image: 'prod-2.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 10,
    salePrice: 89.99,
    offerPrice: 81.99,
    gender: 'kids',
    categories: ['fashion', 'toys'],
    colors: ['primary200', 'successLight', 'secondary200', 'warningMain'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
    isStock: false
  },
  {
    id: 3,
    image: 'prod-3.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 40,
    salePrice: 85.0,
    offerPrice: 49.9,
    gender: 'male',
    categories: ['fashion', 'electronics'],
    colors: ['primary200', 'primaryDark'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 4, hours: 9, minutes: 50 }),
    isStock: true
  },
  {
    id: 4,
    image: 'prod-4.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 17,
    salePrice: 36.0,
    offerPrice: 29.99,
    gender: 'kids',
    categories: ['fashion', 'electronics', 'toys'],
    colors: ['errorLight', 'orangeMain', 'warningMain'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 7, hours: 6, minutes: 45 }),
    isStock: false
  },
  {
    id: 5,
    image: 'prod-5.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 20,
    salePrice: 15.99,
    offerPrice: 12.99,
    gender: 'male',
    categories: ['books'],
    colors: ['warningMain', 'primary200'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
    isStock: true
  },
  {
    id: 6,
    image: 'prod-6.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 13,
    salePrice: 99.99,
    offerPrice: 86.99,
    gender: 'female',
    categories: ['fashion', 'kitchen'],
    colors: ['primaryDark', 'orangeDark'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: add(new Date(), { days: 6, hours: 10, minutes: 0 }),
    isStock: true
  },
  {
    id: 7,
    image: 'prod-7.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 15,
    salePrice: 16.99,
    offerPrice: 14.59,
    gender: 'male',
    categories: ['fashion'],
    colors: ['errorDark', 'secondaryMain', 'errorMain', 'orangeDark'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: add(new Date(), { days: 14, hours: 1, minutes: 55 }),
    isStock: false
  },
  {
    id: 8,
    image: 'prod-8.jpg',
    name: chance.name(),
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 20,
    salePrice: 129.99,
    offerPrice: 100.0,
    gender: 'female',
    categories: ['toys'],
    colors: ['darkMain', 'errorMain', 'successDark'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 0, hours: 11, minutes: 10 }),
    isStock: true
  }
];

export default function handler(req, res) {
  const { filter } = req.body;

  if (filter.sort === 'high') {
    products.sort((a, b) => Number(b.offerPrice) - Number(a.offerPrice));
  }

  if (filter.sort === 'low') {
    products.sort((a, b) => Number(a.offerPrice) - Number(b.offerPrice));
  }

  if (filter.sort === 'popularity') {
    products.sort((a, b) => Number(b.popularity) - Number(a.popularity));
  }

  if (filter.sort === 'discount') {
    products.sort((a, b) => Number(b.discount) - Number(a.discount));
  }

  if (filter.sort === 'discount') {
    products.sort((a, b) => Number(b.discount) - Number(a.discount));
  }

  if (filter.sort === 'new') {
    products.sort((a, b) => Number(b.new) - Number(a.new));
  }

  const results = products.filter((product) => {
    let searchMatches = true;

    if (filter.search) {
      const properties = ['name', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (product[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        searchMatches = false;
      }
    }

    const genderMatches = filter.gender.length > 0 ? filter.gender.some((item) => item === product.gender) : true;
    const categoriesMatches =
      filter.categories.length > 0 && filter.categories.some((category) => category !== 'all')
        ? filter.categories.some((category) => product.categories.some((item) => item === category))
        : true;
    const colorsMatches = filter.colors.length > 0 ? filter.colors.some((color) => product.colors.some((item) => item === color)) : true;

    const minMax = filter.price ? filter.price.split('-') : '';
    const priceMatches = filter.price ? product.offerPrice >= minMax[0] && product.offerPrice <= minMax[1] : true;
    const ratingMatches = filter.rating > 0 ? product.rating >= filter.rating : true;

    return searchMatches && genderMatches && categoriesMatches && colorsMatches && priceMatches && ratingMatches;
  });
  return res.status(200).json(results);
}
