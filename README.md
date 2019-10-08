# vue-accessible-select

> Vue.js accessible select component made according to [WAI-ARIA practices](https://www.w3.org/TR/wai-aria-practices/#Listbox).

## ✨ Features

- fully accessible;
- ⌨️ keyboard navigation (`Page Up/Down`, `Home`, `End`);
- 🔣 type-ahead to select option that starts with typed symbols;
- 💅 style agnostic, so you can style it whatever you like (but including `core.scss` is highly encouraged).

## 💿 Installation

### 📦 Via NPM

```bash
$ npm install vue-accessible-select --save
```

### 🧶 Via Yarn

```bash
$ yarn add vue-accessible-select
```

## Initialization

### As a plugin

It must be called before `new Vue()`.

```js
import Vue from 'vue'
import VueAccessibleSelect from 'vue-accessible-select'

Vue.use(VueAccessibleSelect)
```

### As a global component

```javascript
import Vue from 'vue'
import { VueAccessibleSelect } from 'vue-accessible-select'

Vue.component('VueAccessibleSelect', VueAccessibleSelect)
```

### As a local component

```javascript
import { VueAccessibleSelect } from 'vue-accessible-select'

export default {
  name: 'YourAwesomeComponent',
  components: {
    VueAccessibleSelect,
  },
}
```

## 🚀 Usage

```html
<template>
  <vue-accessible-select
    :options="options"
    v-model="value"
  ></vue-accessible-select>
</template>
```

```js
export default {
  // ...
  data() {
    return {
      value: undefined,
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
      ],
    }
  },
  // ...
}
```

```scss
// recommended
@import 'vue-accessible-select/src/styles/core.scss';

// optional
@import 'vue-accessible-select/src/styles/themes/default.scss';
```

## 🔒 License

[MIT](http://opensource.org/licenses/MIT)
