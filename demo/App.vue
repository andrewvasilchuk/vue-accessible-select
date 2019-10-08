<template>
  <div id="app">
    <h1>vue-accessible-select</h1>
    <section>
      <h2>Default usage</h2>
      <form action="/foo" method="POST">
        <vue-accessible-select
          v-model="value"
          :options="options"
          label="Select"
          placeholder="Select"
        ></vue-accessible-select>
        <button>Send form</button>
      </form>
      <output>{{ value }}</output>
    </section>
  </div>
</template>

<script>
import VueAccessibleSelect from '../src/components/VueAccessibleSelect/VueAccessibleSelect.vue'

export default {
  name: 'App',
  components: {
    VueAccessibleSelect,
  },
  data() {
    return {
      value: 0,
      options: [
        {
          value: 0,
          label: '🍇 Grape',
        },
        {
          value: { foo: 'bar' },
          label: '🍉 Watermelon',
        },
        {
          value: { foo: 'bar' },
          label: '🥝 Kiwi',
        },
        {
          value: false,
          label: '🥭 Mango',
        },
        {
          value: true,
          label: '🍓 Strawberry',
        },
        {
          value: 'lemon',
          label: '🍋 Lemon',
        },
        {
          value: 'melon',
          label: '🍈 Melon',
        },
        {
          value: 'foo',
          label: 'Lorem ipsum dolor sit amet',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
$v-select-menu-position-top: calc(100% - 1px);
@import './src/styles/core.scss';
@import './src/styles/themes/default.scss';

html {
  font-family: sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.48s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>