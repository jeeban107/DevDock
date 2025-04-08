import React, { useEffect, useState } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const Editior = () => {
  const { projectID } = useParams(); // ✅ Fixed: moved useParams to top-level

  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// JavaScript code here");
  const [javaCode, setJavaCode] = useState(`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}`);
  const [pyCode, setPyCode] = useState(`print("Hello, Python!")`);
  const [cCode, setCCode] = useState(`#include <stdio.h>

int main() {
  printf("Hello, C!");
  return 0;
}`);

  const changeTheme = () => {
    if (isLightMode) {
      document.querySelector(".EditorNavbar").style.background = "#482A81";
      document.body.classList.remove("lightmode");
      setIsLightMode(false);
    } else {
      document.querySelector(".EditorNavbar").style.background = "#482A81";
      document.querySelector(".EditorNavbar").style.color = "#f4f4f4";
      document.body.classList.add("lightmode");
      setIsLightMode(true);
    }
  };

  const run = async () => {
    const iframe = document.getElementById("iframe");

    if (tab === "html" || tab === "css" || tab === "js") {
      const html = htmlCode;
      const css = `<style>${cssCode}</style>`;
      const js = `<script>${jsCode}<\/script>`;
      iframe.srcdoc = html + css + js;
    } else {
      let sourceCode = "";
      let languageId = 0;

      if (tab === "java") {
        sourceCode = javaCode;
        languageId = 62;
      } else if (tab === "python") {
        sourceCode = pyCode;
        languageId = 71;
      } else if (tab === "c") {
        sourceCode = cCode;
        languageId = 50;
      }

      iframe.srcdoc = `<h3>Running...</h3>`;

      try {
        const res = await fetch(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key":
                "b6131ea70bmshb1e123054f7c896p142dacjsn45748478c7e8",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
              source_code: sourceCode,
              language_id: languageId,
            }),
          }
        );

        const data = await res.json();
        const output =
          data.stdout || data.stderr || data.compile_output || "No output";
        iframe.srcdoc = `<body style="padding: 10px; font-family: sans-serif;"><h3>Output:</h3><pre>${output}</pre></body>`;
      } catch (err) {
        iframe.srcdoc = `<h3>Error running code</h3><pre>${err.message}</pre>`;
      }
    }
  };

  useEffect(() => {
    run(); // Run code on tab switch
  }, [tab]);

  useEffect(() => {
    fetch(api_base_url + "/getproject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      })
      .catch((err) => {
        console.error("Failed to fetch project data:", err);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default save file dialog

        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID, // Make sure projectID is correct
            htmlCode: htmlCode, // Passing the current HTML code
            cssCode: cssCode, // Passing the current CSS code
            jsCode: jsCode, // Passing the current JS code
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditorNavbar isLightMode={isLightMode} />
      <div className="flex">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs flex items-center justify-between gap-2 w-full h-[60px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              {["html", "css", "js", "java", "python", "c"].map((language) => (
                <div
                  key={language}
                  onClick={() => setTab(language)}
                  className="tab cursor-pointer p-[6px] bg-[#1a1a2e] px-[10px] text-[15px]"
                >
                  {language.toUpperCase()}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <i className="cursor-pointer text-[20px]" onClick={changeTheme}>
                <MdLightMode />
              </i>
              <i
                className="cursor-pointer text-[20px]"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <FaExpandAlt />
              </i>
            </div>
          </div>

          <Editor
            onChange={(e) => {
              switch (tab) {
                case "html":
                  setHtmlCode(e);
                  break;
                case "css":
                  setCssCode(e);
                  break;
                case "js":
                  setJsCode(e);
                  break;
                case "java":
                  setJavaCode(e);
                  break;
                case "python":
                  setPyCode(e);
                  break;
                case "c":
                  setCCode(e);
                  break;
                default:
                  break;
              }
              run();
            }}
            height="77vh"
            theme={isLightMode ? "vs-light" : "vs-dark"}
            language={tab === "js" ? "javascript" : tab}
            value={
              tab === "html"
                ? htmlCode
                : tab === "css"
                ? cssCode
                : tab === "js"
                ? jsCode
                : tab === "java"
                ? javaCode
                : tab === "python"
                ? pyCode
                : cCode
            }
          />
        </div>
        <iframe
          id="iframe"
          className={`min-h-[77vh] bg-[#fff] text-black transition-all duration-300 ${
            isExpanded ? "w-0 hidden" : "w-1/2"
          }`}
        ></iframe>
      </div>
    </>
  );
};

export default Editior;
