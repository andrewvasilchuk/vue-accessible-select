# vue-accessible-select

> Vue.js accessible select component made according to [WAI-ARIA practices](https://www.w3.org/TR/wai-aria-practices/#Listbox).

## ✨ Features

- fully accessible;
- ⌨️ keyboard navigation (`Page Up/Down`, `Home`, `End`, `Esc`);
- 🔣 type-ahead to select option that starts with typed symbols;
- 💅 style agnostic, so you can style it whatever you like (but including `core.scss` is highly encouraged).

## 💿 Installation

### 📦 Via NPM

```bash
$ npm install @jonasclement/vue-accessible-select --save
```

### 🧶 Via Yarn

```bash
$ yarn add @jonasclement/vue-accessible-select
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

> ℹ️ Note to set global options (for example `transition` for each select component), you should do the following:

```js
import { config } from 'vue-accessible-select'

config.transition = {
  name: 'foo',
}
```

> ⚠️ Options passed locally via `props` will always take precedence over global config options.

Default `config.js`:

```js
export default {
  transition: null,
}
```

## 🚀 Usage

### Template

```html
<template>
  <vue-accessible-select
    v-model="value"
    :options="options"
    :transition="{ name: 'foo' }"
    label="foo"
    placeholder="bar"
    disabled
  ></vue-accessible-select>
</template>
```

### Script

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

### 🎨 Styles

Then don't forget to include core styles. Also library is sipped with default theme styles you can use.

`SASS`:

```scss
// recommended
@import 'vue-accessible-select/src/styles/core.scss';

// optional
@import 'vue-accessible-select/src/styles/themes/default.scss';
```

Or already compiled `CSS`:

```css
/* recommended */
@import 'vue-accessible-select/dist/styles/core.scss';

/* optional */
@import 'vue-accessible-select/dist/styles/themes/default.scss';
```

> ⚠️ Note that when you import already compiled CSS you don't have ability to override `SASS` variables during build process, so it is preferable to use `.scss` file.

When importing `core.scss`, there are `SASS` variables you can override during build process:

```scss
$v-select-menu-position-top: 100% !default;
$v-select-arrow-size: 8px !default;
```

### API

#### ⚙️ Props

`<vue-accessible-select>` accepts some `props`:

| Prop                  | Description                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options: array`      | `required` Array of select options. Should be an array of objects that match the following pattern `{ value: any, label: string }`                                 |
| `value: any`          | `required` Current value of select. When value is `undefined`, it is considered that select has no current value.                                                  |
| `label: string`       | Select label                                                                                                                                                       |
| `placeholder: string` | Select placeholder                                                                                                                                                 |
| `disabled: boolean`   | Whether select is disabled                                                                                                                                         |
| `transition: object`  | Through this object you can configure the transition of `.v-select__menu` entrance and leave. Should match the following pattern `{ name: string, mode: string? }` |

#### 🕳️ Slots

`<vue-accessible-select>` provides you with some `slots` and `scopedSlots` you can use to fit your needs.

| Slot          | Scope               | Description      |
| ------------- | ------------------- | ---------------- |
| `label`       |                     | Label slot       |
| `prepend`     |                     | Prepend slot     |
| `placeholder` | `{ placeholder }`   | Placeholder slot |
| `selected`    | `{ value, option }` | Selected slot    |
| `arrow`       |                     | Arrow slot       |
| `option`      | `{ value, option }` | Option slot      |
| `no-options`  |                     | No options slot  |

#### Example of possible usage of `slots` and `scopedSlots`

```html
<vue-accessible-select>
  <template v-slot:label>
    <strong>😋 Just a label slot:</strong>
  </template>
  <template v-slot:prepend>
    <svg viewBox="0 0 54 54">
      <path d="M27 1l8 17 19 3-14 13 4 19-17-9-17 9 3-19L0 21l19-3z" />
    </svg>
  </template>
  <template v-slot:placeholder
    >🎃 I am a placeholder slot</template
  >
  <template v-slot:selected="{ value, option }"
    >🔥 Woooow, {{ option.label }}</template
  >
  <template v-slot:option="{ value, option }"
    >Option: {{ option.label }}</template
  >
  <template v-slot:no-options
    >Keine Optionen</template
  >
</vue-accessible-select>
```

## ⌨️ Keyboard shortcuts

`<vue-accessisble-select>` is fully accessible when it comes to keyboard interaction.

Here is some useful keys and their appropriate actions:

- `Down Arrow` – Moves focus and selection to the next option.
- `Up Arrow` – Moves focus and selection to the previous option.
- `Home` – Moves focus and selection to the first option.
- `End` – Moves focus and selection to the last option.
- `Esc` – Closes menu.

Type ahead:

- Type a character: focus and selection moves to the next option with a label that starts with the typed character;
- Type multiple characters in rapid succession: focus and selection moves to the next option with a label that starts with the string of characters typed.

## Powered by

- `Rollup` (and plugins);
- `SASS` and `node-sass`;
- `PostCSS`;
- `Autoprefixer`.

## 🔒 License

[MIT](http://opensource.org/licenses/MIT)
