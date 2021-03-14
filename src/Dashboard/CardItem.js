import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapsible from 'react-collapsible';

import { Sparklines, SparklinesLine } from 'react-sparklines';

const CardItem = (props) => {
  const classes = useStyles();
  const { crypto } = props;

  let card = (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent className={classes.content}>
          <div className={classes.firstContainer}>
            <div className={classes.wrapper}>
              <CardMedia
                className={classes.media}
                image={crypto.image}
                title={crypto.name}
              />
            </div>
            <div className={classes.firstWrapper}>
              <Typography variant='body2' component='p'>
                {crypto.symbol.toUpperCase()}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {crypto.name}
              </Typography>
            </div>
          </div>
          <div className={classes.sparklineWrapper}>
            <Sparklines data={crypto.sparkline_in_7d.price}>
              <SparklinesLine color='#FFA500' />
            </Sparklines>
          </div>
          <div className={classes.wrapper}>
            <Typography variant='body2' component='p'>
              {crypto.total_volume} {crypto.symbol.toUpperCase()}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='span'>
              {'24h volume'}
            </Typography>
          </div>
          <div className={classes.wrapper}>
            <Typography variant='body2' component='p'>
              {`$${crypto.current_price}`}
            </Typography>
            <Typography
              variant='body2'
              color={crypto.ath_change_percentage > 0 ? 'secondary' : 'primary'}
              component='p'
            >
              {`${crypto.ath_change_percentage}%`}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Collapsible trigger={card}>
      <div className={classes.collapse}>
        <Sparklines data={crypto.sparkline_in_7d.price}>
          <SparklinesLine color='#FFA500' />
        </Sparklines>
      </div>
    </Collapsible>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    width: 400,
    marginTop: 5,
    marginBottom: 5,
  },
  media: {
    height: 20,
    width: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sparklineWrapper: {
    width: 80,
  },
  sparkline: {
    color: theme.palette.primary.main,
  },
  collapse: {
    height: 100,
  },
}));

export default CardItem;
