import React, { useState } from "react";
import styles from "./Board.module.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Item, { ItemProps, Status } from "../Item/Item";

const Board: React.FC = () => {
  const [newTasks, setNewTasks] = useState<ItemProps[]>([]);
  const [tasksUnderDev, setTasksUnderDev] = useState<ItemProps[]>([]);
  const [tasksToTest, setTasksToTest] = useState<ItemProps[]>([]);
  const [tasksToDeliver, setTasksToDeliver] = useState<ItemProps[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ItemProps[]>([]);

  const createTask = () => {
    const item = {} as ItemProps;
    item.status = Status.TODO;
    item.moveToNextColumn = moveToNextColumn;
    setNewTasks([...newTasks, item]);
  };

  const moveToNextColumn = (item: ItemProps) => {
    switch (item.status) {
      case Status.TODO: {
        item.status = Status.UNDER_DEV;
        setTasksUnderDev((newTasks) => [...newTasks, item]);
        setNewTasks((newTasks) =>
          newTasks.filter((newItem) => newItem.id !== item.id)
        );
        break;
      }
      case Status.UNDER_DEV: {
        item.status = Status.TO_DELIVER;
        setTasksToDeliver((tasks) => [...tasks, item]);
        setTasksUnderDev((newTasks) =>
          newTasks.filter((newItem) => newItem.id !== item.id)
        );
        break;
      }
      case Status.TO_DELIVER: {
        item.status = Status.TESTING;
        setTasksToTest((tasks) => [...tasks, item]);
        setTasksToDeliver((newTasks) =>
          newTasks.filter((newItem) => newItem.id !== item.id)
        );
        break;
      }
      case Status.TESTING: {
        item.status = Status.DONE;
        setCompletedTasks((tasks) => [...tasks, item]);
        setTasksToTest((newTasks) =>
          newTasks.filter((newItem) => newItem.id !== item.id)
        );
        break;
      }
      case Status.DONE: {
        break;
      }
    }
  };

  return (
    <div className={styles.Board}>
      <Grid spacing={1} container direction="row" justify="space-evenly">
        <Grid item xs={2}>
          <Paper className={styles.paper}>
            <Grid
              spacing={1}
              container
              direction="column"
              justify="space-evenly"
            >
              <Grid item>To Do</Grid>
              {newTasks.map((itemProps: ItemProps, index: number) => (
                <div key={index.toString()}>
                  <Grid item>
                    <Item {...itemProps} />
                  </Grid>
                </div>
              ))}
              <Grid item>
                <Button variant="contained" onClick={createTask}>
                  Create Task
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={styles.paper}>
            <Grid
              spacing={1}
              container
              direction="column"
              justify="space-evenly"
            >
              <Grid item>Under Development</Grid>
              {tasksUnderDev.map((itemProps: ItemProps, index: number) => (
                <div key={index.toString()}>
                  <Grid item>
                    <Item {...itemProps} />
                  </Grid>
                </div>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={styles.paper}>
            <Grid
              spacing={1}
              container
              direction="column"
              justify="space-evenly"
            >
              <Grid item>To Deliver</Grid>
              {tasksToDeliver.map((itemProps: ItemProps, index: number) => (
                <div key={index.toString()}>
                  <Grid item>
                    <Item {...itemProps} />
                  </Grid>
                </div>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={styles.paper}>
            <Grid
              spacing={1}
              container
              direction="column"
              justify="space-evenly"
            >
              <Grid item>Testing</Grid>
              {tasksToTest.map((itemProps: ItemProps, index: number) => (
                <div key={index.toString()}>
                  <Grid item>
                    <Item {...itemProps} />
                  </Grid>
                </div>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={styles.paper}>
            <Grid
              spacing={1}
              container
              direction="column"
              justify="space-evenly"
            >
              <Grid item>Done</Grid>
              {completedTasks.map((itemProps: ItemProps, index: number) => (
                <div key={index.toString()}>
                  <Grid item>
                    <Item {...itemProps} />
                  </Grid>
                </div>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default Board;
