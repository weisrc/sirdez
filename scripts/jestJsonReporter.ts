// DO NOT ADD TYPESCRIPT STUFF HERE BECAUSE IT IS READ AS JS BY JEST
module.exports = (data) => {
  require("fs").writeFileSync(
    "./report/results.json",
    JSON.stringify(data)
  );
  return data;
};
