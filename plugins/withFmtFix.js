/**
 * Fixes the Xcode 26 / clang 18 fmt consteval build error in React Native 0.79.x.
 * Prepends #define FMT_USE_CONSTEVAL 0 to every fmt/compile.h found in RCT-Folly.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withFmtFix = (config) =>
  withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      if (!fs.existsSync(podfilePath)) return config;

      let podfile = fs.readFileSync(podfilePath, 'utf8');
      if (podfile.includes('fmt_consteval_patch')) return config;

      const patch = `
  # fmt_consteval_patch: prepend FMT_USE_CONSTEVAL=0 to all fmt compile headers
  Dir.glob(File.join(installer.sandbox.root, '**', 'fmt', 'compile.h')).each do |f|
    c = File.read(f)
    unless c.start_with?('// fmt_patched')
      File.write(f, "// fmt_patched\\n#ifndef FMT_USE_CONSTEVAL\\n#define FMT_USE_CONSTEVAL 0\\n#endif\\n" + c)
      puts "[fmt_patch] #{f}"
    end
  end`;

      podfile = podfile.replace(
        /post_install do \|installer\|/,
        `post_install do |installer|\n${patch}\n`
      );

      fs.writeFileSync(podfilePath, podfile);
      return config;
    },
  ]);

module.exports = withFmtFix;
