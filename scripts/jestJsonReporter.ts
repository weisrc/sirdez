module.exports = (data) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("fs").writeFileSync(
    "docs/report/index.json",
    JSON.stringify(data)
  );
  return data;
};
