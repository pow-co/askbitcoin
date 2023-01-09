import PropTypes from 'prop-types';
import * as React from 'react';

// next imports
import NextLink from 'next/link';

// M-UI
import { styled } from '@mui/material/styles';

// =============================|| Next Link Component ||============================= //

const Anchor = styled('a')({});

export const NextLinkComposed = React.forwardRef(({ to, linkAs, replace, scroll, shallow, prefetch, locale, ...other }, ref) => (
  <NextLink href={to} prefetch={prefetch} as={linkAs} replace={replace} scroll={scroll} shallow={shallow} passHref locale={locale}>
    <Anchor ref={ref} {...other} />
  </NextLink>
));

NextLinkComposed.propTypes = {
  to: PropTypes.string,
  linkAs: PropTypes.func,
  replace: PropTypes.func,
  scroll: PropTypes.func,
  shallow: PropTypes.func,
  prefetch: PropTypes.func,
  locale: PropTypes.string
};

export default NextLinkComposed;
