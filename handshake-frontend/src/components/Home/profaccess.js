import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Profaccess() {

  const classes = useStyles();

  return (

    <div class="ui segment">
  <div class="ui two column very relaxed grid">
    <div class="column">
    <div class="ui raised segment">
      <div class="ui placeholder">
        <div class="paragraph">
          <div class="medium line">Professor access!!!!!!</div>
        </div>
      </div>
    </div>
    </div>
    <div class="column">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
  <div class="ui vertical divider">
  </div>
</div>


  );
}
