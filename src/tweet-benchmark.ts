import { tweetHtmlCache } from './utils/tweetCache';

const tweetUrl = 'https://twitter.com/Interior/status/463440424141459456';
const apiUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&omit_script=1&dnt=1`;

console.log('Testing Uncached Scenario (Simulating without Cache)...');
const startUncached = performance.now();
// Simulating 10 requests without cache
const uncachedPromises = [];
for (let i = 0; i < 10; i++) {
  uncachedPromises.push(
    fetch(apiUrl, { signal: AbortSignal.timeout(5000) })
      .then(res => res.json())
      .then(data => data.html)
  );
}
await Promise.all(uncachedPromises);
const endUncached = performance.now();
const uncachedTime = endUncached - startUncached;
console.log(`Uncached (10 concurrent requests): ${uncachedTime.toFixed(2)} ms`);

console.log('\nTesting Cached Scenario...');

const startCold = performance.now();

let coldPromise = tweetHtmlCache.get(tweetUrl);
if (!coldPromise) {
    coldPromise = (async () => {
        const res = await fetch(apiUrl, { signal: AbortSignal.timeout(5000) });
        const data = await res.json();
        return data.html;
    })();
    tweetHtmlCache.set(tweetUrl, coldPromise);
}
await coldPromise;

const endCold = performance.now();
const coldCacheTime = endCold - startCold;
console.log(`Cold Cache (1 request): ${coldCacheTime.toFixed(2)} ms`);

const startHot = performance.now();
const hotPromises = [];
for (let i = 0; i < 9; i++) {
  const p = tweetHtmlCache.get(tweetUrl);
  if (p) hotPromises.push(p);
}
await Promise.all(hotPromises);
const endHot = performance.now();
const hotCacheTime = endHot - startHot;
console.log(`Hot Cache (9 concurrent requests): ${hotCacheTime.toFixed(2)} ms`);

const totalCachedTime = coldCacheTime + hotCacheTime;
console.log(`\nTotal Cached (10 concurrent requests handled properly): ${totalCachedTime.toFixed(2)} ms`);

console.log(`\nSpeedup: ${(uncachedTime / totalCachedTime).toFixed(2)}x faster`);