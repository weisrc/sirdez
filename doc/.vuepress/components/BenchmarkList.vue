<template>
  <div>
    <benchmark-result v-for="name in names" :key="name"></benchmark-result>
  </div>
</template>
<script>
import BenchmarkResult from "./BenchmarkResult.vue";

export default {
  components: { BenchmarkResult },
  name: "BenchmarkList",
  async data() {
    const names = await (
      await fetch("https://weisrc.github.io/sirdez/perf/names.json")
    ).json();
    return {
      names
    };
  }
};
</script>