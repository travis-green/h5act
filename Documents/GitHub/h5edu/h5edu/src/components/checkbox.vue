<template>
  <div id="checkbox" style="float:right;">
    <mt-checklist v-model="value" :options="options" @change="checkon($event)"></mt-checklist>
  </div>
</template>
 
<script>
export default {
  name: "checkbox",
  data() {
    return {
      //存放所选选项
      value: [],
      //checklist设置
      options: [
        {
          label: "优翰教育上城利星店",
          value: "valueE",
        }
      ]
    };
  },
  mounted: function() {},
  methods: {
    checkon(item) {
      console.log(item);
    }
  }
};
</script>
 
<style>

</style>
