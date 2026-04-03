// Benchmark to measure performance of regex extraction vs optimized extraction

const simulateLargeHTML = () => {
  const headStart = `<!DOCTYPE html>\n<html>\n<head>\n  <title>Test Page Title</title>\n`;
  // Simulate a huge inline script or style inside head
  const largeInlineScript = `  <script>\n    const data = "${'A'.repeat(10000)}";\n  </script>\n`;
  const metaTags = `  <!-- Missing meta tags to force fallback matches -->\n`;
  const headEnd = `</head>\n`;

  // Simulate a huge body
  const bodyStart = `<body>\n`;
  // Add matching elements in body that regex will need to skip or search through if it falls back
  // This simulates the worst case: missing meta tags and large html body
  const largeBodyContent = `  <div>${'<meta property="fake" content="fake" />\n'.repeat(500000)}</div>\n`;
  const bodyEnd = `</body>\n</html>`;

  return headStart + largeInlineScript + metaTags + headEnd + bodyStart + largeBodyContent + bodyEnd;
};

const runBenchmark = () => {
  console.log("Generating large HTML string...");
  const html = simulateLargeHTML();
  console.log(`HTML length: ${html.length} characters`);

  const iterations = 100; // Reduce iterations since this will be slower

  // Baseline approach (Original)
  console.log("\\n--- Baseline (Original) ---");
  const startOriginal = performance.now();
  for (let i = 0; i < iterations; i++) {
    const ogTitle =
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)?.[1] ??
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];

    const ogDesc =
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i)?.[1] ??
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1];

    const ogImg =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
  }
  const endOriginal = performance.now();
  const timeOriginal = endOriginal - startOriginal;
  console.log(`Original Time: ${timeOriginal.toFixed(2)} ms`);

  // Optimized approach (Proposed)
  console.log("\\n--- Optimized (Proposed) ---");
  const startOptimized = performance.now();
  for (let i = 0; i < iterations; i++) {
    const headEndIndex = html.indexOf('</head>');
    const maxSearchLength = 30000;
    const searchLimit = headEndIndex !== -1
        ? Math.min(headEndIndex + 7, maxSearchLength)
        : maxSearchLength;

    const headHtml = html.slice(0, searchLimit);

    const ogTitle =
      headHtml.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
      headHtml.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)?.[1] ??
      headHtml.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];

    const ogDesc =
      headHtml.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
      headHtml.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i)?.[1] ??
      headHtml.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1];

    const ogImg =
      headHtml.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
      headHtml.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
  }
  const endOptimized = performance.now();
  const timeOptimized = endOptimized - startOptimized;
  console.log(`Optimized Time: ${timeOptimized.toFixed(2)} ms`);

  console.log(`\\nSpeedup: ${(timeOriginal / timeOptimized).toFixed(2)}x faster`);
};

runBenchmark();
