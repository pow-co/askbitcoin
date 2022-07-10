import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const productReviews = [
  {
    id: '1',
    rating: chance.floating({ min: 0.2, max: 5.0 }),
    review: chance.paragraph({ sentences: 2 }),
    date: sub(new Date(), { days: 0, hours: 1, minutes: 45 }),
    profile: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      status: chance.bool()
    }
  },
  {
    id: '2',
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    review: chance.paragraph({ sentences: 2 }),
    date: sub(new Date(), { days: 5, hours: 12, minutes: 55 }),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      status: chance.bool()
    }
  },
  {
    id: '3',
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    review: chance.paragraph({ sentences: 2 }),
    date: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    profile: {
      avatar: 'user-3.png',
      name: chance.name({ nationality: 'en' }),
      status: chance.bool()
    }
  }
];

export default function handler(req, res) {
  res.status(200).json({ productReviews });
}
