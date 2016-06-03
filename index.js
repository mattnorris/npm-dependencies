"use strict";

const minimist = require('minimist');
const request = require('request');
const colors = require('colors');

// Commandline arguments
const args = minimist(process.argv.slice(2), {
    boolean: ['list', 'debug'],
    string: 'registry',
    alias: {
        r: 'registry',
        l: 'list',
        d: 'dev'
    },
    default: {
        registry: 'https://registry.npmjs.com',
        list: false,
        dev: false
    }
});

if (!args._.length) {
    console.log("Must provide a package name.".red);
    process.exit(1);
}

let version = 'latest', name = args._[0];

if (name.indexOf("@") > -1) {
    const parts = name.split("@");
    name = parts[0];
    version = parts[1];
}

console.log("Finding dependencies for: %s@%s...".gray, name, version);

const result = {
    main: null,
    dependencies: 0,
    currentRequests: 1,
    cache: {},
    requests: {}
};

function count(name, version, callback) {
    request.get(`${args.registry}/${name}/${version}`, (err, httpResponse, body) => {
        result.currentRequests--;
        if (err || !body) {
            console.log("Invalid package name '%s'".red, name);
            process.exit(1);
            return;
        }
        body = JSON.parse(body);
        if (!Object.keys(body).length) {
            console.log("Invalid package name '%s'".red, name);
            process.exit(1);
            return;
        }
        callback(body);
        if (!result.currentRequests) {
            if (args.list && result.dependencies) {
                console.log(("\n    • " + Object.keys(result.cache).sort().join("\n    • ")).gray);
                console.log();
            }
            console.log("Result: %s requires %d dependencies".green, result.main, result.dependencies);
            console.log();
            process.exit(0);
        }
    });
}

function handleDependency(body, ignoreFromCache, includeDev) {
    const id = `${body.name}@${body.version}`;
    const cache = result.cache[id];
    if (!cache) {
        if (!ignoreFromCache) {
            result.dependencies++;
            result.cache[id] = true;
        }
        const devDependencies = body.devDependencies;
        const dependencies = body.dependencies;
        if (dependencies && Object.keys(dependencies)) {
            for(let n in dependencies) {
                const r = `${n}@${dependencies[n]}`;
                if (!result.requests[r]) {
                    result.requests[r] = true;
                    result.currentRequests++;
                    count(n, dependencies[n], handleDependency);
                }
            }
        }
        if (includeDev && devDependencies && Object.keys(devDependencies)) {
            for(let n in devDependencies) {
                const r = `${n}@${devDependencies[n]}`;
                if (!result.requests[r]) {
                    result.requests[r] = true;
                    result.currentRequests++;
                    count(n, devDependencies[n], handleDependency);
                }
            }
        }
    }
}

// Start the search!
count(name, version, (body) => {
    result.main = `${body.name}@${body.version}`;
    handleDependency(body, true, args.dev);    
});
