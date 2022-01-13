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
  description,
  head: [["link", { rel: "icon", href: logo("SD") }]],
  plugins: [["vuepress-plugin-one-click-copy", { duration: 500 }]],
  themeConfig: {
    repo: "weisrc/sirdez",
    repoLabel: "GitHub",
    docsRepo: "weisrc/sirdez",
    docsDir: "docs_src",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Edit on GitHub",
    logo: logo("SD"),
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "weisrc.github.io/sirdez/api" }
    ],
    sidebar: [["/", "Sir Dez"], "components"]
  }
});
