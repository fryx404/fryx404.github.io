import { describe, it, expect } from "bun:test";
import { isSafeUrl } from "./url";

describe("isSafeUrl", () => {
  it("allows safe URLs", () => {
    expect(isSafeUrl("http://example.com")).toBe(true);
    expect(isSafeUrl("https://example.com")).toBe(true);
    expect(isSafeUrl("https://example.com/path?query=1")).toBe(true);
    expect(isSafeUrl("https://sub.example.com")).toBe(true);
  });

  it("blocks non-http/https protocols", () => {
    expect(isSafeUrl("ftp://example.com")).toBe(false);
    expect(isSafeUrl("file:///etc/passwd")).toBe(false);
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("data:text/plain;base64,SGVsbG8=")).toBe(false);
    expect(isSafeUrl("gopher://example.com")).toBe(false);
  });

  it("blocks localhost and local domains", () => {
    expect(isSafeUrl("http://localhost")).toBe(false);
    expect(isSafeUrl("http://localhost:8080")).toBe(false);
    expect(isSafeUrl("http://test.localhost")).toBe(false);
    expect(isSafeUrl("http://my-mac.local")).toBe(false);
  });

  it("blocks IPv4 addresses", () => {
    // Loopback
    expect(isSafeUrl("http://127.0.0.1")).toBe(false);
    // Private networks
    expect(isSafeUrl("http://10.0.0.1")).toBe(false);
    expect(isSafeUrl("http://172.16.0.1")).toBe(false);
    expect(isSafeUrl("http://192.168.1.1")).toBe(false);
    // Cloud metadata
    expect(isSafeUrl("http://169.254.169.254")).toBe(false);
    // Public IP (blocked by IP rule)
    expect(isSafeUrl("http://8.8.8.8")).toBe(false);
  });

  it("blocks obfuscated IPv4 addresses (parsed by new URL)", () => {
    // Decimal representation of 127.0.0.1
    expect(isSafeUrl("http://2130706433")).toBe(false);
    // Hex representation of 127.0.0.1
    expect(isSafeUrl("http://0x7f000001")).toBe(false);
    // Octal representation
    expect(isSafeUrl("http://0177.0000.0000.0001")).toBe(false);
  });

  it("blocks IPv6 addresses", () => {
    expect(isSafeUrl("http://[::1]")).toBe(false);
    expect(isSafeUrl("http://[fe80::1]")).toBe(false);
    expect(isSafeUrl("http://[2001:db8::1]")).toBe(false);
  });

  it("handles invalid URLs gracefully", () => {
    expect(isSafeUrl("not a url")).toBe(false);
    expect(isSafeUrl("")).toBe(false);
  });
});
