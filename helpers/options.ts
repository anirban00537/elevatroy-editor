export const languages = {
  bash: "Bash",
  c: "C",
  "c++": "C++",
  "c#": "C#",
  clojure: "Clojure",
  crystal: "Crystal",
  css: "CSS",
  diff: "Diff",
  dockerfile: "Docker",
  elm: "Elm",
  elixir: "Elixir",
  erlang: "Erlang",
  graphql: "GraphQL",
  go: "Go",
  haskell: "Haskell",
  html: "HTML",
  java: "Java",
  javascript: "JavaScript/JSX",
  json: "JSON",
  kotlin: "Kotlin",
  lisp: "Lisp",
  lua: "Lua",
  markdown: "Markdown",
  matlab: "MATLAB/Octave",
  pascal: "Pascal",
  plaintext: "Plaintext",
  powershell: "Powershell",
  objectivec: "Objective C",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  rust: "Rust",
  scala: "Scala",
  scss: "SCSS",
  sql: "SQL",
  swift: "Swift",
  toml: "TOML",
  typescript: "TypeScript/TSX",
  xml: "XML",
  yaml: "YAML",
};

export const themes = {
  hyper: {
    background: "bg-gradient-to-br from-fuchsia-500 via-red-600 to-orange-400",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css",
  },
  oceanic: {
    background: "bg-gradient-to-br from-green-300 via-blue-500 to-purple-600",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/material-darker.min.css",
  },
  candy: {
    background: "bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/chalk.min.css",
  },
  sublime: {
    background: "bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css",
  },
  horizon: {
    background: "bg-gradient-to-br from-orange-500 to-yellow-300",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/monokai-sublime.min.css",
  },
  coral: {
    background: "bg-gradient-to-br from-blue-400 to-emerald-400",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/tokyo-night-dark.min.css",
  },
  peach: {
    background: "bg-gradient-to-br from-rose-400 to-orange-300",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/zenburn.min.css",
  },
  flamingo: {
    background: "bg-gradient-to-br from-pink-400 to-pink-600",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/panda-syntax-dark.min.css",
  },
  gotham: {
    background: "bg-gradient-to-br from-gray-700 via-gray-900 to-black",

    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/black-metal-dark-funeral.min.css",
  },
  ice: {
    background: "bg-gradient-to-br from-rose-100 to-teal-100",
    theme:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/ashes.min.css",
  },
};
interface Font {
  name: string;
  src: string;
}

interface Fonts {
  [key: string]: Font;
}
export const fonts: Fonts = {
  jetBrainsMono: {
    name: "JetBrains Mono",
    src: "https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap",
  },
  inconsolata: {
    name: "Inconsolata",
    src: "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
  },
  firaCode: {
    name: "Fira Code",
    src: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
  },
  cascadiaCode: {
    name: "Cascadia Code",
    src: "https://cdn.jsdelivr.net/npm/@fontsource/cascadia-code@4.2.1/index.min.css",
  },
  victorMono: {
    name: "Victor Mono",
    src: "https://fonts.googleapis.com/css2?family=Victor+Mono&display=swap",
  },
  sourceCodePro: {
    name: "Source Code Pro",
    src: "https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap",
  },
  ibmPlexMono: {
    name: "IBM Plex Mono",
    src: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap",
  },
  robotoMono: {
    name: "Roboto Mono",
    src: "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
  },
  ubuntuMono: {
    name: "Ubuntu Mono",
    src: "https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap",
  },
  spaceMono: {
    name: "Space Mono",
    src: "https://fonts.googleapis.com/css2?family=Space+Mono&display=swap",
  },
  courierPrime: {
    name: "Courier Prime",
    src: "https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap",
  },
  anonymousPro: {
    name: "Anonymous Pro",
    src: "https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap",
  },
  oxygenMono: {
    name: "Oxygen Mono",
    src: "https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap",
  },
  redHatMono: {
    name: "Red Hat Mono",
    src: "https://fonts.googleapis.com/css2?family=Red+Hat+Mono&display=swap",
  },
};
interface Font {
  name: string;
  src: string;
}

export function fontsToArray(fontsObject: Fonts): { [key: string]: Font }[] {
  const fontsArray: { [key: string]: Font }[] = [];

  for (const key in fontsObject) {
    if (Object.prototype.hasOwnProperty.call(fontsObject, key)) {
      fontsArray.push({
        [key]: fontsObject[key],
      });
    }
  }

  return fontsArray;
}

// Example usage:
export const fontsArray = fontsToArray(fonts);

export const codeSnippets = [
  {
    language: "python",
    code: "def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * factorial(n - 1)\n\nprint(factorial(5))",
  },
  {
    language: "javascript",
    code: "function factorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  } else {\n    return n * factorial(n - 1);\n  }\n}\nconsole.log(factorial(5));",
  },
  {
    language: "java",
    code: "public class Factorial {\n    public static int factorial(int n) {\n        if (n == 0 || n == 1) {\n            return 1;\n        } else {\n            return n * factorial(n - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}",
  },
  {
    language: "c",
    code: '#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}\n\nint main() {\n    printf("%d\\n", factorial(5));\n    return 0;\n}',
  },
  {
    language: "ruby",
    code: "def factorial(n)\n  if n == 0 || n == 1\n    return 1\n  else\n    return n * factorial(n - 1)\n  end\nend\n\nputs factorial(5)",
  },
  {
    language: "swift",
    code: "func factorial(_ n: Int) -> Int {\n    if n == 0 || n == 1 {\n        return 1\n    } else {\n        return n * factorial(n - 1)\n    }\n}\n\nprint(factorial(5))",
  },
  {
    language: "c#",
    code: "using System;\n\nclass Program\n{\n    static int Factorial(int n)\n    {\n        if (n == 0 || n == 1)\n            return 1;\n        else\n            return n * Factorial(n - 1);\n    }\n\n    static void Main()\n    {\n        Console.WriteLine(Factorial(5));\n    }\n}",
  },
  {
    language: "php",
    code: "<?php\nfunction factorial($n) {\n    if ($n == 0 || $n == 1) {\n        return 1;\n    } else {\n        return $n * factorial($n - 1);\n    }\n}\n\necho factorial(5);\n?>",
  },
  {
    language: "go",
    code: 'package main\nimport "fmt"\n\nfunc factorial(n int) int {\n    if n == 0 || n == 1 {\n        return 1\n    } else {\n        return n * factorial(n - 1)\n    }\n}\n\nfunc main() {\n    fmt.Println(factorial(5))\n}',
  },
  {
    language: "rust",
    code: 'fn factorial(n: u32) -> u32 {\n    if n == 0 || n == 1 {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}\n\nfn main() {\n    println!("{}", factorial(5));\n}',
  },
  {
    language: "typescript",
    code: "function factorial(n: number): number {\n  if (n === 0 || n === 1) {\n    return 1;\n  } else {\n    return n * factorial(n - 1);\n  }\n}\nconsole.log(factorial(5));",
  },
];
