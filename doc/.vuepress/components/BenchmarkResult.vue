<template>
  <div ref="container">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <canvas ref="canvas" />
  </div>
</template>

<script>
import { result2config } from "../../../perf/result2config.ts";

export default {
  name: "BenchmarkResult",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  async mounted() {
    const { canvas, container } = this.$refs;
    new ResizeObserver(() => {
      canvas.width = container.clientWidth;
    }).observe(container);
    const ctx = canvas.getContext("2d");

    const url = `https://weisrc.github.io/sirdez/perf/${this.$props.name}.json`;
    const result = await (await fetch(url)).json();
    const config = result2config(result, true);

    new Chart(ctx, {
      ...config
    });
  }
};
</script>
