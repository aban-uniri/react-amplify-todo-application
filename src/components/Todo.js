import React, { Component } from "react";
import { Delete, Edit } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  Icon: {
    marginLeft: "auto",
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    maxWidth: "500px",
    backgroundColor: "rgba(66, 66, 66, 0.7)",
    color: "white",
  },
};

class Todo extends Component {
  state = {
    fade: false,
  };

  gridRef = React.createRef();

  deleteTodo = () => {
    const fade = true;
    this.setState({ fade });

    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true);
      }, 500);
    });

    promise.then(() => this.props.deleteTodo(this.props.index));
  };

  render() {
    const gridClass = this.state.fade ? "fade-out" : "";

    return (
      <Grid
        xs={12}
        className={`${gridClass}`}
        item
        key={this.props.index}
        ref={this.gridRef}
      >
        <Paper elevation={2} style={styles.Paper}>
          <span style={styles.Todo}>{this.props.todo}</span>
          <IconButton
            color="primary"
            aria-label="Edit"
            style={styles.Icon}
            onClick={() => this.props.updateTodo(this.props.index)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={this.deleteTodo}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
    );
  }
}

export default Todo;
