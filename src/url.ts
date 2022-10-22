
export function formatStringAsUrlStub(s: string): string {

  return s
    .replace(/'/g, '')
    .replace(/[^a-z0-9 _-]/gi, ' ')
    .replace('-', ' ')
    .replace(/\s{2,}/g," ")
    .trim()
    .replace(/ /g, '-')
    .toLowerCase();
}
