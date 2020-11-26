import React from "react";

class UpdateForm extends React.Component {
  state = {
    colour: this.props.colour,
    title: this.props.title,
    content: this.props.content
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updatePostIt(
      this.state.colour,
      this.state.title,
      this.state.content
    );
  };

  render() {
    let style = { backgroundColor: this.state.colour };
    return (
      <div>
        {/* Form */}
        <div className="form-background">
          <form className="update-form" style={style}>
            <h2 className="updateh2">編集画面</h2>
            <p>{this.state.errorMessage}</p>

            <p className="updatep">
              <label className="updateLabel"> 旅行先 </label>
              <input
                type="text"
                className="textfield"
                placeholder="Title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />{" "}
            </p>
            <br />

            <p className="updatep">
              <label className="updateLabel"> 感想 </label>
              <textarea
                type="text"
                className="textfield"
                placeholder="Content"
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              ></textarea>{" "}
            </p>
            <br />
            <button className="editbtn" onClick={(e) => this.onSubmit(e)}>
              編集
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateForm;
