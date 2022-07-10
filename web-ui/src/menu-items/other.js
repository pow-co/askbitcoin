// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconIdea, IconLightBulb } from '@tabler/icons';

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap
};

console.log('icons', icons)

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'questions',
      title: <FormattedMessage id="questions" />,
      type: 'item',
      url: '/questions',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'answers',
      title: <FormattedMessage id="answers" />,
      type: 'item',
      url: '/answers',
      icon: IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'authors',
      title: <FormattedMessage id="authors" />,
      type: 'item',
      url: '/authors',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'api-documentation',
      title: <FormattedMessage id="api-documentation" />,
      type: 'item',
      url: '/api',
      icon: icons.IconBrandChrome,
      external: true,
      target: true
    },
    {
      id: 'documentation',
      title: <FormattedMessage id="documentation" />,
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
