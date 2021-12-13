import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class AddTodoForm extends Component {
  inputRef = React.createRef();
  errorRef = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.inputRef.current.value === "") {
      this.errorRef.current.classList.add("active");
      return null;
    }
    this.errorRef.current.classList.remove("active");

    this.props.addToList(this.inputRef.current.value);
    e.currentTarget.reset();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
          <Input
            placeholder="Todo"
            inputProps={{
              "aria-label": "Description",
            }}
            onChange={this.handleChange}
            inputRef={this.inputRef}
            style={{ width: "90%", color: "white" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "10%", margin: "8px" }}
          >
            Add
          </Button>
        </form>
        <p ref={this.errorRef} className="error">
          Error, must enter a value!
        </p>
      </div>
    );
  }
}

export default AddTodoForm;
