import React, { useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardItem from './CardItem';
import useCryptoHook from './useCryptoHook';

const Dashboard = (props) => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);

  const { crypto, hasMore, loading, error } = useCryptoHook(pageNumber);

  const observer = useRef();
  const lastCryptoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className={classes.dashboard}>
      {crypto.map((item, index) => {
        if (crypto.length === index + 1) {
          return (
            <div ref={lastCryptoElementRef}>
              <CardItem crypto={item} key={item.id} />
            </div>
          );
        } else {
          return <CardItem crypto={item} key={item.id} />;
        }
      })}
      <div className={classes.spinner}>{loading && <CircularProgress />}</div>
      <div>{error && 'Error occured!'}</div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  spinner: {
    margin: 5,
  },
}));

export default Dashboard;
