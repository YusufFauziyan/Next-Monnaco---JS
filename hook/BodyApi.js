import Cookies from "js-cookie";

export const BodyExec = (lang, content) => {
  const tokenId = Cookies.get("__tknId")
    ? JSON.parse(Cookies.get("__tknId"))
    : null;
  if (lang === "javascript") {
    return {
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
            content: content,
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
    };
  } else if (lang === "mysql") {
    return {
      _id: "3zhk8zdrq",
      type: "code",
      created: "2023-08-15T04:52:40.522Z",
      updated: "2023-08-15T09:13:02.089Z",
      title: "3zhk8zdrq",
      description: null,
      tags: [],
      visibility: "public",
      properties: {
        language: "mysql",
        files: [
          {
            name: "queries.sql",
            content:
              "\n-- create\nCREATE TABLE EMPLOYEE (\n  empId INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  dept TEXT NOT NULL\n);\n\n-- insert\nINSERT INTO EMPLOYEE VALUES (0001, 'Clark', 'Sales');\nINSERT INTO EMPLOYEE VALUES (0002, 'Dave', 'Accounting');\nINSERT INTO EMPLOYEE VALUES (0003, 'Ava', 'Sales');\n\n-- fetch \nSELECT * FROM EMPLOYEE;\n",
          },
        ],
        stdin: null,
        hash: "1611c56ca2b14485ceb58d69271095d4b18e8c75",
        result: {
          stdout:
            "empId\tname\tdept\n1\tClark\tSales\n2\tDave\tAccounting\n3\tAva\tSales\n",
          stderr: null,
          exception: null,
          executionTime: 131,
          success: true,
          output:
            "empId\tname\tdept\n1\tClark\tSales\n2\tDave\tAccounting\n3\tAva\tSales\n",
        },
      },
      user: {
        _id: null,
      },
    };
  }
};
