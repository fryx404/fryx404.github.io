export function isSafeUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);

    // 1. プロトコルの確認
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    const hostname = url.hostname;

    // 2. ローカルホスト等のブロック
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local")
    ) {
      return false;
    }

    // 3. IPアドレス直接指定のブロック
    // new URL() によって IPv4 は '127.0.0.1' のような形式に正規化され、
    // 10進数('2130706433')や16進数('0x7f000001')も標準形式に変換される。
    // IPv6 は '[::1]' のようにブラケットで囲まれる。
    const ipv4Pattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^\[.*\]$/;

    if (ipv4Pattern.test(hostname) || ipv6Pattern.test(hostname)) {
      return false;
    }

    return true;
  } catch {
    // URLのパースに失敗した場合は安全でないとみなす
    return false;
  }
}
