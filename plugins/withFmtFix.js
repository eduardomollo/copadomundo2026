/**
 * Fixes Xcode 26 / clang 18 fmt consteval error.
 * The error is in /Pods/fmt/include/fmt/format-inl.h which uses FMT_STRING
 * with consteval. We patch the fmt pod's build settings AND the source file.
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

      // Inject into the existing post_install block
      const patch = `
  # fmt_fix_patch: fix Xcode 26 consteval error in fmt pod
  installer.pods_project.targets.each do |target|
    if target.name == 'fmt'
      target.build_configurations.each do |config|
        config.build_settings['OTHER_CPLUSPLUSFLAGS'] = '$(inherited) -DFMT_USE_CONSTEVAL=0'
        config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] = '$(inherited) FMT_USE_CONSTEVAL=0'
      end
    end
  end
  # Also patch format-inl.h directly as a belt-and-suspenders fix
  fmt_inl = File.join(installer.sandbox.root, 'fmt', 'include', 'fmt', 'format-inl.h')
  if File.exist?(fmt_inl)
    content = File.read(fmt_inl)
    unless content.include?('fmt_patched_consteval')
      header = "// fmt_patched_consteval\\n#ifndef FMT_USE_CONSTEVAL\\n#define FMT_USE_CONSTEVAL 0\\n#endif\\n"
      File.write(fmt_inl, header + content)
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
