// Clean Architecture import matrix (TDD §1.3) and determinism rules, enforced by ESLint.

const PACKAGES = [
  'kernel',
  'content-schema',
  'content-core',
  'sim',
  'meta',
  'app',
  'sim-host',
  'render',
  'stores',
  'ui',
  'infra',
  'testkit',
  'tools',
];

/** Row may import column. */
export const ALLOWED = {
  kernel: [],
  'content-schema': ['kernel'],
  'content-core': ['kernel', 'content-schema'],
  sim: ['kernel', 'content-schema'],
  meta: ['kernel', 'content-schema'],
  app: ['kernel', 'content-schema', 'sim', 'meta'],
  'sim-host': ['kernel', 'content-schema', 'sim'],
  render: ['kernel', 'content-schema'],
  stores: ['kernel', 'content-schema', 'app'],
  ui: ['kernel', 'content-schema', 'render', 'stores'],
  infra: ['kernel', 'content-schema', 'app'],
  testkit: ['kernel', 'content-schema', 'sim', 'meta', 'app'],
  tools: ['kernel', 'content-schema', 'content-core', 'sim', 'meta'],
};

/** Domain packages: pure, deterministic, worker-safe. */
const DETERMINISTIC = new Set(['kernel', 'content-schema', 'content-core', 'sim', 'meta']);

/** Packages that must not know about UI frameworks. */
const FRAMEWORK_FREE = new Set([...DETERMINISTIC, 'app']);

const FRAMEWORK_MODULES = [
  'react',
  'react/*',
  'react-dom',
  'react-dom/*',
  'next',
  'next/*',
  'pixi.js',
  'pixi.js/*',
  'zustand',
  'zustand/*',
];

const BROWSER_GLOBALS = [
  'window',
  'document',
  'navigator',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'requestAnimationFrame',
  'fetch',
];

const NON_DETERMINISTIC_GLOBALS = ['Date', 'performance', 'setTimeout', 'setInterval'];

const NON_DETERMINISTIC_MATH = [
  'random',
  'pow',
  'exp',
  'expm1',
  'log',
  'log1p',
  'log2',
  'log10',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'atan2',
  'sinh',
  'cosh',
  'tanh',
  'cbrt',
  'hypot',
];

const globalsRule = (names, message) =>
  names.map((name) => ({ name, message: `${message} (${name})` }));

function importRule(name) {
  const forbidden = PACKAGES.filter((p) => p !== name && !ALLOWED[name].includes(p));
  const patterns = [
    {
      group: ['@gotn/*/**'],
      message: 'Import from the package entry point only; deep imports are not allowed.',
    },
  ];
  if (forbidden.length > 0) {
    patterns.push({
      group: forbidden.map((p) => `@gotn/${p}`),
      message: `@gotn/${name} may not depend on this package (Clean Architecture import matrix).`,
    });
  }
  if (FRAMEWORK_FREE.has(name)) {
    patterns.push({
      group: FRAMEWORK_MODULES,
      message: 'Domain and application layers must not import UI or rendering frameworks.',
    });
  }
  const paths =
    name === 'stores'
      ? [
          { name: 'react', message: 'Stores are framework-free; React bindings live in @gotn/ui.' },
          { name: 'zustand', message: 'Use zustand/vanilla in @gotn/stores.' },
        ]
      : [];
  return ['error', { patterns, paths }];
}

export function layerConfigs() {
  return PACKAGES.map((name) => {
    const rules = { 'no-restricted-imports': importRule(name) };

    if (DETERMINISTIC.has(name)) {
      rules['no-restricted-globals'] = [
        'error',
        ...globalsRule(BROWSER_GLOBALS, 'Not available in deterministic domain code'),
        ...globalsRule(NON_DETERMINISTIC_GLOBALS, 'Non-deterministic API'),
      ];
      rules['no-restricted-properties'] = [
        'error',
        ...NON_DETERMINISTIC_MATH.map((property) => ({
          object: 'Math',
          property,
          message: 'Non-deterministic or engine-dependent math; use baked tables and basic ops.',
        })),
      ];
      rules['no-restricted-syntax'] = [
        'error',
        {
          selector: "BinaryExpression[operator='**']",
          message: 'Exponentiation is banned in deterministic code; use baked tables.',
        },
        {
          selector: "AssignmentExpression[operator='**=']",
          message: 'Exponentiation is banned in deterministic code; use baked tables.',
        },
        {
          selector: "CallExpression[callee.property.name='sort'][arguments.length=0]",
          message: 'Array.sort requires an explicit comparator for deterministic ordering.',
        },
      ];
    } else if (name === 'app') {
      rules['no-restricted-globals'] = [
        'error',
        ...globalsRule(BROWSER_GLOBALS, 'Use an application port instead'),
      ];
    }

    return {
      name: `gotn/layer/${name}`,
      files: [`packages/${name}/**/*.{ts,tsx}`],
      rules,
    };
  });
}

export const webLayerConfig = {
  name: 'gotn/layer/web',
  files: ['apps/web/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@gotn/*/**'],
            message: 'Import from the package entry point only; deep imports are not allowed.',
          },
        ],
      },
    ],
  },
};
