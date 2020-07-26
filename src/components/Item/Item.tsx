import React from 'react';
import styles from './Item.module.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export interface ItemProps {
  name: string;
  description: string;
}
const Item: React.FC<ItemProps> = (props: ItemProps) => (
  <div className={styles.Item}>
     <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h5" component="h2">
        {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Save</Button>
      </CardActions>
    </Card>
  </div>
);

export default Item;
