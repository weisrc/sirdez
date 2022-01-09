module.exports = (data) => {
  require("fs").writeFileSync(
    "./report/results.json",
    JSON.stringify(data)
  );
  return data;
};
