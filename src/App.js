import React, { Component } from "react";
import "./App.css";
import Head from "./Head";
// import Postit from "./Postit/Postit";
import UpdateForm from "./UpdateForm/UpdateForm";
import Form from "./Form/Form";

class App extends Component {
  state = {
    postits: [
      {
        title: "北海道",
        content: "紫の絨毯を広げたかのようなラベンダー畑。",
        colour: "pink",
        key: "123hj$%656"
      },
      {
        title: "ロンドン",
        content: "歴史ある建築とモダンな雰囲気が混ざり合っている",
        colour: "#bce6eb",
        key: "456k$%6lMy45"
      }
    ],
    toggleEditScreen: false,
    postToEdit: undefined
  };

  //POSTを作る
  createPostit = (colour, title, content) => {
    let postits = [...this.state.postits];
    let newPost = {};

    newPost.colour = colour;
    newPost.title = title;
    newPost.content = content;
    newPost.key = title + Math.random();
    postits.push(newPost);
    this.setState({ postits: postits });
  };

  //Need to: Refractor & combine with onDragStart
  //編集
  findPostToEdit = (key) => {
    let newPostitsArray = [];
    let postits = [...this.state.postits];
    let postToEdit = {};

    postits.forEach((post) => {
      if (post.key !== key) {
        newPostitsArray.push(post);
      } else {
        postToEdit = post;
      }
    });
    this.setState({
      postits: newPostitsArray,
      postToEdit: postToEdit,
      toggleEditScreen: true
    });
  };

  //編集内容アップデート
  updatePostIt = (colour, title, content) => {
    let postits = [...this.state.postits];
    let postToEdit = this.state.postToEdit;
    postToEdit.colour = colour;
    postToEdit.title = title;
    postToEdit.content = content;
    postToEdit.key = title + Math.random();
    postits.push(postToEdit);
    this.setState({ postits: postits, toggleEditScreen: false });
  };

  // Need to: Refractor & combine with findPostToEdit
  // ポストをドラッグする
  onDragStart = (key) => {
    let postits = [...this.state.postits];
    let postToEdit = {};
    postits.forEach((post) => {
      if (post.key === key) {
        postToEdit = post;
      }
      this.setState({ postToEdit: postToEdit });
    });
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  //ポストを削除する
  onDrop = () => {
    let key = this.state.postToEdit.key;
    let newPostitsArray = [];
    let postits = [...this.state.postits];
    postits.forEach((post) => {
      if (post.key !== key) {
        newPostitsArray.push(post);
      } else {
      }
    });
    this.setState({ postits: newPostitsArray });
  };

  render() {
    // let postits = (
    //   <div>
    //     {this.state.postits
    //       .map((p) => {
    //         return (
    //           <Postit
    //             colour={p.colour}
    //             title={p.title}
    //             content={p.content}
    //             key={p.key}
    //             onClick={(key) => this.findPostToEdit(p.key)}
    //             onDragStart={(key) => this.onDragStart(p.key)}
    //           />
    //         );
    //       })
    //       //reversing the array so the latest postit shows first
    //       .reverse()}
    //   </div>
    // );

    //編集の画面
    let editScreen;
    if (this.state.toggleEditScreen) {
      editScreen = (
        <UpdateForm
          colour={this.state.postToEdit.colour}
          title={this.state.postToEdit.title}
          content={this.state.postToEdit.content}
          key={this.state.postToEdit.key}
          updatePostIt={this.updatePostIt}
        />
      );
    } else {
    }

    //THE RETURN BLOCK
    return (
      <div className="App">
        <Head />
        <header className="App-header">
          <div className="wrapper">
            <Form createPostit={this.createPostit} />
            <div
              className="trash-can"
              onDrop={() => this.onDrop()}
              onDragOver={(e) => this.onDragOver(e)}
            >
              <h2> 🗑️ </h2>
              <h4> ドラッグ & 削除</h4>
            </div>
          </div>
        </header>

        {/* <ul>{postits}</ul> */}
        {editScreen}
      </div>
    );
  }
}

export default App;


