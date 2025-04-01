import type { AvatarProps } from "./Avatar"
import { createContext } from "solid-js"

export type GroupProps = Pick<AvatarProps, "shape" | "size">

export const avatarGroupContext = createContext<GroupProps>({})
