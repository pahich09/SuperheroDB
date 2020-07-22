import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from 'react-bootstrap';

export const HeroPagination = props => {

  const {activePage, setActivePage, pages} = props;

  return (
    <Pagination className='pagination'>
      <Pagination.Prev
        disabled={activePage === 1 ? true : false}
        onClick={() => {
          setActivePage(activePage - 1);
        }}/>
      {
        new Array(pages).fill(1).map((el, i) => i + 1)
          .map(page => {
            if (page === activePage) {
              return (<Pagination.Item active
                                       key={page}>
                {page}
              </Pagination.Item>);
            }
            if (page === activePage - 1
              || page === activePage + 1
              || page === 1
              || page === pages) {
              return (<Pagination.Item
                key={page}
                onClick={() => setActivePage(page)}
              >
                {page}
              </Pagination.Item>);
            }
            if (page === activePage - 2 || page === activePage + 2) {
              return <Pagination.Ellipsis key={page}/>;
            }
          })
      }
      <Pagination.Next
        onClick={() => {
          setActivePage(activePage + 1);
        }}
        disabled={activePage === pages ? true : false}
      />
    </Pagination>
  );
};

HeroPagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired
};
HeroPagination.defaultProps = {
  activePage: 1,
  setActivePage: () => {
  },
  pages: 10
};
