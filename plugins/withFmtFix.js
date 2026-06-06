/**
 * Custom Expo config plugin to fix the fmt consteval build error on Xcode 26.
 *
 * React Native 0.79.x bundles an older version of the {fmt} C++ library
 * that uses FMT_COMPILE_STRING / consteval functions incompatible with
 * clang 18 (Xcode 26). This patch adds -DFMT_USE_CONSTEVAL=0 to every
 * pod target's C++ compiler flags so the non-consteval path is used.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withFmtFix = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');

      if (!fs.existsSync(podfilePath)) return config;

      let podfile = fs.readFileSync(podfilePath, 'utf8');

      const patch = `
# ── fmt consteval fix for Xcode 26 / clang 18 ──────────────────────────────
# React Native 0.79.x bundles an older {fmt} version that uses consteval
# functions incompatible with clang 18. Disabling consteval fixes the build.
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      flags = config.build_settings['OTHER_CPLUSPLUSFLAGS'] || '$(inherited)'
      unless flags.include?('FMT_USE_CONSTEVAL')
        config.build_settings['OTHER_CPLUSPLUSFLAGS'] = flags + ' -DFMT_USE_CONSTEVAL=0 -DFMT_EXCEPTIONS=0'
      end
    end
  end
end
`;

      // Only add once
      if (!podfile.includes('fmt consteval fix')) {
        podfile += patch;
        fs.writeFileSync(podfilePath, podfile);
      }

      return config;
    },
  ]);
};

module.exports = withFmtFix;
