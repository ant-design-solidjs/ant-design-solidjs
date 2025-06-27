import { token } from "../contracts"

export function genControlHeight(baseControlHeight: number) {
    return {
        [token.height.small]: `${baseControlHeight * 0.75}px`,
        [token.height.middle]: `${baseControlHeight}px`,
        [token.height.large]: `${baseControlHeight * 1.25}px`,

        [token.control.interactive]: `${baseControlHeight / 2}px`,
    }
}
