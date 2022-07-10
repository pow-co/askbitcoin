import { Chance } from 'chance';

const chance = new Chance();
let amount;

export default function handler(req, res) {
  const { total, code } = req.body;
  amount = 0;
  if (total > 0) {
    switch (code) {
      case 'BERRY50':
        amount = chance.integer({ min: 1, max: total < 49 ? total : 49 });
        break;
      case 'FLAT05':
        amount = total < 5 ? total : 5;
        break;
      case 'SUB150':
        amount = total < 150 ? total : 150;
        break;
      case 'UPTO200':
        amount = chance.integer({ min: 1, max: total < 199 ? total : 199 });
        break;
      default:
        amount = 0;
    }
  }
  return res.status(200).json({ amount });
}
