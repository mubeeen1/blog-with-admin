-- Adding comprehensive sample blog posts for testing
-- Insert sample blog posts with rich content for testing

-- Note: These will use the first admin user's ID as author_id
-- The admin user ID will be inserted when the first admin signs up

INSERT INTO public.blog_posts (
  title,
  content,
  excerpt,
  slug,
  featured_image,
  status,
  featured,
  tags,
  views,
  likes,
  author_id
) VALUES 
(
  'The Future of AI in Web Development',
  '<h2>Introduction</h2>
<p>Artificial Intelligence is revolutionizing every aspect of technology, and web development is no exception. From automated code generation to intelligent user interfaces, AI is transforming how we build and interact with web applications.</p>

<h2>AI-Powered Development Tools</h2>
<p>Modern development environments are increasingly incorporating AI assistants that can:</p>
<ul>
<li><strong>Generate code snippets</strong> based on natural language descriptions</li>
<li><strong>Debug applications</strong> by analyzing error patterns and suggesting fixes</li>
<li><strong>Optimize performance</strong> through intelligent code analysis</li>
<li><strong>Create responsive designs</strong> automatically based on content requirements</li>
</ul>

<h2>Machine Learning in User Experience</h2>
<p>AI is enabling more personalized and intuitive user experiences through:</p>
<blockquote>
<p>"The future of web development lies in creating applications that understand and adapt to user behavior in real-time." - Tech Industry Expert</p>
</blockquote>

<h3>Personalization Engines</h3>
<p>Modern web applications use machine learning algorithms to analyze user behavior and preferences, delivering customized content and interfaces that improve engagement and conversion rates.</p>

<h3>Intelligent Chatbots and Virtual Assistants</h3>
<p>AI-powered conversational interfaces are becoming standard features, providing instant customer support and guidance through complex workflows.</p>

<h2>The Road Ahead</h2>
<p>As we look toward the future, several trends are emerging:</p>
<ol>
<li><strong>No-code/Low-code platforms</strong> powered by AI will democratize web development</li>
<li><strong>Automated testing and deployment</strong> will become more sophisticated</li>
<li><strong>Voice and gesture interfaces</strong> will complement traditional web interactions</li>
<li><strong>Predictive analytics</strong> will drive proactive user experience improvements</li>
</ol>

<p>The integration of AI in web development is not just a trend—it''s the foundation of the next generation of digital experiences.</p>',
  'Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications, from automated code generation to intelligent user interfaces.',
  'future-ai-web-development',
  '/futuristic-ai-coding-interface.png',
  'published',
  true,
  ARRAY['AI', 'Web Development', 'Future Tech', 'Machine Learning'],
  2847,
  156,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Next.js 15: What''s New and Exciting',
  '<h2>Revolutionary Changes in Next.js 15</h2>
<p>Next.js 15 brings groundbreaking improvements that will change how we think about React development. This major release focuses on performance, developer experience, and modern web standards.</p>

<h2>Enhanced App Router</h2>
<p>The App Router has received significant improvements:</p>
<ul>
<li><strong>Faster navigation</strong> with improved prefetching strategies</li>
<li><strong>Better caching mechanisms</strong> for optimal performance</li>
<li><strong>Enhanced streaming</strong> for progressive page loading</li>
<li><strong>Improved error boundaries</strong> with better debugging information</li>
</ul>

<h2>Server Components Evolution</h2>
<p>React Server Components in Next.js 15 offer unprecedented capabilities:</p>

<h3>Zero-Bundle Server Components</h3>
<p>Server Components now have zero impact on client bundle size, allowing for more complex server-side logic without affecting performance.</p>

<h3>Streaming and Suspense</h3>
<p>Enhanced streaming capabilities allow for better user experiences with progressive loading and improved perceived performance.</p>

<pre><code>// Example of new streaming capabilities
import { Suspense } from ''react''
import { DataComponent } from ''./components''

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  )
}</code></pre>

<h2>Performance Improvements</h2>
<p>Next.js 15 delivers significant performance gains:</p>
<blockquote>
<p>"Build times are up to 40% faster, and runtime performance has improved by an average of 25% across all metrics." - Vercel Team</p>
</blockquote>

<h3>Turbopack Integration</h3>
<p>The new Rust-based bundler Turbopack is now stable and provides lightning-fast development builds.</p>

<h2>Developer Experience Enhancements</h2>
<p>Several quality-of-life improvements make development more enjoyable:</p>
<ol>
<li><strong>Improved TypeScript support</strong> with better type inference</li>
<li><strong>Enhanced debugging tools</strong> with better error messages</li>
<li><strong>Simplified configuration</strong> with sensible defaults</li>
<li><strong>Better IDE integration</strong> with improved autocomplete</li>
</ol>

<p>Next.js 15 represents a significant leap forward in React development, making it easier than ever to build fast, scalable web applications.</p>',
  'A comprehensive look at the latest features and improvements in Next.js 15 that every developer should know about.',
  'nextjs-15-whats-new-exciting',
  '/nextjs-tech-background.png',
  'published',
  false,
  ARRAY['Next.js', 'React', 'JavaScript', 'Web Development'],
  1923,
  89,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Building Scalable APIs with Edge Computing',
  '<h2>The Edge Computing Revolution</h2>
<p>Edge computing is transforming how we think about API development and deployment. By bringing computation closer to users, edge computing reduces latency and improves performance for global applications.</p>

<h2>Understanding Edge Computing</h2>
<p>Edge computing involves processing data at or near the source of data generation, rather than relying on centralized cloud servers.</p>

<h3>Key Benefits</h3>
<ul>
<li><strong>Reduced Latency</strong> - Faster response times for users worldwide</li>
<li><strong>Improved Reliability</strong> - Distributed architecture reduces single points of failure</li>
<li><strong>Better Performance</strong> - Localized processing reduces bandwidth requirements</li>
<li><strong>Enhanced Security</strong> - Data processing closer to the source</li>
</ul>

<h2>Edge API Architecture Patterns</h2>
<p>Several patterns emerge when building APIs for edge deployment:</p>

<h3>1. Distributed Caching</h3>
<p>Implement intelligent caching strategies that work across edge locations:</p>
<pre><code>// Example edge caching strategy
export default async function handler(request) {
  const cacheKey = generateCacheKey(request)
  const cached = await edge.cache.get(cacheKey)
  
  if (cached) {
    return new Response(cached, {
      headers: { ''Cache-Control'': ''public, max-age=3600'' }
    })
  }
  
  const data = await fetchData(request)
  await edge.cache.set(cacheKey, data, { ttl: 3600 })
  
  return new Response(data)
}</code></pre>

<h3>2. Geographic Routing</h3>
<p>Route requests to the nearest edge location based on user geography:</p>
<blockquote>
<p>"Edge computing allows us to serve users from the closest possible location, reducing latency by up to 80% in some cases." - Cloud Architecture Expert</p>
</blockquote>

<h3>3. Data Synchronization</h3>
<p>Implement strategies for keeping data consistent across edge locations while maintaining performance.</p>

<h2>Implementation Strategies</h2>
<p>When building edge APIs, consider these implementation approaches:</p>

<h3>Serverless Edge Functions</h3>
<p>Leverage serverless platforms that support edge deployment:</p>
<ol>
<li><strong>Vercel Edge Functions</strong> - Built on Web APIs for maximum compatibility</li>
<li><strong>Cloudflare Workers</strong> - V8 isolates for fast cold starts</li>
<li><strong>AWS Lambda@Edge</strong> - Integration with CloudFront CDN</li>
</ol>

<h3>Database Considerations</h3>
<p>Choose databases that support edge deployment:</p>
<ul>
<li><strong>Distributed databases</strong> like PlanetScale or CockroachDB</li>
<li><strong>Edge-optimized solutions</strong> like Upstash Redis</li>
<li><strong>Multi-region setups</strong> with read replicas</li>
</ul>

<h2>Best Practices</h2>
<p>Follow these best practices for edge API development:</p>
<ul>
<li>Keep functions lightweight and focused</li>
<li>Implement proper error handling and fallbacks</li>
<li>Use appropriate caching strategies</li>
<li>Monitor performance across all edge locations</li>
<li>Plan for data consistency challenges</li>
</ul>

<p>Edge computing represents the future of API development, enabling truly global applications with local performance.</p>',
  'Learn how edge computing is transforming API development and deployment strategies for modern applications.',
  'building-scalable-apis-edge-computing',
  '/edge-computing-network.png',
  'published',
  false,
  ARRAY['Edge Computing', 'APIs', 'Performance', 'Cloud Architecture'],
  3156,
  127,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Modern CSS: Grid, Flexbox, and Beyond',
  '<h2>The Evolution of CSS Layout</h2>
<p>CSS has evolved dramatically over the past few years, giving developers powerful tools for creating complex, responsive layouts with ease. Modern CSS features like Grid and Flexbox have revolutionized how we approach web design.</p>

<h2>CSS Grid: The Ultimate Layout System</h2>
<p>CSS Grid provides a two-dimensional layout system that makes complex designs simple:</p>

<h3>Basic Grid Setup</h3>
<pre><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 2rem;
}

.item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 8px;
}</code></pre>

<h3>Advanced Grid Techniques</h3>
<ul>
<li><strong>Grid Areas</strong> - Named grid regions for semantic layouts</li>
<li><strong>Subgrid</strong> - Nested grids that inherit parent grid lines</li>
<li><strong>Auto-placement</strong> - Intelligent item positioning</li>
</ul>

<h2>Flexbox: One-Dimensional Mastery</h2>
<p>Flexbox excels at one-dimensional layouts and component-level design:</p>

<blockquote>
<p>"Flexbox and Grid complement each other perfectly - use Grid for page layout and Flexbox for component layout." - CSS Expert</p>
</blockquote>

<h3>Flexbox Best Practices</h3>
<pre><code>.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 auto;
  min-width: 0; /* Prevents overflow issues */
}</code></pre>

<h2>Container Queries: The Future is Here</h2>
<p>Container queries allow components to respond to their container size rather than viewport size:</p>

<pre><code>@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
  
  .card-image {
    flex: 0 0 200px;
  }
}</code></pre>

<h2>CSS Custom Properties (Variables)</h2>
<p>CSS variables enable dynamic theming and maintainable stylesheets:</p>

<h3>Creating a Design System</h3>
<pre><code>:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --spacing-unit: 0.5rem;
  --border-radius: 0.5rem;
}

.button {
  background: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
  border-radius: var(--border-radius);
}</code></pre>

<h2>Modern CSS Features</h2>
<p>Several cutting-edge CSS features are changing how we write styles:</p>

<h3>CSS Logical Properties</h3>
<p>Write direction-agnostic CSS for international applications:</p>
<ul>
<li><code>margin-inline-start</code> instead of <code>margin-left</code></li>
<li><code>border-block-end</code> instead of <code>border-bottom</code></li>
<li><code>padding-inline</code> for horizontal padding</li>
</ul>

<h3>CSS Cascade Layers</h3>
<p>Control specificity with cascade layers:</p>
<pre><code>@layer reset, base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .heading { font-size: 1.5rem; }
}</code></pre>

<p>Modern CSS provides unprecedented control over layout and design, enabling developers to create beautiful, responsive interfaces with clean, maintainable code.</p>',
  'Explore the latest CSS features including Grid, Flexbox, Container Queries, and modern layout techniques.',
  'modern-css-grid-flexbox-beyond',
  '/geometric-web-interface.png',
  'published',
  false,
  ARRAY['CSS', 'Web Design', 'Frontend', 'Layout'],
  1654,
  73,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'TypeScript Advanced Patterns and Best Practices',
  '<h2>Mastering TypeScript''s Advanced Features</h2>
<p>TypeScript has evolved into a powerful type system that enables developers to write more robust and maintainable code. Understanding advanced patterns can significantly improve your development experience.</p>

<h2>Generic Constraints and Conditional Types</h2>
<p>Advanced generic patterns allow for more flexible and type-safe APIs:</p>

<h3>Conditional Types</h3>
<pre><code>type ApiResponse<T> = T extends string 
  ? { message: T } 
  : T extends number 
  ? { count: T } 
  : { data: T }

// Usage
type StringResponse = ApiResponse<string>  // { message: string }
type NumberResponse = ApiResponse<number>  // { count: number }
type ObjectResponse = ApiResponse<User>    // { data: User }</code></pre>

<h3>Mapped Types</h3>
<p>Create new types by transforming existing ones:</p>
<pre><code>type Optional<T> = {
  [K in keyof T]?: T[K]
}

type Required<T> = {
  [K in keyof T]-?: T[K]
}

type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}</code></pre>

<h2>Template Literal Types</h2>
<p>Build sophisticated string-based types:</p>

<blockquote>
<p>"Template literal types enable compile-time string manipulation, opening up new possibilities for type-safe APIs." - TypeScript Team</p>
</blockquote>

<pre><code>type EventName<T extends string> = `on${Capitalize<T>}`
type CSSProperty<T extends string> = `--${T}`

// Usage
type ClickHandler = EventName<"click">     // "onClick"
type ColorProperty = CSSProperty<"primary"> // "--primary"</code></pre>

<h2>Advanced Function Types</h2>
<p>Create flexible and type-safe function signatures:</p>

<h3>Function Overloads</h3>
<pre><code>function createElement(tag: "div"): HTMLDivElement
function createElement(tag: "span"): HTMLSpanElement
function createElement(tag: "button"): HTMLButtonElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}</code></pre>

<h3>Higher-Order Function Types</h3>
<pre><code>type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>
type Middleware<T> = (value: T) => T | Promise<T>

function compose<T>(...middlewares: Middleware<T>[]): Middleware<T> {
  return async (value: T) => {
    let result = value
    for (const middleware of middlewares) {
      result = await middleware(result)
    }
    return result
  }
}</code></pre>

<h2>Utility Types and Type Guards</h2>
<p>Leverage TypeScript''s built-in utilities and create custom type guards:</p>

<h3>Custom Type Guards</h3>
<pre><code>interface User {
  id: string
  name: string
  email: string
}

interface Admin extends User {
  permissions: string[]
}

function isAdmin(user: User | Admin): user is Admin {
  return ''permissions'' in user
}

// Usage
function handleUser(user: User | Admin) {
  if (isAdmin(user)) {
    // TypeScript knows user is Admin here
    console.log(user.permissions)
  }
}</code></pre>

<h2>Module Augmentation</h2>
<p>Extend existing types from third-party libraries:</p>

<pre><code>// Extending Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: User
      sessionId: string
    }
  }
}

// Now available on all Express requests
app.use((req, res, next) => {
  req.sessionId = generateSessionId()
  next()
})</code></pre>

<h2>Performance Considerations</h2>
<p>Optimize TypeScript compilation and runtime performance:</p>

<h3>Compilation Optimization</h3>
<ul>
<li><strong>Use project references</strong> for large codebases</li>
<li><strong>Enable incremental compilation</strong> with <code>--incremental</code></li>
<li><strong>Optimize imports</strong> with <code>--importsNotUsedAsValues</code></li>
<li><strong>Use type-only imports</strong> when possible</li>
</ul>

<h3>Runtime Performance</h3>
<pre><code>// Type-only import (no runtime cost)
import type { User } from ''./types''

// Regular import
import { validateUser } from ''./utils''</code></pre>

<p>Mastering these advanced TypeScript patterns will help you build more robust, maintainable, and type-safe applications while leveraging the full power of the type system.</p>',
  'Deep dive into TypeScript''s advanced features including conditional types, template literals, and sophisticated type patterns.',
  'typescript-advanced-patterns-best-practices',
  '/typescript-advanced-patterns.png',
  'published',
  false,
  ARRAY['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
  2341,
  98,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Web Performance Optimization in 2024',
  '<h2>The State of Web Performance</h2>
<p>Web performance has never been more critical. With users expecting instant loading times and search engines prioritizing fast sites, optimization techniques have evolved significantly in 2024.</p>

<h2>Core Web Vitals: The New Standards</h2>
<p>Google''s Core Web Vitals continue to be the benchmark for web performance:</p>

<h3>Largest Contentful Paint (LCP)</h3>
<ul>
<li><strong>Target:</strong> Under 2.5 seconds</li>
<li><strong>Optimization:</strong> Optimize images, use CDN, preload critical resources</li>
<li><strong>Measurement:</strong> Focus on above-the-fold content</li>
</ul>

<h3>First Input Delay (FID) / Interaction to Next Paint (INP)</h3>
<p>INP is replacing FID as the primary interactivity metric:</p>
<pre><code>// Optimize long tasks
function optimizeTask(callback) {
  if (''scheduler'' in window && ''postTask'' in scheduler) {
    scheduler.postTask(callback, { priority: ''user-blocking'' })
  } else {
    setTimeout(callback, 0)
  }
}</code></pre>

<h3>Cumulative Layout Shift (CLS)</h3>
<p>Prevent layout shifts with proper sizing:</p>
<pre><code>/* Reserve space for images */
.image-container {
  aspect-ratio: 16 / 9;
  background: #f0f0f0;
}

/* Use CSS containment */
.component {
  contain: layout style paint;
}</code></pre>

<h2>Modern Loading Strategies</h2>
<p>2024 brings new approaches to resource loading:</p>

<blockquote>
<p>"The key to modern web performance is loading the right resources at the right time for the right user." - Performance Expert</p>
</blockquote>

<h3>Selective Hydration</h3>
<p>Hydrate components only when needed:</p>
<pre><code>import { lazy, Suspense } from ''react''

const HeavyComponent = lazy(() => 
  import(''./HeavyComponent'').then(module => ({
    default: module.HeavyComponent
  }))
)

function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyComponent />
    </Suspense>
  )
}</code></pre>

<h3>Progressive Enhancement</h3>
<p>Build experiences that work without JavaScript:</p>
<ul>
<li><strong>Server-side rendering</strong> for initial content</li>
<li><strong>CSS-only interactions</strong> for basic functionality</li>
<li><strong>JavaScript enhancement</strong> for advanced features</li>
</ul>

<h2>Image Optimization Techniques</h2>
<p>Images often account for the majority of page weight:</p>

<h3>Next-Gen Formats</h3>
<pre><code><picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture></code></pre>

<h3>Responsive Images</h3>
<pre><code><img 
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Responsive image"
  loading="lazy"
></code></pre>

<h2>JavaScript Optimization</h2>
<p>Modern JavaScript optimization goes beyond minification:</p>

<h3>Code Splitting Strategies</h3>
<ol>
<li><strong>Route-based splitting</strong> - Split by page/route</li>
<li><strong>Component-based splitting</strong> - Split heavy components</li>
<li><strong>Feature-based splitting</strong> - Split by user interaction</li>
</ol>

<h3>Tree Shaking and Dead Code Elimination</h3>
<pre><code>// Use named imports for better tree shaking
import { debounce } from ''lodash-es''

// Avoid default imports from large libraries
// import _ from ''lodash'' // ❌ Imports entire library
import debounce from ''lodash/debounce'' // ✅ Imports only needed function</code></pre>

<h2>Caching Strategies</h2>
<p>Implement sophisticated caching for optimal performance:</p>

<h3>Service Worker Caching</h3>
<pre><code>// Cache-first strategy for static assets
self.addEventListener(''fetch'', event => {
  if (event.request.destination === ''image'') {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    )
  }
})</code></pre>

<h3>HTTP/2 and HTTP/3 Optimization</h3>
<ul>
<li><strong>Server Push</strong> for critical resources</li>
<li><strong>Multiplexing</strong> to reduce connection overhead</li>
<li><strong>Header compression</strong> with HPACK</li>
</ul>

<h2>Performance Monitoring</h2>
<p>Continuous monitoring is essential for maintaining performance:</p>

<h3>Real User Monitoring (RUM)</h3>
<pre><code>// Track Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from ''web-vitals''

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)</code></pre>

<p>Web performance optimization in 2024 requires a holistic approach combining modern loading strategies, advanced caching techniques, and continuous monitoring to deliver exceptional user experiences.</p>',
  'Comprehensive guide to web performance optimization techniques and best practices for 2024.',
  'web-performance-optimization-2024',
  '/placeholder.svg?height=400&width=800',
  'published',
  false,
  ARRAY['Performance', 'Web Development', 'Optimization', 'Core Web Vitals'],
  1876,
  84,
  (SELECT id FROM auth.users LIMIT 1)
);

-- Update the views and likes for more realistic testing data
UPDATE public.blog_posts SET 
  views = FLOOR(RANDOM() * 3000 + 500),
  likes = FLOOR(RANDOM() * 200 + 20),
  updated_at = NOW() - (RANDOM() * INTERVAL '30 days')
WHERE status = 'published';
