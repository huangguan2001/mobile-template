<template>
  <div>
    <!-- <ul class="flex">
      <ScrollNum
        v-for="(number, idx) of numArr"
        :key="idx"
        :i="number"
        :delay="idx + 2.5"
        as="li"
        class="num"
      />
    </ul> -->
  </div>
</template>

<script>
import ScrollNum from '../components/ScrollNum.vue';

export default {
  name: 'App',
  components: { ScrollNum },
  data: () => ({ num: 886 }),
  computed: {
    numArr() {
      const str = String(this.num);
      return [parseInt(str[0]), parseInt(str[1]), parseInt(str[2])];
    },
  },
};
</script>

<style>
.flex {
  display: flex;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.num {
  --width: 50px;
  --color: #fff;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>
