<script lang="ts">
import { defineComponent } from 'vue';

// Uncomment import and local "components" registration if library is not registered globally.
import { VueVega } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueVega,
  },
  data() {
    return {
      spec: {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "A simple bar chart with embedded data.",
        mark: "bar",
        encoding: {
          x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
          y: { field: "b", type: "quantitative" },
        },
        data: { "values" : [
          { a: "A", b: 28 },
          { a: "B", b: 55 },
          { a: "C", b: 43 },
          { a: "D", b: 91 },
          { a: "E", b: 81 },
          { a: "F", b: 53 },
          { a: "G", b: 19 },
          { a: "H", b: 87 },
          { a: "I", b: 52 },
        ] },
      }
    }
  }
});
</script>

<template>
  <div id="app">
    <vue-vega :spec="spec" />
  </div>
</template>
