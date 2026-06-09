/**
 * Fixes Xcode 26 / clang 18 fmt consteval error in React Native 0.79.x.
 *
 * Root cause: fmt/format-inl.h uses FMT_STRING() which creates consteval
 * objects that clang 18 refuses to compile. Fix: override FMT_STRING to
 * use fmt::runtime() which forces runtime string handling, bypassing
 * the consteval code path entirely.
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
      if (podfile.includes('fmt_fix_patch')) return config;

      const patch = `
  # fmt_fix_patch: override FMT_STRING macro to bypass consteval in clang 18
  fmt_inl = File.join(installer.sandbox.root, 'fmt', 'include', 'fmt', 'format-inl.h')
  if File.exist?(fmt_inl)
    content = File.read(fmt_inl)
    unless content.include?('fmt_patched_v2')
      # Override FMT_STRING to use fmt::runtime() — avoids consteval entirely
      header = <<~PATCH
        // fmt_patched_v2 - Xcode 26 clang 18 fix
        #ifdef FMT_STRING
        #undef FMT_STRING
        #endif
        #define FMT_STRING(s) fmt::runtime(s)
      PATCH
      File.write(fmt_inl, header + content)
      puts "[fmt_patch] Patched #{fmt_inl}"
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
