import antfu from '@antfu/eslint-config'
import stylistic from '@stylistic/eslint-plugin'

export default antfu({
  formatters: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    '@stylistic/indent': ['error', 2]
  }
})
