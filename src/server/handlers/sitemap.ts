
const { create } = require('xmlbuilder2');

import * as models from '../../models'

import * as moment from 'moment'

export async function index(req, h) {

  try {

    const questions: any = await models.Question.aggregate('url_stub', 'DISTINCT', { plain: false })

    const root = create().ele('urlset')

    root.att('xmlns', "http://www.sitemaps.org/schemas/sitemap/0.9")

    for (let question of questions) {

      const url = root.ele('url')

      url.ele('loc').txt(`https://askbitcoin.ai/${question['DISTINCT']}`).up()

      url.ele('lastmod').txt(moment().subtract(1, 'day').format('YYYY-MM-DD')).up()

      url.ele('changefreq').txt('daily').up()

      url.ele('priority').txt('0.5').up()

    }

    const xml = root.end({ prettyPrint: true });

    console.log(xml);

    return h.response(xml).type('text/xml')

  } catch(error) {

    console.error(error)

  }

}

