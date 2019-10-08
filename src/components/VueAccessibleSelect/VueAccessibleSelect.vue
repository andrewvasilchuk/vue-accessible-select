<template lang="pug">
  .v-select(:class="className")
    span.v-select__label(
      v-if="hasSlot('label') || label"
      :id="labelId"
      )
      slot(name="label") {{ label }}:
    .v-select__inner
      button.v-select__btn(
        :id="buttonId"
        ref="button"
        :disabled="disabled"
        :aria-expanded="ariaExpanded"
        :aria-labelledby="`${labelId ? labelId : ''} ${buttonId}`"
        type="button"
        aria-haspopup="listbox"
        @click="toggle"
        )
        span.v-select__prepend(v-if="hasSlot('prepend')")
          slot(name="prepend")
        span.v-select__placeholder(v-if="(placeholder || hasSlot('placeholder')) && value === undefined")
          slot(
            name="placeholder"
            :placeholder="placeholder"
            ) {{ placeholder }}
        span.v-select__selected
          slot(
            v-if="value !== undefined"
            name="selected"
            :value="value"
            :option="currentOption"
            ) {{ currentOption ? currentOption.label : value }}
        span.v-select__arrow
          slot(name="arrow")
            svg(viewBox="0 0 255 255")
              path(d="M0 64l128 127L255 64z")
      transition(
        :name="transition ? transition.name : ''"
        :mode="transition ? transition.mode : ''"
        )
        .v-select__menu(v-if="open")
          ul.v-select__list(
            v-if="options && options.length"
            ref="list"
            :aria-activedescendant="value && getOptionId(value)"
            :aria-labelledby="labelId"
            role="listbox"
            tabindex="-1"
            @keydown="keydownHandler"
            @keyup.35="setLastSelected"
            @keyup.36="setFirstSelected"
            @keyup.esc="escapeHandler"
            @keyup="printHandler"
            @blur="blurHandler"
            )
            li.v-select__option(
              v-for="(option, index) in options" :key="index"
              :id="getOptionId(option)" role="option"
              ref="options"
              :class="{ 'v-select__option--selected': isSelected(option) }"
              @click="clickHandler(option)" :aria-selected="isSelected(option) ? 'true': 'false'"
              )
              slot(
                name="option" 
                :option="option"
                :value="value"
                )
                span {{ option.label }}
          template(v-else)
            .v-select__no-options
              slot(name="no-optioms")
                span No options provided
</template>

<script>
import config from '../../config'

export default {
  name: 'VueAccessibleSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      required: true,
    },
    transition: {
      type: Object,
      default: () => config.transition || {},
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
  },
  data() {
    return {
      open: false,
      timeout: null,
      printedText: '',
    }
  },
  computed: {
    labelId() {
      return this.label ? `v-select-label-${this._uid}` : false
    },
    buttonId() {
      return `v-select-button-${this._uid}`
    },
    ariaExpanded() {
      return this.open ? 'true' : false
    },
    className() {
      return {
        'v-select--opened': this.open,
        'v-select--disabled': this.disabled,
      }
    },
    currentOption() {
      return (
        Array.isArray(this.options) &&
        this.options.find(option => option.value === this.value)
      )
    },
    currentOptionIndex() {
      return this.options.findIndex(option => option === this.currentOption)
    },
  },
  watch: {
    open(val) {
      if (val) {
        setTimeout(() => {
          document.addEventListener('click', this.clickListener)

          // if list is present in DOM
          const { list } = this.$refs

          if (list) {
            list.focus()

            // * if option is selected, then scroll to it
            const { value } = this
            if (value || value === 0) {
              this.scrollToSelected()
            }
          }

          this.$emit('open')
        }, 0)
      } else {
        document.removeEventListener('click', this.clickListener)
        this.$emit('close')
      }
    },
    value(val) {
      // * if option is selected, then scroll to it
      if (val || val == 0) {
        this.scrollToSelected()
      }
    },
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    clickListener(e) {
      const { target } = e
      const closestBtn = target.closest('.v-select__btn')
      const closestList = target.closest('.v-select__list')

      if (closestList === this.$refs.list || closestBtn === this.$refs.button) {
      } else {
        this.open = false
      }
    },
    isSelected(option) {
      return this.value === option.value
    },
    clickHandler(option) {
      this.$emit('input', option.value)
      this.open = false
    },
    keydownHandler(e) {
      // prevent from default scrolling
      
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault()
      }
      
      const { currentOptionIndex } = this
      // if neither option is selected then select the first

      if (currentOptionIndex === -1) {
        this.$emit('input', this.options[0].value)
        return
      }

      switch (e.keyCode) {
        case 38:
          if (currentOptionIndex !== 0)
            this.$emit('input', this.options[currentOptionIndex - 1].value)
          break
        case 40:
          if (currentOptionIndex !== this.options.length - 1)
            this.$emit('input', this.options[currentOptionIndex + 1].value)
          break
        case 13:
          setTimeout(() => {
            this.$refs.button.focus()
          }, 0)
          break
      }
    },
    getOptionId(option) {
      return `v-select-option-${this.options.indexOf(option)}_${this._uid}`
    },
    setFirstSelected() {
      this.$emit('input', this.options[0].value)
    },
    setLastSelected() {
      this.$emit('input', this.options[this.options.length - 1].value)
    },
    escapeHandler() {
      this.open = false
      this.$refs.button.focus()
    },
    printHandler(e) {
      this.printedText += String.fromCharCode(e.keyCode)

      this.selectByText(this.printedText)

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.printedText = ''
      }, 500)
    },
    selectByText(text) {
      for (let option of this.options) {
        if (
          String(option.label)
            .toUpperCase()
            .startsWith(text)
        ) {
          this.$emit('input', option.value)
          return
        }
      }
    },
    scrollToSelected() {
      // * get current option DOM node
      if (Array.isArray(this.$refs.options)) {
        const currentOption = this.$refs.options[this.currentOptionIndex]

        if (currentOption) {
          const { offsetTop, clientHeight } = currentOption

          const { list } = this.$refs

          const currentVisibleArea = list.scrollTop + list.clientHeight

          if (offsetTop < list.scrollTop) {
            list.scrollTop = offsetTop
          } else if (offsetTop + clientHeight > currentVisibleArea) {
            list.scrollTop = offsetTop - list.clientHeight + clientHeight
          }
        }
      }
    },
    blurHandler(e) {
      this.open = false
    },
    hasSlot(name) {
      return Boolean(this.$slots[name]) || Boolean(this.$scopedSlots[name])
    },
  },
}
</script>
