export function result2config(result, colors = false) {
  const labels = [];
  const datasetMap = {};

  for (const [suiteName, suite] of Object.entries(result)) {
    // @ts-expect-error works
    labels.push(suiteName);
    // @ts-expect-error works
    const entires = Object.entries(suite);
    for (let i = 0; i < entires.length; i++) {
      const [name, hz] = entires[i];
      const hue = Math.floor((i / entires.length) * 360);
      if (!datasetMap[name]) {
        datasetMap[name] = {
          label: name,
          data: []
        };
        if (colors) {
          datasetMap[name].backgroundColor = [
            `hsla(${hue}, 100%, 50%, 0.2)`
          ];
          datasetMap[name].borderColor = [
            `hsla(${hue}, 100%, 50%, 1)`
          ];
          datasetMap[name].borderWidth = 0.5;
        }
      }
      datasetMap[name].data.push(hz);
    }
  }

  return {
    type: "bar",
    data: {
      labels,
      datasets: Object.values(datasetMap)
    }
  };
}
