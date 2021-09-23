import "./App.css";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css"; //Example style, you can use another

function App() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [res, setRes] = useState("(1)");
  const OpenAI = require("openai-api");
  const openai = new OpenAI(process.env.REACT_APP_API_KEY);
  function domImage() {
    console.log(code);
    getTime(code);
  }
  async function getTime(code) {
    await openai
      .complete({
        engine: "davinci",
        prompt: code + "The time complexity of this function is O",
        maxTokens: 5,
        temperature: 0,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["\n", "testing"],
      })
      .then((response) => {
        let res = response.data.choices[0].text;
        let start = res.indexOf("(");
        let end = res.indexOf(")");
        if (start !== -1 && end !== -1) {
          setRes(res.slice(start, end + 1));
        } else {
          setRes("Error");
        }
        // setRes(response.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(gptResponse.data);
    // return gptResponse.data;
  }

  return (
    <div className="App flex-col">
      <div className="main">
        <h1 className="">Easy Time Complexity </h1>
        <div className="editor-wrapper">
          <div className="editor-buttons">
            <div className="editor-button"></div>
            <div className="editor-button"></div>
            <div className="editor-button"></div>
          </div>

          <Editor
            className="editor"
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.clike)}
            padding={20}
          />
        </div>

        <button className="btn" onClick={domImage}>
          Calculate
        </button>
        <h2>The time complexity is O{res} </h2>
        <p>Powered By</p>
        <img width="150px" src="openAI.svg" alt="openAI Logo" />
      </div>
    </div>
  );
}

export default App;
