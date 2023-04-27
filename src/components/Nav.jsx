import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
const Nav = ({ setLibStatus }) => {
  return (
    <nav>
      <h1>Scutify</h1>
      <button onClick={() => setLibStatus((prevState) => !prevState)}>
        Playlist
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};
export default Nav;
