import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const mails = [
  {
    id: '#2Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: false,
    important: true,
    starred: false,
    time: sub(new Date(), { days: 0, hours: 1, minutes: 45 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-3.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' })
    },
    sender: {
      avatar: 'user-4.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.paragraph({ sentences: 1 })
    },
    message: chance.paragraph(),
    attachments: []
  },
  {
    id: '#1Mail_Phoebe',
    subject: chance.sentence({ words: 8 }),
    isRead: true,
    important: false,
    starred: true,
    time: sub(new Date(), { days: 0, hours: 5, minutes: 45 }),
    promotions: true,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' })
    },
    sender: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf'
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2'
      },
      {
        id: '#3Attach',
        image: 'img-gal-3.png',
        title: 'granite_cheese.wav'
      }
    ]
  },
  {
    id: '#3Mail_Phoebe',
    subject: chance.sentence({ words: 5 }),
    isRead: true,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 1, hours: 1, minutes: 0 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-5.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' })
    },
    sender: {
      avatar: 'user-6.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: []
  },
  {
    id: '#4Mail_Phoebe',
    subject: chance.sentence({ words: 12 }),
    isRead: false,
    important: true,
    starred: false,
    time: sub(new Date(), { days: 2, hours: 8, minutes: 15 }),
    promotions: true,
    forums: false,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-7.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' })
    },
    sender: {
      avatar: 'user-8.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2'
      },
      {
        id: '#3Attach',
        image: 'img-gal-3.png',
        title: 'granite_cheese.wav'
      }
    ]
  },
  {
    id: '#5Mail_Phoebe',
    subject: chance.sentence({ words: 8 }),
    isRead: true,
    important: false,
    starred: true,
    time: sub(new Date(), { days: 6, hours: 12, minutes: 55 }),
    promotions: false,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-9.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' })
    },
    sender: {
      avatar: 'user-10.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf'
      },
      {
        id: '#3Attach',
        image: 'img-gal-3.png',
        title: 'granite_cheese.wav'
      }
    ]
  },
  {
    id: '#6Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: true,
    important: true,
    starred: true,
    time: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-11.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' })
    },
    sender: {
      avatar: 'user-12.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: []
  },
  {
    id: '#7Mail_Phoebe',
    subject: chance.sentence({ words: 3 }),
    isRead: true,
    important: false,
    starred: true,
    time: sub(new Date(), { days: 10, hours: 8, minutes: 5 }),
    promotions: false,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com'
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf'
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2'
      }
    ]
  },
  {
    id: '#8Mail_Phoebe',
    subject: chance.sentence({ words: 6 }),
    isRead: false,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 12, hours: 12, minutes: 5 }),
    promotions: true,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-5.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com'
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: []
  },
  {
    id: '#9Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: true,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 13, hours: 12, minutes: 45 }),
    promotions: false,
    forums: false,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com'
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf'
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2'
      }
    ]
  },
  {
    id: '#10Mail_Phoebe',
    subject: chance.sentence({ words: 5 }),
    isRead: true,
    important: true,
    starred: true,
    time: sub(new Date(), { days: 14, hours: 1, minutes: 5 }),
    promotions: true,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-6.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com'
    },
    sender: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf'
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2'
      }
    ]
  },
  {
    id: '#11Mail_Phoebe',
    subject: chance.sentence({ words: 7 }),
    isRead: true,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 14, hours: 11, minutes: 45 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com'
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf'
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2'
      }
    ]
  },
  {
    id: '#12Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: false,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 15, hours: 12, minutes: 5 }),
    promotions: true,
    forums: true,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com'
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 })
    },
    message: chance.paragraph(),
    attachments: []
  }
];

const getInboxMails = () => mails.filter((item) => !item.spam);
const getSentMails = () => mails.filter((item) => item.sent);
const getDraftMails = () => mails.filter((item) => item.draft);
const getSpamMails = () => mails.filter((item) => item.spam);
const getTrashMails = () => mails.filter((item) => item.trash);
const getStarredMails = () => mails.filter((item) => item.starred);
const getImportantMails = () => mails.filter((item) => item.important);
const getPromotionsMails = () => mails.filter((item) => item.promotions);
const getForumMails = () => mails.filter((item) => item.forums);

export default function handler(req, res) {
  const { filter } = req.body;
  let result = [];
  switch (filter) {
    case 'inbox':
      result = getInboxMails();
      break;
    case 'sent':
      result = getSentMails();
      break;
    case 'draft':
      result = getDraftMails();
      break;
    case 'spam':
      result = getSpamMails();
      break;
    case 'trash':
      result = getTrashMails();
      break;
    case 'starred':
      result = getStarredMails();
      break;
    case 'important':
      result = getImportantMails();
      break;
    case 'promotions':
      result = getPromotionsMails();
      break;
    case 'forums':
      result = getForumMails();
      break;
    case 'all':
    default:
      result = mails;
      break;
  }
  return res.status(200).json(result);
}
