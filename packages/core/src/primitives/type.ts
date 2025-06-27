import type { Component } from "solid-js"

export type Key = string | number // | bigint

export type GetProps<T extends Component<any> | object> = T extends Component<infer P> ? P : T extends object ? T : never

export type GetProp<T extends Component<any> | object, PropName extends keyof GetProps<T>> = NonNullable<GetProps<T>[PropName]>

export type LiteralUnion<T extends string> = T | (string & {})
