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
  async data() {
    const names = await (
      await fetch("https://weisrc.github.io/sirdez/perf/index.json")
    ).json();
    return {
      names
    };
  }
};
</script>