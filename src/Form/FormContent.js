import React, { useState, useEffect } from "react";
import "./Form.css";
import { db } from "../firebase";

const FormContent = () => {
 // 1.記述
  const [data, setData] = useState([{id:"", place:"", comment:"", color:""}]);
  // 記述登録１
  const [inputValueone, setInputValueone] = useState("");
  const [inputValuetwo, setInputValuetwo] = useState("");
  const [inputValuethree, setInputValuethree] = useState("");

  // フォーム入力部分のイベント
  const handleInputchangeplace = (e) =>{
    // console.logを使って[e]をみてみよう！イベントオブジェクト
    setInputValueone(e.target.value);
  };
  const handleInputchangecomment = (e) =>{
    // console.logを使って[e]をみてみよう！イベントオブジェクト
    setInputValuetwo(e.target.value);
  };
  const handleInputchangecolor = (e) =>{
    // console.logを使って[e]をみてみよう！イベントオブジェクト
    setInputValuethree(e.target.value);
  };
  
 
  // 送信部分の処理
  const addInputData = (e) =>{
   e.preventDefault();

  // groupという入れ物に[add(追加)]を使ってオブジェクトの形式で登録する
  // idは自動で入るので、inputValueをtitleという場所の値にセットすることで登録ができる
  db.collection("group").add({place:inputValueone,comment:inputValuetwo,color:inputValuethree});
  setInputValueone(""); //setInputValueを使って[inputValue]を初期化（空にする）
  setInputValuetwo(""); //setInputValueを使って[inputValue]を初期化（空にする）
  setInputValuethree(""); //setInputValueを使って[inputValue]を初期化（空にする）
}

  // 2.記述
  useEffect(() => {
    const firebaseData = db
    .collection("group")
    .orderBy("place", "asc")
    .onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          place: dbData.data().place,
          comment: dbData.data().comment,
          color: dbData.data().color,
        }))
      );
    });

    return () => firebaseData();
  },[]); //←ここに最後一つ書きたします

  // ここに記述、usestateで作ったdata変数をコンソールログで表示
  // console.log(data);
  return (
    <div>
        {/* Form */}
        <form className="form">
            <h2 className="formh2">旅行の感想をみんなと共有しよう</h2>
            {/* <p>{this.state.errorMessage}</p> */}
  
            <p className="formp">
              <label className="floatLabel">旅行先</label>
              <input
                type="text"
                className="textfield forminput"
                placeholder="旅行先 (*必須)"
                value={inputValueone}
                onChange={handleInputchangeplace}
                // value={this.state.title}
                // onChange={(e) => this.setState({ title: e.target.value })}
              />
            </p>
            <br />
  
            <p className="formp">
              <label className="floatLabel">感想</label>
              <textarea
                type="text"
                className="textfield forminput"
                placeholder="感想"
                value={inputValuetwo}
                onChange={handleInputchangecomment}
                // value={this.state.content}
                // onChange={(e) => this.setState({ content: e.target.value })}
                row="100"
                size="80"
              ></textarea>
            </p>
            <br />
  
            {/* Select Dropdown */}
            <p className="formp">
              <label className="floatLabel">ポストイットの色</label>
              <select
                className="textfield forminput"
                onChange={handleInputchangecolor}
                // onChange={(e) => this.setState({ colour: e.target.value })}
              >
                <option value="" disabled selected>
                  ポストイットの色
                </option>
                <option value="pink">Pink</option>
                <option value="#bce6eb">Blue</option>
                <option value="#fcf876">Yellow</option>
                <option value="#cee397">Green</option>
              </select>
            </p>
  
            {/* <button className="mainbtn" onClick={(e) => this.onSubmit(e)}>
              共有する
            </button> */}

            <button className="mainbtn" disabled={!inputValueone} onClick={addInputData}>
            {/* AddBoxIconにこれはマテリアルUIの画像です */}
                共有する
            </button> 
  
          </form>

          {data.map((dataItem) => (
          <div className="box">
            <h1 key = {dataItem.id}>{dataItem.place}</h1>
            <h3>{dataItem.comment}</h3>
            <h3>{dataItem.color}</h3>
          </div>

        

      ))}


        </div>
        
  );

};

export default FormContent