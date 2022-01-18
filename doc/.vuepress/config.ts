import { defineConfig } from "vuepress/config";

const description =
  "Glorious Binary Serialization and Deserialization for TypeScript.";

const b64 = (text: string) => btoa(text).replace(/=/g, "");

const logo = (text: string) =>
  `https://see.fontimg.com/api/renderfont4/Zd2J/${b64(
    JSON.stringify({ r: "fs", h: 120, fgc: "#DC143C", t: 1 })
  )}/${b64(text)}/x.png`;

export default defineConfig({
  dest: "docs/.vuepress",
  title: "Sir Dez",
  base: "/sirdez/",
  description,
  head: [["link", { rel: "icon", href: logo("SD") }]],
  plugins: [["vuepress-plugin-one-click-copy", { duration: 500 }]],
  themeConfig: {
    searchMaxSuggestions: 10,
    repo: "weisrc/sirdez",
    repoLabel: "GitHub",
    docsRepo: "weisrc/sirdez",
    docsDir: "docs_src",
    docsBranch: "main",
    editLinks: true,
    editLinkText: "Edit on GitHub",
    logo: logo("SD"),
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "https://weisrc.github.io/sirdez/api" }
    ],
    sidebar: [
      ["/", "Introduction"],
      "design",
      "components",
      "extending",
      {
        title: "Data Types",
        children: [
          "data_types/boolean",
          "data_types/number",
          "data_types/string",
          "data_types/struct",
          "data_types/array",
          "data_types/map",
          "data_types/optional"
        ]
      }
    ]
  }
});
