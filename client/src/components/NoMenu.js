import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import steamingFood from '../../assets/img/steaming.svg';

const NoMenu = ({ loggedIn }) => (
  <div style={{ textAlign: 'center', lineHeight: 1.5 }}>
    <img src={steamingFood} alt="No meal" /><br />
    No menu has been set for the day.<br />
    Our caterers are preparing something amazing!.<br /><br />
    {
      !loggedIn && <div> <Link to="/signup">Sign up</Link> to be notified when menus are set</div>
    }
  </div>
);

NoMenu.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default NoMenu;
