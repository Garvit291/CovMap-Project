import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../App.css';




const  TCard =({centre})=> {
    return (
        <div className='card'>
        <Card variant="outlined" className={styles.matertialcard}>
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          {centre.properties.title}
        </Typography>
        <Typography variant="body2" component="p">
          {centre.properties.zip}
        </Typography>
      </CardContent>

    </Card>
        </div>
    )
}



export default TCard

