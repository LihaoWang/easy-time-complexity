import "./App.css";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { FiChevronRight } from "react-icons/fi";
import Loader from "./components/Loader";
import { motion } from "framer-motion";

function App() {
  const [code, setCode] = useState(`def loop(n):
  for i in range(n):
    print(i)`);
  const [res, setRes] = useState("(n)");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const OpenAI = require("openai-api");
  const openai = new OpenAI(process.env.REACT_APP_API_KEY);
  function onSubmit() {
    if (code.length > 800) {
      setError(true);
    } else {
      setError(false);
      getTime(code);
    }
  }

  async function getTime(code) {
    setLoading(true);
    await openai
      .complete({
        engine: "davinci",
        prompt:
          code +
          `
        The time complexity of this function is O`,
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
        // let res = response.data.choices[0].text;
        // let start = res.indexOf("(");
        // let end = res.indexOf(")");
        // if (start !== -1 && end !== -1) {
        //   setRes(res.slice(start, end + 1));
        // } else {
        //   setRes("Error");
        // }

        setRes(response.data.choices[0].text);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // console.log(gptResponse.data);
    // return gptResponse.data;
  }

  return (
    <div className="App">
      <Nav />
      <div className="main">
        <h1 style={{ marginBottom: "10px" }}>Time Complexity,</h1>
        <div className="typewriter">
          <h1 style={{ marginTop: "0px" }} className="typewriter-text">
            Simplified
          </h1>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <div className="editor-bg-wrapper">
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

            <div className="editor-bg"></div>
          </div>
        </motion.div>
        <button
          type="button"
          className="btn flex-row"
          onClick={onSubmit}
          disabled={loading}
        >
          Use AI to evaluate your code{" "}
          <FiChevronRight style={{ marginLeft: "10px" }} />
        </button>
        {error && (
          <span style={{ color: "red" }}>
            In order to prevent spam, the input length is limited to 1000
            characters. Sorry for the inconvenience.
          </span>
        )}

        <div className="open-ai flex-row">
          <p>Powered By</p>
          <img src="openAI.svg" alt="openAI Logo" />
        </div>
        <div className="output-wrapper">
          {/* <div className="output-header">
            <p>Output </p>
          </div> */}
          <div className="output">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <p>Output: </p>
                <h2>The time complexity is O{res} </h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="disclaimer">
            <span role="img" aria-label="warning">
              🔴
            </span>
            The result is for reference purpose only
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
