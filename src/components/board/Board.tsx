import React, { useState } from "react";
import styles from "./Board.module.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Item, { ItemProps } from '../Item/Item';

const Board: React.FC = () => {

  const [newTasks, setNewTasks] = useState<ItemProps[]>([]);
 

  const createTask= ()=>{ 
    const item = {} as ItemProps;
    item.name ="Test";
    item.description="This is a test";
    newTasks.push(item);
    setNewTasks([...newTasks]);
  }

  return(
  <div className={styles.Board}>
    <Grid spacing={1} container direction="row" justify="space-evenly">
      <Grid item xs={2}>
        <Paper className={styles.paper}>
          <Grid spacing={1} container direction="column" justify="space-evenly">
            <Grid item>To Do</Grid>
            {newTasks.map((itemProps: ItemProps, index: number) => (
             <Grid item>
              <Item key={index.toString()} {...itemProps}/>
              </Grid>
            ))}
            <Grid item>
              <Button variant="contained" onClick={createTask}>Create Task</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={styles.paper}>Under Development</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={styles.paper}>To Deliver</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={styles.paper}>Testing</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={styles.paper}>Done</Paper>
      </Grid>
    </Grid>
  </div>
);
};
export default Board;
