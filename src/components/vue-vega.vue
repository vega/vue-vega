<template>
  <div id="wrapper">
    <span v-if="loading">loading...</span>
    <div ref="el"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue-demi";
import { useVega } from "../composition/useVega";

// TODO: take spec and data as props
export default defineComponent({
  props: {
    spec: Object,
    data: Object
  },

  setup(props) {
    const el = ref(null);

    const config = {
      el: el,
      spec: props.spec,
      data: props.data,
    };

    const { render, loading } = useVega(config as any);
    onMounted(() => {
      render();
    });
    return { loading, el };
  },
});
</script>
