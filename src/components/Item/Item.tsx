import React, { useState } from "react";
import styles from "./Item.module.scss";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { prototype } from "events";

export enum Status{
NEW,
TODO,
UNDER_DEV,
TO_DELIVER,
TESTING,
DONE
}

export interface ItemProps {
  id: string;
  name: string;
  description: string;
  status: Status;
  moveToNextColumn: (item: ItemProps) => void;
 
}
const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const [disabled, setDisabled] = useState(props.status !== Status.TODO);
  const [form, setForm] = useState<ItemProps>({...props});

  const handleSubmit = (event: any) => {
    form.id=form.name;
    console.log(JSON.stringify(form));
    setDisabled(true);
    fetch("https://your-node-server-here.com/api/endpoint", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(props),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
  };

  return (
    <div className={styles.Item}>
      <Card>
        <CardContent>
          <form autoComplete="off">
            <TextField
              disabled={disabled}
              id="standard-basic"
              label="Name of task"
              value={props.name}
              onChange={(e) => (form.name = e.target.value)}
            />

            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              disabled={disabled}
              value={props.description}
              rows={4}
              onChange={(e) => (form.description = e.target.value)}
            />
          </form>
        </CardContent>
        <CardActions>
          {props.status === Status.TODO && !disabled? (
            <Button onClick={handleSubmit} size="small">
              Save
            </Button>
          ) : (
            <Button onClick={()=>{props.moveToNextColumn(form)}} size="small">
              Move to next column
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
export default Item;
