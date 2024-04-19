import { Inter, Poppins } from "next/font/google";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { BiLogoJavascript, BiSolidFileCss } from "react-icons/bi";

import MonacoEditor, { loader } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/components/loading";
import Select from "@/components/Select";
import { ChangeLanguage } from "@/hook/MonacoAssist";

import Example from "@/data/example.json";
import { OptionsMonaco } from "@/hook/ConfigMonaco";
import { GetTokenId } from "@/hook/Api";
import { BodyExec } from "@/hook/BodyApi";
import "./themeEditor";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const listLanguages = [
  {
    name: "JavaScript",
    value: "javascript",
  },
  // {
  //   name: "MYSQL",
  //   value: "mysql",
  // },
];

export default function Home() {
  const tokenId = Cookies.get("__tknId")
    ? JSON.parse(Cookies.get("__tknId"))
    : null;

  const [loading, setLoading] = useState(false);
  const [javascript, setJavascript] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(listLanguages[0]);

  const [consoleOutput, setConsoleOutput] = useState("");

  useEffect(() => {
    if (!tokenId) {
      GetTokenId();
    }
  }, [tokenId]);

  const handleSubmitCode = async (value) => {
    setLoading(true);
    const body = BodyExec("javascript", value);

    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/code/exec`,
        body
      );

      setLoading(false);
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
        handleSubmitCode(javascript); // Eksekusi fungsi handleSubmitCode
      }
    };

    // Menambahkan event listener pada komponen sekarang (dalam hal ini, mungkin akan ditambahkan pada document)
    document.addEventListener("keydown", handleKeyDown);

    // Membersihkan event listener saat komponen dibongkar
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [javascript]);

  // get example value in data/example.json
  useEffect(() => {
    if (selectedLanguage) {
      const ex = Example.filter((ex) => ex.lang === selectedLanguage.value)[0]
        .syntax;

      setJavascript(ex);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    ChangeLanguage("javascript");
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     loader.init().then((monaco) => {
  //       monaco.editor.defineTheme("dark-editor-theme", {
  //         base: "vs-dark",
  //         inherit: true,
  //         rules: [
  //           {
  //             token: "keyword",
  //             foreground: "#7CDEF4",
  //             fontStyle: "bold",
  //           },
  //           {
  //             token: "comment",
  //             foreground: "#637381",
  //             fontStyle: "italic",
  //           },
  //           {
  //             token: "string",
  //             foreground: "#A5E844",
  //           },
  //           {
  //             token: "variable",
  //             foreground: "#FFD666",
  //           },
  //         ],
  //         colors: {
  //           "editor.background": "#161C24",
  //           "editor.foreground": "#FBF9F1",
  //           // 'editor.lineHighlightBackground': theme.palette.background.paper,
  //           "editor.lineHighlightBorder": "#00000000",
  //         },
  //       });

  //       monaco.editor.addEditorAction({
  //         precondition: null,
  //         keybindingContext: null,
  //         contextMenuGroupId: "navigation",
  //         contextMenuOrder: 1,
  //         id: `run-code`,
  //         label: `Run Code`,
  //         keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
  //         run: (editor) => {
  //           const value = editor.getValue();
  //           handleSubmitCode(value);
  //         },
  //       });
  //     });
  //   }
  // }, []);

  return (
    <main
      className={`${poppins.className} text-text-500 bg-[#161C24] h-[100vh] overflow-hidden`}
    >
      {/* navbar */}
      <nav className="px-4 bg-main-800 py-1.5 shadow shadow-slate-700/20">
        <div className="flex justify-between items-center relative">
          <div className="text-icon hover:rotate-180 duration-700">
            <BsFillEmojiSmileUpsideDownFill className="w-5 h-5" />
          </div>

          <div>
            <p className="font-semibold text-xs text-white opacity-60">
              YuCompiler
            </p>
          </div>

          {/* <div className="absolute left-1/2 -translate-x-1/2 z-30"> */}
          <div className="absolute right-0  z-30">
            {/* <p className="text-sm font-semibold text-icon-js select-none">
              javascript
            </p> */}
            <Select
              data={listLanguages}
              setSelected={setSelectedLanguage}
              selected={selectedLanguage}
              disabled
            />
          </div>

          <div className="flex gap-4 items-center text-sm font-medium ">
            {/* <button className="hover:text-text-800 duration-150">Login</button>
            <button className="text-icon-500 hover:text-icon-800 duration-150">
              SignUp
            </button> */}
          </div>
        </div>
      </nav>
      {/* end navbar */}

      {/* Content */}
      <div className="flex h-full">
        {/* content */}
        <div className="w-full">
          {/* navbar content */}
          <div className="shadow shadow-main-800 font-medium flex justify-between text-sm py-2 mt-2">
            <div />
            <button
              className="pr-6 text-icon-800 hover:opacity-50 duration-150"
              onClick={() => handleSubmitCode(javascript)}
              disabled={loading}
            >
              {loading ? (
                <div className="">
                  <Loading />
                </div>
              ) : (
                <FaPlay color="#A5E844" />
              )}
            </button>
          </div>
          {/* end navbar content */}

          {/* code editor */}
          <div className="h-1/2 px-4 py-2">
            <MonacoEditor
              // theme="editor-theme"
              className="coba"
              height="100%"
              path={"javascript"}
              value={javascript || ""}
              defaultValue={""}
              defaultLanguage={"javascript"}
              options={OptionsMonaco}
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
                {consoleOutput && (
                  <p className="text-xs font-medium text-icon-800">
                    {consoleOutput.executionTime} ms
                  </p>
                )}
              </div>

              <div className=" py-2 h-full">
                <MonacoEditor
                  // theme="editor-theme"
                  className="coba"
                  height="100%"
                  path={"json"}
                  value={consoleOutput.stdout || consoleOutput.stderr || ""}
                  defaultValue={""}
                  defaultLanguage={"json"}
                  options={{ readOnly: true, ...OptionsMonaco }}
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
