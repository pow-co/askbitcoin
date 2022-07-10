import { Chance } from 'chance';

const chance = new Chance();

let address = [
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
  const data = req.body;
  if (data.isDefault) {
    address = address.map((item) => {
      if (item.isDefault === true) {
        return { ...item, isDefault: false };
      }
      return item;
    });
  }

  address = address.map((item) => {
    if (item.id === data.id) {
      return data;
    }
    return item;
  });
  res.status(200).json({ address });
}
