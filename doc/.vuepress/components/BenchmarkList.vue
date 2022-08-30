<template>
  <div>
    <BenchmarkResult
      v-for="name in names"
      :key="name"
    ></BenchmarkResult>
  </div>
</template>
<script>
import BenchmarkResult from "./BenchmarkResult.vue";

export default {
  components: { BenchmarkResult },
  name: "BenchmarkList",
  async mounted() {
    const names = await (
      await fetch("https://weisrc.github.io/sirdez/perf/index.json")
    ).json();
    return {
      names
    };
  },
  data: {
    names: []
  }
};
</script>