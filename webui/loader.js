export default function myImageLoader({ src, width, quality }) {
  return `https://askbitcoin.ai/${src}?w=${width}&q=${quality || 75}`;
}
