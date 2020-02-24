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

export default function ButtonAppBar() {

  const classes = useStyles();

  return (

    <div class="ui segment">
  <div class="ui two column very relaxed grid">
    <div class="column">
    <div class="ui raised segment">
      <div class="ui placeholder">
        <div class="paragraph">
          <div class="medium line">Student Access!!!!!</div>
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






// <div className={classes.root}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" className={classes.title}>
    //         News
    //       </Typography>
    //       <Button color="inherit"><Link to="/login">Login</Link></Button>
    //     </Toolbar>
    //   </AppBar>
    // </div>