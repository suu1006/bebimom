const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const sharedRoot = path.resolve(projectRoot, "../shared");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [sharedRoot];

// `nodeModulesPaths`가 mobile/node_modules만 보므로, 루트에 없는 패키지는 여기서 실제 위치로 연결합니다.
const vectorIconsRoot = path.resolve(
    projectRoot,
    "node_modules/expo/node_modules/@expo/vector-icons"
);

config.resolver.extraNodeModules = {
    "@shared": sharedRoot,
    "@expo/vector-icons": vectorIconsRoot,
};

// nodeModulesPaths를 명시하면 어느 위치의 패키지에서 require를 하든 mobile/node_modules를 항상 참조하게 되니까 꼬일 가능성없음
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
];

// Babel 외에 Metro가 직접 묶을 때도 `@/` → `src/` 로 해석되도록 합니다.
const upstreamResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName.startsWith("@/")) {
        const target = path.resolve(projectRoot, "src", moduleName.slice(2));
        return context.resolveRequest(
            {
                ...context,
                resolveRequest: upstreamResolveRequest ?? context.resolveRequest,
            },
            target,
            platform,
        );
    }
    if (upstreamResolveRequest) {
        return upstreamResolveRequest(context, moduleName, platform);
    }
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });