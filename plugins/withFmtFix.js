/**
 * Fixes Xcode 26 / clang 18 fmt consteval error in React Native 0.79.x.
 *
 * fmt/base.h defines FMT_USE_CONSTEVAL=1 when __cpp_consteval is available.
 * Clang 18 (Xcode 26) is stricter about consteval, causing build failures.
 * Fix: patch base.h to force FMT_USE_CONSTEVAL=0, disabling consteval usage.
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
      if (podfile.includes('fmt_base_patch')) return config;

      const patch = `
  # fmt_base_patch: force FMT_USE_CONSTEVAL=0 in fmt/base.h
  # base.h redefines FMT_USE_CONSTEVAL=1 based on __cpp_consteval detection,
  # overriding any -D flag. We patch the source directly.
  [
    File.join(installer.sandbox.root, 'fmt', 'include', 'fmt', 'base.h'),
    File.join(installer.sandbox.root, 'fmt', 'include', 'fmt', 'core.h'),
  ].each do |f|
    next unless File.exist?(f)
    content = File.read(f)
    next if content.include?('fmt_base_patched')
    # Replace any line that sets FMT_USE_CONSTEVAL to 1
    patched = content.gsub(/define\\s+FMT_USE_CONSTEVAL\\s+1/, 'define FMT_USE_CONSTEVAL 0 // fmt_base_patched')
    if patched != content
      File.write(f, patched)
      puts "[fmt_patch] Patched #{f}"
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
