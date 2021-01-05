import React from 'react';
import PropTypes from 'prop-types';

Cards.propTypes = {
    data: PropTypes.object,
};

Cards.defaultProps = {
    data: {},
  };

function Cards(props) {

    const {data} = props;

    return (
        <div>
            
        </div>
    );
}

export default Cards;

