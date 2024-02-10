import tailwindcss from 'tailwindcss'
import postcss from 'postcss'
import animationsPlugin from '../src/index.js'
import minify from '@csstools/postcss-minify'

const TAILWIND_BASE = '@tailwind utilities;'

export function generatePluginCss(options = {}) {
  const { inline = '', content = '' } = options
  return postcss([
    minify(),
    tailwindcss({
      plugins: [animationsPlugin],
      content: [{ raw: content }]
    })
  ]).process(`${TAILWIND_BASE} .content {@apply pl-0}`, { from: undefined }).then(result => result.css)
}

console.log(await generatePluginCss(
  { content: '<div class="animate-delay-100">hello</div>' }
))
