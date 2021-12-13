import React, { Component } from "react";
import { Save } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";

const styles = {
  Icon: {
    marginLeft: "auto",
    width: "10%",
  },
  Paper: {
    margin: "auto",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    maxWidth: "500px",
    backgroundColor: "rgba(66, 66, 66, 0.7)",
    color: "white",
  },
};

class EditTodo extends Component {
  inputRef = React.createRef();
  handleSave = (e) => {
    e.preventDefault();
    this.props.saveTodo(this.props.index, this.inputRef.current.value);
  };
  render() {
    return (
      <Grid xs={12} item key={this.props.index}>
        <Paper elevation={2} style={styles.Paper}>
          <form onSubmit={this.handleSave} style={{ display: "flex" }}>
            <Input
              style={{ width: "90%", color: "white" }}
              defaultValue={this.props.todo}
              inputRef={this.inputRef}
            />
            <IconButton
              type="submit"
              color="primary"
              aria-label="Add"
              style={styles.Icon}
            >
              <Save fontSize="small" />
            </IconButton>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default EditTodo;
