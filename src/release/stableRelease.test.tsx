// This test exercises the repository-root release script from the Astro package.
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

/* eslint-disable @nx/enforce-module-boundaries, import/no-relative-packages */
import {
  assertDistManifestVersions,
  calculatePlannedVersions,
  type PackageManifest,
  type ProjectVersionData,
  updateDependencyRange,
  updateDependencyRanges,
} from '../../../../stableRelease';
/* eslint-enable @nx/enforce-module-boundaries, import/no-relative-packages */

const mockReleaseChangelog = jest.fn();
const mockReleasePublish = jest.fn();
const mockReleaseVersion = jest.fn();
const mockCreateProjectGraphAsync = jest.fn();
const mockWriteFileSync = jest.fn();
const mockYargsParseAsync = jest.fn().mockResolvedValue({ dryRun: true, verbose: false });

jest.mock('nx/release', () => ({
  releaseChangelog: mockReleaseChangelog,
  releasePublish: mockReleasePublish,
  releaseVersion: mockReleaseVersion,
}));

jest.mock('nx/src/project-graph/project-graph', () => ({
  createProjectGraphAsync: mockCreateProjectGraphAsync,
}));

jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  writeFileSync: mockWriteFileSync,
}));

jest.mock('yargs', () => ({
  option: jest.fn().mockReturnThis(),
  parseAsync: mockYargsParseAsync,
  version: jest.fn().mockReturnThis(),
}));

const packageData = (manifests: Record<string, PackageManifest>) => Object.fromEntries(
  Object.entries(manifests).map(([projectName, manifest]) => [projectName, { manifest }]),
);

describe('calculatePlannedVersions', () => {
  test('prefers an existing new version, including an alpha promotion value', () => {
    const projectsVersionData: Record<string, ProjectVersionData> = {
      astro: { currentVersion: '4.2.0-alpha.1', newVersion: '4.2.0' },
      wrapper: { currentVersion: '2.1.3', newVersion: '2.1.4' },
    };

    expect(
      calculatePlannedVersions(
        ['astro', 'wrapper'],
        projectsVersionData,
        packageData({
          astro: { version: '99.0.0' },
          wrapper: { version: '99.0.0' },
        }),
      ),
    ).toEqual({ astro: '4.2.0', wrapper: '2.1.4' });
  });

  test('increments the current version and then falls back to the manifest version', () => {
    expect(
      calculatePlannedVersions(
        ['current', 'manifest'],
        {
          current: { currentVersion: '1.2.3' },
          manifest: {},
        },
        packageData({
          current: { version: '9.9.9' },
          manifest: { version: '2.4.0' },
        }),
      ),
    ).toEqual({ current: '1.2.4', manifest: '2.4.1' });
  });

  test('throws the exact error for missing or invalid version data without mutating inputs', () => {
    const projectsVersionData: Record<string, ProjectVersionData> = {
      missing: { currentVersion: null, newVersion: null },
      invalid: { currentVersion: 'not-a-version' },
    };
    const manifests = packageData({
      missing: {},
      invalid: { version: 'also-invalid' },
    });
    const projectsVersionDataBefore = JSON.parse(JSON.stringify(projectsVersionData));
    const manifestsBefore = JSON.parse(JSON.stringify(manifests));

    expect(() => calculatePlannedVersions(['missing'], projectsVersionData, manifests),
    ).toThrow('Unable to calculate a stable version for missing.');
    expect(() => calculatePlannedVersions(['invalid'], projectsVersionData, manifests),
    ).toThrow('Unable to calculate a stable version for invalid.');
    expect(projectsVersionData).toEqual(projectsVersionDataBefore);
    expect(manifests).toEqual(manifestsBefore);
  });
});

describe('updateDependencyRange', () => {
  test.each([
    ['^1.2.3', '1.2.4', '^1.2.4'],
    ['~1.2.3', '1.2.4', '~1.2.4'],
    ['=1.2.3', '1.2.4', '=1.2.4'],
    ['1.2.3', '1.2.4', '1.2.4'],
    ['workspace:^1.2.3', '1.2.4', 'workspace:^1.2.4'],
    ['workspace:~1.2.3', '1.2.4', 'workspace:~1.2.4'],
    ['workspace:*', '1.2.4', 'workspace:1.2.4'],
    ['file:../pkg', '1.2.4', 'file:../pkg'],
    ['link:../pkg', '1.2.4', 'link:../pkg'],
  ])('transforms %s to %s', (range, version, expected) => {
    expect(updateDependencyRange(range, version)).toBe(expected);
  });
});

describe('updateDependencyRanges', () => {
  test('updates the target in every supported dependency field and reports each change', () => {
    const manifest: PackageManifest = {
      name: '@pingux/source',
      dependencies: {
        '@pingux/target': '^1.2.3',
        unrelated: '~4.0.0',
      },
      devDependencies: {
        '@pingux/target': 'workspace:^1.2.3',
      },
      optionalDependencies: {
        '@pingux/target': 'workspace:*',
      },
    };
    const dependenciesBefore = manifest.dependencies;
    const devDependenciesBefore = manifest.devDependencies;
    const optionalDependenciesBefore = manifest.optionalDependencies;

    const result = updateDependencyRanges(manifest, '@pingux/target', '1.2.4');

    expect(result.manifest).toEqual({
      ...manifest,
      dependencies: {
        '@pingux/target': '^1.2.4',
        unrelated: '~4.0.0',
      },
      devDependencies: {
        '@pingux/target': 'workspace:^1.2.4',
      },
      optionalDependencies: {
        '@pingux/target': 'workspace:1.2.4',
      },
    });
    expect(result.changes).toEqual([
      {
        field: 'dependencies',
        name: '@pingux/target',
        currentRange: '^1.2.3',
        nextRange: '^1.2.4',
      },
      {
        field: 'devDependencies',
        name: '@pingux/target',
        currentRange: 'workspace:^1.2.3',
        nextRange: 'workspace:^1.2.4',
      },
      {
        field: 'optionalDependencies',
        name: '@pingux/target',
        currentRange: 'workspace:*',
        nextRange: 'workspace:1.2.4',
      },
    ]);
    expect(manifest.dependencies).toBe(dependenciesBefore);
    expect(manifest.devDependencies).toBe(devDependenciesBefore);
    expect(manifest.optionalDependencies).toBe(optionalDependenciesBefore);
    expect(manifest).toEqual({
      name: '@pingux/source',
      dependencies: {
        '@pingux/target': '^1.2.3',
        unrelated: '~4.0.0',
      },
      devDependencies: {
        '@pingux/target': 'workspace:^1.2.3',
      },
      optionalDependencies: {
        '@pingux/target': 'workspace:*',
      },
    });
  });

  test('leaves unrelated, absent, equal, and local-protocol entries unchanged', () => {
    const manifest: PackageManifest = {
      name: '@pingux/source',
      dependencies: {
        '@pingux/target': 'file:../target',
        unrelated: '^4.0.0',
      },
      devDependencies: {
        '@pingux/target': 'link:../target',
      },
      optionalDependencies: {
        '@pingux/target': '^1.2.4',
      },
    };

    const result = updateDependencyRanges(manifest, '@pingux/target', '1.2.4');

    expect(result.changes).toEqual([]);
    expect(result.manifest).toEqual(manifest);
    expect(result.manifest).not.toBe(manifest);
    expect(result.manifest.dependencies).toBe(manifest.dependencies);
    expect(result.manifest.devDependencies).toBe(manifest.devDependencies);
    expect(result.manifest.optionalDependencies).toBe(manifest.optionalDependencies);
  });

  test.each([
    [
      'dependencies',
      {
        name: '@pingux/source',
        devDependencies: { '@pingux/target': '^1.2.3' },
        optionalDependencies: { unrelated: '~4.0.0' },
      },
      {
        name: '@pingux/source',
        devDependencies: { '@pingux/target': '^1.2.4' },
        optionalDependencies: { unrelated: '~4.0.0' },
      },
      [
        {
          field: 'devDependencies',
          name: '@pingux/target',
          currentRange: '^1.2.3',
          nextRange: '^1.2.4',
        },
      ],
    ],
    [
      'devDependencies',
      {
        name: '@pingux/source',
        dependencies: { '@pingux/target': '~1.2.3' },
        optionalDependencies: { unrelated: '~4.0.0' },
      },
      {
        name: '@pingux/source',
        dependencies: { '@pingux/target': '~1.2.4' },
        optionalDependencies: { unrelated: '~4.0.0' },
      },
      [
        {
          field: 'dependencies',
          name: '@pingux/target',
          currentRange: '~1.2.3',
          nextRange: '~1.2.4',
        },
      ],
    ],
    [
      'optionalDependencies',
      {
        name: '@pingux/source',
        dependencies: { '@pingux/target': 'workspace:*' },
        devDependencies: { unrelated: '^4.0.0' },
      },
      {
        name: '@pingux/source',
        dependencies: { '@pingux/target': 'workspace:1.2.4' },
        devDependencies: { unrelated: '^4.0.0' },
      },
      [
        {
          field: 'dependencies',
          name: '@pingux/target',
          currentRange: 'workspace:*',
          nextRange: 'workspace:1.2.4',
        },
      ],
    ],
  ] as const)('preserves omitted %s fields without spurious changes', (
    omittedField,
    manifest,
    expectedManifest,
    expectedChanges,
  ) => {
    const result = updateDependencyRanges(manifest, '@pingux/target', '1.2.4');

    expect(result.manifest).toEqual(expectedManifest);
    expect(result.changes).toEqual(expectedChanges);
    expect(result.manifest).not.toHaveProperty(omittedField);
  });
});

describe('assertDistManifestVersions', () => {
  // node:fs is mocked module-wide for the release script assertions, so the
  // setup helpers use the real filesystem functions directly.
  const realFs = jest.requireActual('node:fs') as typeof fs;
  const distPackageJson = (projectName: string, version: string | undefined) => {
    const distDir = path.join(process.cwd(), 'dist', projectName);
    const manifestPath = path.join(distDir, 'package.json');
    realFs.mkdirSync(distDir, { recursive: true });
    realFs.writeFileSync(
      manifestPath,
      JSON.stringify({ name: `@pingux/${projectName}`, version }),
      'utf8',
    );
    return manifestPath;
  };

  let tempDirs: string[] = [];

  const useTempCwd = () => {
    const tempDir = realFs.mkdtempSync(path.join(os.tmpdir(), 'stable-release-dist-'));
    tempDirs.push(tempDir);
    jest.spyOn(process, 'cwd').mockReturnValue(tempDir);
    return tempDir;
  };

  afterEach(() => {
    tempDirs.forEach(tempDir => realFs.rmSync(tempDir, { recursive: true, force: true }));
    tempDirs = [];
    jest.restoreAllMocks();
  });

  test('passes when every dist manifest matches the expected version', () => {
    useTempCwd();
    distPackageJson('astro', '2.221.2');
    distPackageJson('onyx-tokens', '0.41.4');

    expect(() => assertDistManifestVersions({
      astro: '2.221.2',
      'onyx-tokens': '0.41.4',
    }),
    ).not.toThrow();
  });

  test('throws when a dist manifest is missing, stale, or unversioned', () => {
    useTempCwd();
    distPackageJson('astro', '2.221.3-alpha.0');
    distPackageJson('onyx-tokens', undefined);

    expect(() => assertDistManifestVersions({ astro: '2.221.2' }),
    ).toThrow('dist manifest is 2.221.3-alpha.0 but the release version is 2.221.2');

    expect(() => assertDistManifestVersions({ 'onyx-tokens': '0.41.4' }),
    ).toThrow('dist manifest is missing a version but the release version is 0.41.4');

    expect(() => assertDistManifestVersions({ 'onyx-wrapper': '0.41.3' }),
    ).toThrow(/missing .*dist\/onyx-wrapper\/package\.json/);
  });
});

describe('stableRelease module import', () => {
  test('does not start release orchestration or write output when imported', () => {
    const processExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit should not be called while importing stableRelease');
    });

    try {
      jest.resetModules();
      jest.isolateModules(() => {
        // The module must be loaded inside isolateModules to verify import-time behavior.
        // eslint-disable-next-line global-require
        require('../../../../stableRelease');
      });

      expect(mockYargsParseAsync).not.toHaveBeenCalled();
      expect(mockCreateProjectGraphAsync).not.toHaveBeenCalled();
      expect(mockReleaseVersion).not.toHaveBeenCalled();
      expect(mockReleaseChangelog).not.toHaveBeenCalled();
      expect(mockReleasePublish).not.toHaveBeenCalled();
      expect(mockWriteFileSync).not.toHaveBeenCalled();
      expect(processExit).not.toHaveBeenCalled();
    } finally {
      processExit.mockRestore();
    }
  });
});
