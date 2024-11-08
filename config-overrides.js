const { override, useBabelRc } = require('customize-cra');

module.exports = {
    webpack: override(
        useBabelRc(),
    ),
    devServer: (configFunction) => {
        return (proxy, allowedHost) => {
            const config = configFunction(proxy, allowedHost);

            config.port = 1911;
            config.allowedHosts = 'all';

            return config;
        };
    },
};
