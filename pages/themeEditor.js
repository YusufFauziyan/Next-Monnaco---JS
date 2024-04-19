import { loader } from "@monaco-editor/react";

// theme monaco editor
loader.init().then((monaco) => {
  monaco.editor.defineTheme("dark-editor-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "keyword",
        foreground: "#7CDEF4",
        fontStyle: "bold",
      },
      {
        token: "comment",
        foreground: "#637381",
        fontStyle: "italic",
      },
      {
        token: "string",
        foreground: "#A5E844",
      },
      {
        token: "variable",
        foreground: "#FFD666",
      },
    ],
    colors: {
      "editor.background": "#161C24",
      "editor.foreground": "#FBF9F1",
      // 'editor.lineHighlightBackground': theme.palette.background.paper,
      "editor.lineHighlightBorder": "#00000000",
    },
  });
});
