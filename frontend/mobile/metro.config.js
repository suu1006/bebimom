const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const sharedRoot = path.resolve(projectRoot, "../shared");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [sharedRoot];

config.resolver.extraNodeModules = {
    "@shared": sharedRoot,
};

// nodeModulesPaths를 명시하면 어느 위치의 패키지에서 require를 하든 mobile/node_modules를 항상 참조하게 되니까 꼬일 가능성없음
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
];

module.exports = withNativeWind(config, { input: "./global.css" });