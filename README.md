# vue-vega
Vue component for Vega and Vega-Lite. Currently under development and not ready for use yet. 

## Example

```vue
<template lang="pug">
section
    div#vega
</template>

<script setup lang="ts">
import { useVega } from "vue-vega";

const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
        "values": [
            {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
            {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
            {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
        ]
    },
    "mark": "bar",
    "encoding": {
        "x": {"field": "a", "type": "nominal", "axis": {"labelAngle": 0}},
        "y": {"field": "b", "type": "quantitative"}
    }
}

onMounted(() => {
    const el = ref(document.getElementById("vega"))
    const { render } = useVega({ el, spec })
    render()
})
</script>
```
