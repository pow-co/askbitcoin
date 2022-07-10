import { Chance } from 'chance';

const chance = new Chance();
const address = [
  {
    id: 1,
    name: chance.name(),
    destination: 'home',
    building: chance.address({ short_suffix: true }),
    street: chance.address({ short_suffix: false }),
    city: chance.city(),
    state: chance.state({ full: true }),
    country: chance.country({ full: true }),
    post: chance.postcode(),
    phone: chance.phone(),
    isDefault: true
  },
  {
    id: 2,
    name: chance.name(),
    destination: 'office',
    building: chance.address({ short_suffix: true }),
    street: chance.address({ short_suffix: false }),
    city: chance.city(),
    state: chance.state({ full: true }),
    country: chance.country({ full: true }),
    post: chance.postcode(),
    phone: chance.phone(),
    isDefault: false
  }
];

export default function handler(req, res) {
  res.status(200).json({ address });
}
