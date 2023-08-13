import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";
import { AiFillHtml5 } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { BiLogoJavascript, BiSolidFileCss } from "react-icons/bi";

import MonacoEditor, { loader } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const tokenId = Cookies.get("__tknId")
    ? JSON.parse(Cookies.get("__tknId"))
    : null;

  const [loading, setLoading] = useState(false);
  const [javascript, setJavascript] = useState(examples);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  const [consoleOutput, setConsoleOutput] = useState("");

  const getTokenId = async () => {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/getIdAndToken`);

      Cookies.set("__tknId", JSON.stringify(data));
    } catch (error) {
      console.log("failed to get token");
    }
  };

  useEffect(() => {
    if (!tokenId) {
      getTokenId();
    }
  }, [tokenId]);

  const handleSubmitCode = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.API_URL}/code/exec`, {
        name: "JavaScript",
        title: tokenId?.id,
        version: "ES6",
        mode: "javascript",
        description: null,
        extension: "js",
        languageType: "programming",
        active: true,
        properties: {
          language: "javascript",
          docs: true,
          tutorials: true,
          cheatsheets: true,
          filesEditable: true,
          filesDeletable: true,
          files: [
            {
              name: "index.js",
              content: javascript,
            },
          ],
          newFileOptions: [
            {
              helpText: "New JS file",
              name: "script${i}.js",
              content:
                "/**\n *  In main file\n *  let script${i} = require('./script${i}');\n *  console.log(script${i}.sum(1, 2));\n */\n\nfunction sum(a, b) {\n    return a + b;\n}\n\nmodule.exports = { sum };",
            },
            {
              helpText: "Add Dependencies",
              name: "package.json",
              content:
                '{\n  "name": "main_app",\n  "version": "1.0.0",\n  "description": "",\n  "main": "HelloWorld.js",\n  "dependencies": {\n    "lodash": "^4.17.21"\n  }\n}',
            },
          ],
        },
        visibility: "public",
        _id: tokenId?.id,
        user: null,
        idToken: tokenId?.token,
      });

      setLoading(false);

      console.log(data);

      setConsoleOutput(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Cek apakah tombol yang ditekan adalah "Enter" dan Ctrl juga ditekan
      if (event.key === "Enter" && event.ctrlKey) {
        event.preventDefault(); // Mencegah aksi default (pindah baris dalam textarea, dll.)
        handleSubmitCode(); // Eksekusi fungsi handleSubmitCode
      }
    };

    // Menambahkan event listener pada komponen sekarang (dalam hal ini, mungkin akan ditambahkan pada document)
    document.addEventListener("keydown", handleKeyDown);

    // Membersihkan event listener saat komponen dibongkar
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Tidak ada dependensi, jadi ini hanya dijalankan sekali saat komponen pertama kali dirender

  return (
    <main
      className={`${poppins.className} text-text-500 bg-main-500 h-[100vh] overflow-hidden`}
    >
      {/* navbar */}
      <nav className="px-4 bg-main-800 py-1.5 shadow shadow-slate-700/20">
        <div className="flex justify-between items-center">
          <div className="text-icon hover:rotate-180 duration-700">
            <BsFillEmojiSmileUpsideDownFill className="w-5 h-5" />
          </div>

          <p className="text-sm font-semibold text-icon-js">javascript</p>

          <div className="flex gap-4 items-center text-sm font-medium ">
            <button className="hover:text-text-800 duration-150">Login</button>
            <button className="text-icon-500 hover:text-icon-800 duration-150">
              SignUp
            </button>
          </div>
        </div>
      </nav>
      {/* end navbar */}

      {/* Content */}
      <div className="flex h-full">
        {/* sidebar */}
        <div className="w-[15%] shadow-sm shadow-text-800/30  py-4 flex flex-col">
          {/* <div className="flex gap-2 items-center px-4 py-1.5">
            <AiFillHtml5 className="w-5 h-5 text-icon-html" />
            <p className="text-xs font-medium tracking-wide">index.html</p>
          </div> */}
          {/* <div className="flex gap-2 items-center px-4 py-1.5">
            <BiSolidFileCss className="w-5 h-5 text-icon-css" />
            <p className="text-xs font-medium tracking-wide">style.css</p>
          </div> */}
          <div className="flex gap-2 items-center px-4 py-1.5 bg-main-800">
            <BiLogoJavascript className="w-5 h-5 text-icon-js" />
            <p className="text-xs font-medium tracking-wide">index.js</p>
          </div>
        </div>
        {/* end sidebar */}

        {/* content */}
        <div className="w-full">
          {/* navbar content */}
          <div className="shadow shadow-main-800 font-medium flex justify-between text-sm py-2">
            <div className="flex">
              {/* <button className="px-4 border-r border-text-500">
                index.html
              </button>
              <button className="px-4 border-r border-text-500">
                style.css
              </button> */}
              <button className="px-4 border-text-500 text-text-800">
                index.js
              </button>
            </div>
            <button
              className="pr-6 text-icon-800 hover:opacity-50 duration-150"
              onClick={handleSubmitCode}
              disabled={loading}
            >
              {loading ? (
                <div className="">
                  <Loading />
                </div>
              ) : (
                <FaPlay />
              )}
            </button>
          </div>
          {/* end navbar content */}

          {/* code editor */}
          <div className="h-1/2 px-4 py-2">
            <MonacoEditor
              theme={"vs-dark"}
              className="coba"
              height="100%"
              path={"javascript"}
              value={javascript || ""}
              defaultValue={examples || ""}
              defaultLanguage={"javascript"}
              options={options}
              onChange={(value) => {
                setJavascript(value);
              }}
            />
          </div>
          {/* end code editor */}

          {/* output */}
          <div className="h-1/2 flex shadow-sm shadow-text-800/30 border-t border-text-500/20 px-2">
            {/* console */}
            <div className="w-full border-text-500/20 flex flex-col p-2">
              <div className="flex items-center justify-between pr-4">
                <p className="font-medium text-sm">Console:</p>
                <p className="text-xs font-medium text-icon-800">
                  {consoleOutput.executionTime} ms
                </p>
              </div>

              <div className=" py-2 h-full">
                <MonacoEditor
                  theme={"vs-dark"}
                  className="coba"
                  height="100%"
                  path={"json"}
                  value={consoleOutput.stdout || consoleOutput.stderr || ""}
                  defaultValue={""}
                  defaultLanguage={"json"}
                  options={{ readOnly: true, ...options }}
                  // beforeMount={handleEditorWillMount}
                />
              </div>
            </div>
            {/* end console */}

            {/* Result */}
            {/* <div className="p-2">Result</div> */}
            {/* end result */}
          </div>
          {/* end output */}
        </div>
        {/* end content */}
      </div>
    </main>
  );
}

// const defineTheme = (theme) => {
//   return new Promise((res) => {
//     Promise.all([
//       loader.init(),
//       import(`monaco-themes/themes/${theme}.json`),
//     ]).then(([monaco, themeData]) => {
//       console.log(monaco);
//       monaco.editor.defineTheme(theme, themeData);
//       res();
//     });
//   });
// };

const options = {
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: "on",
  accessibilitySupport: "auto",
  autoIndent: false,
  automaticLayout: true,
  codeLens: true,
  colorDecorators: true,
  contextmenu: true,
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: false,
  cursorStyle: "line",
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  dragAndDrop: false,
  fixedOverflowWidgets: false,
  folding: true,
  foldingStrategy: "auto",
  fontLigatures: false,
  formatOnPaste: false,
  formatOnType: false,
  hideCursorInOverviewRuler: false,
  highlightActiveIndentGuide: true,
  links: true,
  mouseWheelZoom: false,
  multiCursorMergeOverlapping: true,
  multiCursorModifier: "alt",
  overviewRulerBorder: true,
  overviewRulerLanes: 2,
  quickSuggestions: true,
  quickSuggestionsDelay: 100,
  renderControlCharacters: false,
  renderFinalNewline: true,
  renderIndentGuides: true,
  renderLineHighlight: "all",
  renderWhitespace: "none",
  revealHorizontalRightPadding: 30,
  roundedSelection: true,
  rulers: [],
  scrollBeyondLastColumn: 5,
  scrollBeyondLastLine: true,
  selectOnLineNumbers: true,
  selectionClipboard: true,
  selectionHighlight: true,
  showFoldingControls: "mouseover",
  smoothScrolling: false,
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: true,
  wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
  wordWrap: "off",
  wordWrapBreakAfterCharacters: "\t})]?|&,;",
  wordWrapBreakBeforeCharacters: "{([+",
  wordWrapBreakObtrusiveCharacters: ".",
  wordWrapColumn: 80,
  wordWrapMinified: true,
  wrappingIndent: "none",
};

const examples = `// Example program

const data = [
  { "hari": "Senin", "nilai": 30 },
  { "hari": "Selasa", "nilai": 40 },
  { "hari": "Rabu", "nilai": 35 },
  { "hari": "Kamis", "nilai": 55 },
  { "hari": "Jumat", "nilai": 60 },
  { "hari": "Sabtu", "nilai": 45 },
  { "hari": "Minggu", "nilai": 20 }
]

console.log(data)

`;
