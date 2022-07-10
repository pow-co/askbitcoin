import PropTypes from 'prop-types';

// project imports
import Customization from './Customization';
import GuestGuard from 'utils/route-guard/GuestGuard';
import NavMotion from './NavMotion';

// ==============================|| MINIMAL LAYOUT ||============================== //

const GuestGuardLayout = ({ children }) => (
  <NavMotion>
    <GuestGuard>
      <>
        {children}
        <Customization />
      </>
    </GuestGuard>
  </NavMotion>
);

GuestGuardLayout.propTypes = {
  children: PropTypes.node
};

export default GuestGuardLayout;
