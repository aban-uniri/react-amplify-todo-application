import React, { Component, Fragment } from "react";
import AddTodoForm from "../components/AddTodoForm";
import List from "../components/List";
import { Paper, Grid } from "@material-ui/core";
import Snowfall from "react-snowfall";
import { API } from "aws-amplify";
import logo from "./logo.png";
import "./App.css";

const apiName = "todoAPI";
const path = "/todo";
const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    maxWidth: "500px",
    backgroundColor: "rgba(66, 66, 66, 0.7)",
    color: "white",
  },
};

class App extends Component {
  state = {
    list: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await API.get(apiName, path).then(async (response) => {
      let list = { ...this.state.list };
      response.map((item) => {
        list[item["key"]] = item["todo"];
        return null;
      });
      this.setState({ list });
    });
  };

  addToList = async (todo) => {
    let list = { ...this.state.list };
    let key = `todo${Date.now()}`;
    list[key] = {
      todo: todo,
      status: "active",
    };
    await API.post(apiName, path, {
      body: {
        key: key,
        todo: {
          todo: todo,
          status: "active",
        },
      },
    }).then(async (response) => {
      this.setState({ list });
    });
  };
  deleteTodo = async (key) => {
    let list = { ...this.state.list };
    list[key] = null;
    await API.del(apiName, path + `/${key}`).then(async (response) => {
      this.setState({ list });
    });
    this.setState({ list });
  };
  updateTodo = (key) => {
    let list = { ...this.state.list };
    list[key]["status"] = "editing";

    this.setState({ list });
  };
  saveTodo = async (key, todo) => {
    let list = { ...this.state.list };
    list[key] = {
      todo: todo,
      status: "active",
    };

    await API.put(apiName, path, {
      body: {
        key: key,
        todo: {
          todo: todo,
          status: "active",
        },
      },
    }).then(async () => {
      this.setState({ list });
    });
  };
  render() {
    return (
      <div className="app">
        <Snowfall snowflakeCount="140" color="#dee4fd" />
        <Fragment>
          <Grid container spacing={0}>
            <div className="anchor-container">
              <a
                className="title"
                href={"www.antonioban.com"}
                style={{ color: "#dee4fd" }}
              >
                <img src={logo} alt="Snowflake Logo" />
                <h1>ToDo Application</h1>
              </a>
            </div>

            <Grid item xs={12}>
              <Paper style={styles.Paper}>
                <AddTodoForm addToList={this.addToList} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <List
                deleteTodo={this.deleteTodo}
                list={this.state.list}
                updateTodo={this.updateTodo}
                saveTodo={this.saveTodo}
              />
            </Grid>
          </Grid>
        </Fragment>
      </div>
    );
  }
}

export default App;
