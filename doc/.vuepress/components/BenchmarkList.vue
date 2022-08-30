<template>
  <div>
    <BenchmarkResult v-for="name in names" :key="name" :name="name" />
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
    console.log(names);
    this.$set(this, "names", names);
  },
  data() {
    return {
      names: []
    };
  }
};
</script>