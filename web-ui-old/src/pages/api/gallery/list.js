// gallery components
const gallery = [
  {
    id: '#1Gallery',
    image: 'img-gal-1.png',
    title: '1080p_table_denar.pdf',
    dateTime: 'Tue Aug 24 2021'
  },
  {
    id: '#2Gallery',
    image: 'img-gal-2.png',
    title: 'handmade.mp2',
    dateTime: 'Fri Apr 30 2021'
  },
  {
    id: '#3Gallery',
    image: 'img-gal-3.png',
    title: 'granite_cheese.wav',
    dateTime: 'Fri Jun 25 2021'
  },
  {
    id: '#4Gallery',
    image: 'img-gal-4.png',
    title: 'invoice.mpg',
    dateTime: 'Sat Oct 23 2021'
  },
  {
    id: '#5Gallery',
    image: 'img-gal-5.png',
    title: 'benchmark_forge.m1v',
    dateTime: 'Fri Jan 21 2022'
  },
  {
    id: '#6Gallery',
    image: 'img-gal-6.png',
    title: 'violet_withdrawal.png',
    dateTime: 'Wed Sep 22 2021'
  },
  {
    id: '#7Gallery',
    image: 'img-gal-7.png',
    title: 'web_readiness.mpeg',
    dateTime: 'Mon Jul 12 2021'
  },
  {
    id: '#8Gallery',
    image: 'img-gal-8.png',
    title: 'zimbabwe.htm',
    dateTime: 'Sat Mar 20 2021'
  },
  {
    id: '#9Gallery',
    image: 'img-gal-9.png',
    title: 'circuit.m3a',
    dateTime: 'Tue Jan 18 2022'
  },
  {
    id: '#10Gallery',
    image: 'img-gal-10.png',
    title: 'data_red.png',
    dateTime: 'Sun Apr 04 2021'
  },
  {
    id: '#11Gallery',
    image: 'img-gal-11.png',
    title: 'handcrafted.html',
    dateTime: 'Tue May 25 2021'
  },
  {
    id: '#12Gallery',
    image: 'img-gal-12.png',
    title: 'hacking_games.pdf',
    dateTime: 'Tue Oct 19 2021'
  }
];
export default function handler(req, res) {
  return res.status(200).send({ gallery });
}
