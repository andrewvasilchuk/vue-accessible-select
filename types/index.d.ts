import { PluginFunction } from 'vue'

declare const VueAccessibleSelect: VueAccessibleSelect

export default VueAccessibleSelect

export interface VueAccessibleSelect {
  install: PluginFunction<any>
}

export interface VueAccessibleSelectOption {
  value: any
  label: string
}

export type VueAccessibleSelectOptions = VueAccessibleSelectOption[]
