module.exports = (data) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("fs").writeFileSync(
    "./report/results.json",
    JSON.stringify(data)
  );
  return data;
};
