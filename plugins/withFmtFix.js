/**
 * Injects FMT_USE_CONSTEVAL=0 into the existing post_install block
 * in the Expo-generated Podfile to fix Xcode 26 / clang 18 build errors.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const FMT_PATCH = `
  # ── fmt consteval fix for Xcode 26 / clang 18 ──────────────────────────
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      flags = config.build_settings['OTHER_CPLUSPLUSFLAGS'] || '$(inherited)'
      unless flags.to_s.include?('FMT_USE_CONSTEVAL')
        config.build_settings['OTHER_CPLUSPLUSFLAGS'] = flags.to_s + ' -DFMT_USE_CONSTEVAL=0 -DFMT_EXCEPTIONS=0'
      end
    end
  end
  # ────────────────────────────────────────────────────────────────────────
`;

const withFmtFix = (config) =>
  withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      if (!fs.existsSync(podfilePath)) return config;

      let podfile = fs.readFileSync(podfilePath, 'utf8');

      if (podfile.includes('FMT_USE_CONSTEVAL')) return config; // already patched

      // Insert patch at the start of the existing post_install block
      podfile = podfile.replace(
        /post_install do \|installer\|/,
        `post_install do |installer|\n${FMT_PATCH}`
      );

      fs.writeFileSync(podfilePath, podfile);
      return config;
    },
  ]);

module.exports = withFmtFix;
