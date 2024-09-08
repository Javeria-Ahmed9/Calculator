import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
export function Calculator() {
  let [input, setInput] = useState("");
  let handleInput = (event) => {
    setInput(input + event.target.value);
  };
  let dletfun = () => {
    let u = input.slice(0, -1);
    console.log(u);
    setInput(u);
  };
  let alldlet = () => {
    setInput("");
  };
  let result = () => {
    let res = eval(input);
    setInput(res);
  };
  return (
    <div className="container border text-center" id="main">
      <input type="button" id="inputId" value={input} />
      <div className="container  text-center" id="content">
        <input type="button" id="btn" value="AC" onClick={alldlet} />
        <input type="button" id="btn" value="DC" onClick={dletfun} />
        <input type="button" id="btn" value="." onClick={handleInput} />
        <input type="button" id="btn" value="/" onClick={handleInput} />
        <input type="button" id="btn" value="7" onClick={handleInput} />
        <input type="button" id="btn" value="8" onClick={handleInput} />
        <input type="button" id="btn" value="9" onClick={handleInput} />
        <input type="button" id="btn" value="*" onClick={handleInput} />
        <input type="button" id="btn" value="4" onClick={handleInput} />
        <input type="button" id="btn" value="5" onClick={handleInput} />
        <input type="button" id="btn" value="6" onClick={handleInput} />
        <input type="button" id="btn" value="+" onClick={handleInput} />
        <input type="button" id="btn" value="1" onClick={handleInput} />
        <input type="button" id="btn" value="2" onClick={handleInput} />
        <input type="button" id="btn" value="3" onClick={handleInput} />
        <input type="button" id="btn" value="-" onClick={handleInput} />
        <input type="button" id="btn" value="00" onClick={handleInput} />
        <input type="button" id="btn" value="0" onClick={handleInput} />
        <input type="button" id="btn" value="=" onClick={result} />
      </div>
    </div>
  );
}
