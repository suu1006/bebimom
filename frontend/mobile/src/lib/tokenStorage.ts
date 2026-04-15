type SecureStoreModule = typeof import("expo-secure-store");

let backend: SecureStoreModule | "memory" | undefined;

const memory = new Map<string, string>();

function getBackend(): SecureStoreModule | "memory" {
  if (backend !== undefined) return backend;
  try {
    // 네이티브 모듈은 정적 import 시 앱 로드 단계에서 터질 수 있어 require로 지연 로드
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    backend = require("expo-secure-store") as SecureStoreModule;
    return backend;
  } catch {
    if (__DEV__) {
      console.warn(
        "[tokenStorage] ExpoSecureStore를 찾을 수 없습니다. 개발용 메모리 저장을 사용합니다. " +
          "시뮬레이터/디바이스에서는 `npx expo run:ios`로 네이티브 앱을 다시 빌드하세요."
      );
    }
    backend = "memory";
    return backend;
  }
}

export async function getStoredToken(key: string): Promise<string | null> {
  const b = getBackend();
  if (b === "memory") return memory.get(key) ?? null;
  return b.getItemAsync(key);
}

export async function setStoredToken(key: string, value: string): Promise<void> {
  const b = getBackend();
  if (b === "memory") {
    memory.set(key, value);
    return;
  }
  await b.setItemAsync(key, value);
}

export async function deleteStoredToken(key: string): Promise<void> {
  const b = getBackend();
  if (b === "memory") {
    memory.delete(key);
    return;
  }
  await b.deleteItemAsync(key);
}
