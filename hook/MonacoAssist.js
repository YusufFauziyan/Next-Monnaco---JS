import { loader } from "@monaco-editor/react";

export const ChangeLanguage = (language) => {
  loader.init().then((monaco) => {
    monaco.languages.register({ id: language });

    // Define your language syntax highlighting rules
    if (language === "pyhton") {
      monaco.languages.setMonarchTokensProvider(language, {
        tokenizer: {
          root: [
            [/[a-z_$][\w$]*/, { token: "variable" }],
            [/[A-Z][\w$]*/, { token: "type.identifier" }],
            [/\d+/, { token: "number" }],
            [/#.*$/, { token: "comment" }],
            [/".*?"/, { token: "string" }],
            [/'(\\.|[^'])*'/, { token: "string" }],
            [/[=+\-*/<>&|]/, { token: "operator" }],
            [/\s+/, { token: "white" }],
          ],
        },
      });
    }

    // Define your language completion provider
    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: (model, position) => {
        const suggestions = [
          {
            label: "print",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "print('${1}')",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Prints a message to the console.",
          },
          {
            label: "for",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "for ${1:item} in ${2:iterable}:\n\t${3:pass}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "A for loop that iterates over an iterable.",
          },
          // Add more suggestions here
        ];

        return {
          suggestions: suggestions,
        };
      },
    });

    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const suggestions = [
          {
            label: "log",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "console.log(JSON.stringify(${1}, null, 2))",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Console Output.",
          },
        ];

        return {
          suggestions: suggestions,
        };
      },
    });
  });
};
