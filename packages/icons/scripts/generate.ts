import type { IconDefinition } from '@ant-design/icons-svg/es/types'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
// @ts-ignore
import iconDefs from '@ant-design/icons-svg'
import { template } from 'lodash-es'
import { packageDirectory } from 'pkg-dir'

const writeFile = promisify(fs.writeFile)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface IconDefinitionWithIdentifier extends IconDefinition {
    svgIdentifier: string
    svgBase64: string | null
}

const svgPkgPath = path.dirname(fileURLToPath(import.meta.resolve('@ant-design/icons-svg')))
const svgPkgDir = await packageDirectory({ cwd: svgPkgPath })
const inlineSvgDir = path.join(svgPkgDir, 'inline-namespaced-svg')

function detectRealPath(icon: IconDefinition) {
    try {
        const fileName = icon.name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
        const _path = path.join(inlineSvgDir, `${fileName}.svg`)

        return fs.existsSync(_path) ? _path : null
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
        return null
    }
}

function svg2base64(svgPath: string) {
    const svgStr = fs.readFileSync(svgPath, 'utf8')
    const svgWithStyle = svgStr
        .replace(/#333/g, '#1677ff')
        .replace(/#E6E6E6/gi, '#e6f4ff')

    // eslint-disable-next-line node/prefer-global/buffer
    const base64 = Buffer.from(svgWithStyle).toString('base64')
    return `data:image/svg+xml;base64,${base64}`
}

async function walk() {
    const icons = Object.entries(iconDefs).filter(([key]) => {
        return !key.startsWith('__')
    })

    return Promise.all(
        icons.map(async ([svgIdentifier, iconDef]) => {
            const realSvgPath = detectRealPath(iconDef as IconDefinition)
            let svgBase64 = null
            if (realSvgPath) {
                try {
                    svgBase64 = svg2base64(realSvgPath)
                }
                catch (e) {
                    console.error(e)
                    /** nothing */
                }
            }
            return {
                ...iconDef,
                svgIdentifier,
                svgBase64,
            } as IconDefinitionWithIdentifier
        }),
    )
}

async function generateIcons() {
    const iconsDir = path.join(__dirname, '../src/icons')
    try {
        await promisify(fs.access)(iconsDir)
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (err) {
        await promisify(fs.mkdir)(iconsDir)
    }

    const render = template(`
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import type { Component } from 'solid-js'
import type { AntdIconProps } from '../components/AntdIcon'
import { <%= svgIdentifier %> as <%= svgIdentifier %>Svg } from '@ant-design/icons-svg';
import AntdIcon from '../components/AntdIcon'

function <%= svgIdentifier %>(props: AntdIconProps) {
    return <AntdIcon {...props} icon={<%= svgIdentifier %>Svg} />
}

<% if (svgBase64) { %> /**![<%= name %>](<%= svgBase64 %>) */ <% } %>
const RefIcon: Component<AntdIconProps> = <%= svgIdentifier %>

export default RefIcon;
`.trim())

    const icons = await walk()
    await Promise.all(
        icons.map(async (item) => {
            // generate icon file
            await writeFile(
                path.resolve(__dirname, `../src/icons/${item.svgIdentifier}.tsx`),
                render(item),
            )
        }),
    )

    // generate icon index
    const entryText = icons
        .sort((a, b) => a.svgIdentifier.localeCompare(b.svgIdentifier))
        .map(icon => `export { default as ${icon.svgIdentifier} } from './${icon.svgIdentifier}';`)
        .join('\n')

    await promisify(fs.appendFile)(
        path.resolve(__dirname, '../src/icons/index.tsx'),
        `
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

${entryText}
    `.trim(),
    )
}

async function generateEntries() {
    const render = template(`
'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const _<%= svgIdentifier %> = _interopRequireDefault(require('./lib/icons/<%= svgIdentifier %>'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

const _default = _<%= svgIdentifier %>;
exports.default = _default;
module.exports = _default;
`.trim())

    const icons = await walk()
    await Promise.all(
        icons.map(async ({ svgIdentifier }) => {
            // generate `Icon.js` in root folder
            await writeFile(
                path.resolve(__dirname, `../${svgIdentifier}.js`),
                render({
                    svgIdentifier,
                }),
            )

            // generate `Icon.d.ts` in root folder
            await writeFile(
                path.resolve(__dirname, `../${svgIdentifier}.d.ts`),
                `export { default } from './lib/icons/${svgIdentifier}';`,
            )
        }),
    )
}

if (process.argv[2] === '--target=icon') {
    generateIcons()
}

if (process.argv[2] === '--target=entry') {
    generateEntries()
}
