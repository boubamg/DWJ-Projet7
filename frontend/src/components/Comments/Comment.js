import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: yellow[500],
  },
}));

export default function Comment({profilePicture, name, comment, handleDeleteComment, handleUpdateComment}) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={profilePicture} className={classes.avatar}>
          </Avatar>
        }
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment}
        </Typography>
        
      </CardContent>
      
      <Button color="secondary" onClick={handleDeleteComment} >supprimer</Button>
      <Button color="primary" onClick={handleUpdateComment}>Update</Button>

    </Card>
  );
}
