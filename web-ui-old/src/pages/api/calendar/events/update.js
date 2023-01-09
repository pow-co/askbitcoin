import { add, set, sub } from 'date-fns';
import value from 'scss/_themes-vars.module.scss';
import _ from 'lodash';

let events = [
  {
    id: '5e8882f1f0c9216397e05a9b',
    allDay: false,
    color: value.secondaryMain,
    description: 'SCRUM Planning',
    start: sub(new Date(), { days: 12, hours: 0, minutes: 45 }),
    end: sub(new Date(), { days: 12, hours: 0, minutes: 30 }),
    title: 'Repeating Event'
  },
  {
    id: '5e8882fcd525e076b3c1542c',
    allDay: true,
    color: value.orangeLight,
    textColor: value.orangeDark,
    description: 'Sorry, John!',
    start: sub(new Date(), { days: 8, hours: 0, minutes: 45 }),
    end: sub(new Date(), { days: 8, hours: 0, minutes: 30 }),
    title: 'Conference'
  },
  {
    id: '5e8882e440f6322fa399eeb8',
    allDay: true,
    color: value.successLight,
    textColor: value.successDark,
    description: 'Inform about new contract',
    start: sub(new Date(), { days: 6, hours: 6, minutes: 30 }),
    end: sub(new Date(), { days: 7, hours: 4, minutes: 30 }),
    title: 'All Day Event'
  },
  {
    id: '5e88830672d089c53c46ece3',
    allDay: false,
    color: value.primaryMain,
    description: 'Get a new quote for the payment processor',
    start: set(new Date(), { hours: 10, minutes: 30 }),
    end: set(new Date(), { hours: 13, minutes: 30 }),
    title: 'Lunch'
  },
  {
    id: '5e888302e62149e4b49aa609',
    allDay: false,
    textColor: value.grey900,
    color: value.warningMain,
    description: 'Discuss about the new project',
    start: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
    end: add(new Date(), { days: 2, hours: 3, minutes: 20 }),
    title: 'Meeting'
  },
  {
    id: '5e888302e62149e4b49aa709',
    allDay: false,
    color: value.errorDark,
    description: "Let's Go",
    start: add(new Date(), { days: 2, hours: 2, minutes: 30 }),
    end: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
    title: 'Birthday Party'
  },
  {
    id: '5e8882f1f0c9216396e05a9b',
    allDay: false,
    color: value.secondaryMain,
    description: 'SCRUM Planning',
    start: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
    end: add(new Date(), { days: 2, hours: 4, minutes: 30 }),
    title: 'Repeating Event'
  },
  {
    id: '5e888302e62149e4b49aa610',
    allDay: false,
    color: value.grey500,
    description: "Let's Go",
    start: add(new Date(), { days: 2, hours: 3, minutes: 45 }),
    end: add(new Date(), { days: 2, hours: 4, minutes: 50 }),
    title: 'Dinner'
  },
  {
    id: '5e8882eb5f8ec686220ff131',
    allDay: true,
    color: value.secondaryLight,
    textColor: value.secondaryDark,
    description: 'Discuss about new partnership',
    start: add(new Date(), { days: 5, hours: 0, minutes: 0 }),
    end: add(new Date(), { days: 8, hours: 1, minutes: 0 }),
    title: 'Long Event'
  },
  {
    id: '5e888302e62349e4b49aa609',
    allDay: false,
    color: value.primaryLight,
    textColor: value.primary800,
    description: 'Discuss about the project launch',
    start: add(new Date(), { days: 6, hours: 0, minutes: 15 }),
    end: add(new Date(), { days: 6, hours: 0, minutes: 20 }),
    title: 'Meeting'
  },
  {
    id: '5e888302e62149e4b49ab609',
    allDay: false,
    color: value.successMain,
    description: 'Discuss about the tour',
    start: add(new Date(), { days: 12, hours: 3, minutes: 45 }),
    end: add(new Date(), { days: 12, hours: 4, minutes: 50 }),
    title: 'Happy Hour'
  }
];

export default function handler(req, res) {
  const { eventId, update } = req.body;

  events = _.map(events, (_event) => {
    if (_event.id === eventId) {
      _.assign(_event, { ...update });
    }

    return _event;
  });
  return res.status(200).json({ events });
}
