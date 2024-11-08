const { override, useBabelRc } = require('customize-cra')

module.exports = {
  webpack: override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
  ),
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost)

      config.port = process.env.PORT || 4000
      config.allowedHosts = 'all'

      return config
    }
  }
}
