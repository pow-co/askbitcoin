import PropTypes from 'prop-types';
import * as React from 'react';

// next imports
import { useRouter } from 'next/router';
import NextLinkComposed from 'NextLinkComposed';

// M-UI
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// other
import clsx from 'clsx';

// =============================|| Custom Link Component ||============================= //

const Anchor = styled('a')({});

const Link = React.forwardRef(({ activeClassName = 'active', as: linkAs, className: classNameProps, href, noLinkStyle, ...other }, ref) => {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
  }

  return <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other} />;
});

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.func,
  className: PropTypes.string,
  href: PropTypes.string,
  noLinkStyle: PropTypes.bool
};

export default Link;
