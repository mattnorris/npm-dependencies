# npm-dependencies

Count NPM dependencies

## Installation

```bash
npm install -g npm-dependencies
```

## Usage

```bash
npm-dependencies yargs
```
Would output:

```
Finding dependencies for: yargs@latest...
Result: yargs@4.7.1 requires 50 dependencies
```

### Options

#### --registry or -r

Provide a different NPM registry, for private repos.

```bash
npm-dependencies yargs --registry=https://npm.domain.com:8080
npm-dependencies yargs -r https://npm.domain.com:8080
```

#### --dev or -d

Include devDependencies as well.

```bash
npm-dependencies yargs --dev
npm-dependencies yargs -d
```
```
Finding dependencies for: yargs@latest...
Result: yargs@4.7.1 requires 412 dependencies
```

#### --list or -l

List dependencies with the results.

```bash
npm-dependencies yargs --list
npm-dependencies yargs -l
```
```
Finding dependencies for: yargs@latest...

    • ansi-regex@2.0.0
    • builtin-modules@1.1.1
    • camelcase@2.1.1
    • camelcase@3.0.0
    • cliui@3.2.0
    • code-point-at@1.0.0
    • decamelize@1.2.0
    • error-ex@1.3.0
    • find-up@1.1.2
    • graceful-fs@4.1.4
    • hosted-git-info@2.1.5
    • invert-kv@1.0.0
    • is-arrayish@0.2.1
    • is-builtin-module@1.0.0
    • is-fullwidth-code-point@1.0.0
    • is-utf8@0.2.1
    • lcid@1.0.0
    • load-json-file@1.1.0
    • lodash.assign@4.0.9
    • lodash.keys@4.0.7
    • lodash.rest@4.0.3
    • normalize-package-data@2.3.5
    • number-is-nan@1.0.0
    • object-assign@4.1.0
    • os-locale@1.4.0
    • parse-json@2.2.0
    • path-exists@2.1.0
    • path-type@1.1.0
    • pify@2.3.0
    • pinkie-promise@2.0.1
    • pinkie@2.0.4
    • pkg-conf@1.1.3
    • read-pkg-up@1.0.1
    • read-pkg@1.1.0
    • require-main-filename@1.0.1
    • semver@5.1.0
    • set-blocking@1.0.0
    • spdx-correct@1.0.2
    • spdx-exceptions@1.0.4
    • spdx-expression-parse@1.0.2
    • spdx-license-ids@1.2.1
    • string-width@1.0.1
    • strip-ansi@3.0.1
    • strip-bom@2.0.0
    • symbol@0.2.3
    • validate-npm-package-license@3.0.1
    • window-size@0.2.0
    • wrap-ansi@2.0.0
    • y18n@3.2.1
    • yargs-parser@2.4.0

Result: yargs@4.7.1 requires 50 dependencies
```

## License

Copyright (c) 2016 Jibo, Inc.

Released under the MIT License.