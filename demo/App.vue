<template>
  <div id="app">
    <h1>vue-accessible-select</h1>
    <section>
      <h2>Default usage</h2>
      <form action="/foo" method="POST">
        <vue-accessible-select
          v-model="value"
          :options="options"
          :disabled="disabled"
          label="Select"
          placeholder="Select"
        >
          <template v-slot:prepend>
            <svg viewBox="0 0 54 54">
              <path d="M27 1l8 17 19 3-14 13 4 19-17-9-17 9 3-19L0 21l19-3z" />
            </svg>
          </template>
          <template v-slot:label>
            <strong>😋 Just a label slot:</strong>
          </template>
          <template v-slot:placeholder>🎃 I am a placeholder slot</template>
          <template v-slot:selected="{ value, option }">🔥 Woooow, {{ option.label }}</template>
          <template v-slot:option="{ option }">{{ option.label }}.</template>
        </vue-accessible-select>
      </form>
      <br />
      <br />
      <output>
        <span class="tag" style="margin-right: 4px;">Value:</span>
        <code>{{ value }}</code>
      </output>
      <br />
      <label>
        <span class="tag">Disabled:</span>
        <input type="checkbox" v-model="disabled" />
      </label>
      <h3>Here is some useful keys and their appropriate actions:</h3>
      <ul>
        <li>
          <code>Down Arrow</code> – Moves focus and selection to the next option.
        </li>
        <li>
          <code>Up Arrow</code> – Moves focus and selection to the previous option.
        </li>
        <li>
          <code>Home</code> – Moves focus and selection to the first option.
        </li>
        <li>
          <code>End</code> – Moves focus and selection to the last option.
        </li>
      </ul>
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
      value: undefined,
      // value: -1,
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
      disabled: false,
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

.v-select {
  &__prepend {
    flex-shrink: 0;
    margin-right: 8px;

    svg {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      fill: teal;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.48s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// bulma styles
code {
  padding: 0.25em 0.5em 0.25em;
  background-color: #f5f5f5;
  color: #ff3860;
  font-size: 0.875em;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  padding: {
    right: 0.75em;
    left: 0.75em;
  }
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #4a4a4a;
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: nowrap;
}
</style>