import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from '../../../../firebase';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function Post({ articleID, description, fileData, fileType, noLikes, ownerId, timestamp, title}) {

    const [currentUser, setCurrentUser] = React.useState()
    React.useEffect(() => {
      db.collection('users').doc(`${ownerId}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
  }, [])


  var d = timestamp;
//var d =val.timestamp;

//NB: use + before variable name
var date = new Date(+d)

  return (
    <Card sx={{ maxWidth: 320, marginLeft:2, marginTop:2 }}>
    <CardHeader
      avatar={
        <Avatar src={currentUser?.profilePhoto} alt={currentUser?.firstName}/>
          
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={`${currentUser?.firstName} ${currentUser?.lastName}`}
      subheader={`${date.toDateString()}, ${date.toLocaleTimeString()}`}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
       {title}
      </Typography>
    </CardContent>
    <CardActions style={{justifyContent:'space-between'}}>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <ExpandMore
        aria-label="show more"
      >
      <ShareIcon />
      </ExpandMore>
    </CardActions>
  </Card>
   );
}