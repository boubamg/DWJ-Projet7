import React from 'react';
import './Article.css'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CreateComment from '../../Comments/createComment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    boxShadow: " -7px 11px 34px 15px rgba(0,0,0,0.24);",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    margin: "auto"
  },
  media: {
    // maxWidth: '100%',
    // height: 0,
    // paddingTop: '70%',
    height: "40px",
    marginLeft: "113px",
    paddingLeft: "56.25%",
    paddingTop: "56.25%", // 16:9,
    marginTop: "20px",
    width: "30px"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Article(
  {profilePicture, name, likes, attachment, content, handleLikeClick, moreInfoClick, component}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>

      {/* Name / ProfilPicture */}

      <CardHeader onClick={moreInfoClick} 
        avatar={
        <Avatar aria-label="recipe" src={profilePicture} className={classes.avatar}></Avatar> }
        title={name} />

      {/* END Name / ProfilPicture */} 

      {/* Content */}

        {attachment ? 
        <CardMedia
        onClick={moreInfoClick}
        className={classes.media}
        image={attachment}
        /> :
        null}
      
      <CardContent
      onClick={moreInfoClick}>
        <Typography variant="body2" color="textSecondary" component="p">
            {content}
        </Typography>
      </CardContent>

      {/* END Content */}

      <CardActions disableSpacing>
        <IconButton aria-label="likes" onClick={handleLikeClick}>
          <FavoriteIcon /> {likes}
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments" >
          <AddCommentIcon />
        </IconButton>
      </CardActions>
      

        
      {/* Comments */}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          Comment
          </Typography>
          <Typography paragraph>
            Comment
          </Typography>
          <Typography paragraph>
          Comment
          </Typography>
          <Typography>
          Comment
          </Typography>
        </CardContent>
      </Collapse>

      {/* END Comments */}

      {component}

    </Card>
  );
}