-- Adding comprehensive sample blog posts for testing
-- Insert sample blog posts (requires admin user to exist first)
-- These posts will be inserted with a placeholder author_id that should be updated to match actual admin user

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
  <p>Artificial Intelligence is transforming every aspect of software development, from code generation to automated testing and deployment. As we stand on the brink of a new era, developers must understand how AI tools are reshaping our industry.</p>
  
  <h2>AI-Powered Code Generation</h2>
  <p>Modern AI tools like GitHub Copilot, ChatGPT, and Claude can now generate entire functions, components, and even complete applications. These tools understand context, follow coding conventions, and can adapt to different programming languages and frameworks.</p>
  
  <blockquote>
  <p>"AI is not replacing developers; it''s amplifying their capabilities and allowing them to focus on higher-level problem-solving."</p>
  </blockquote>
  
  <h2>Automated Testing and Quality Assurance</h2>
  <p>AI-driven testing tools can automatically generate test cases, identify edge cases that human testers might miss, and even predict potential bugs before they occur. This leads to more robust applications and faster development cycles.</p>
  
  <h2>The Future Landscape</h2>
  <p>As AI continues to evolve, we can expect to see more sophisticated tools that can understand business requirements and translate them directly into working code. The role of developers will shift towards being AI orchestrators and system architects.</p>
  
  <h2>Getting Started</h2>
  <p>To prepare for this AI-driven future, developers should:</p>
  <ul>
  <li>Experiment with AI coding assistants</li>
  <li>Learn to write better prompts and context</li>
  <li>Focus on system design and architecture skills</li>
  <li>Stay updated with the latest AI development tools</li>
  </ul>',
  'Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications, from code generation to automated testing.',
  'future-ai-web-development',
  '/futuristic-ai-coding-interface.png',
  'published',
  true,
  ARRAY['AI', 'Web Development', 'Future Tech', 'Automation'],
  1247,
  89,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Next.js 15: What''s New and Exciting',
  '<h2>Revolutionary Changes in Next.js 15</h2>
  <p>Next.js 15 introduces groundbreaking features that make React development more efficient and enjoyable. From improved performance to better developer experience, this release sets new standards for modern web frameworks.</p>
  
  <h2>Enhanced App Router</h2>
  <p>The App Router has been significantly improved with better caching strategies, enhanced streaming capabilities, and more intuitive routing patterns. Developers can now build more complex applications with less boilerplate code.</p>
  
  <pre><code>// New routing patterns in Next.js 15
  export default function Page({ params, searchParams }) {
    return (
      &lt;div&gt;
        &lt;h1&gt;Enhanced routing with {params.slug}&lt;/h1&gt;
      &lt;/div&gt;
    )
  }</code></pre>
  
  <h2>Improved Performance</h2>
  <p>Next.js 15 delivers up to 40% faster build times and 25% smaller bundle sizes through advanced optimization techniques and better tree-shaking algorithms.</p>
  
  <h2>New Developer Tools</h2>
  <p>The development experience has been enhanced with:</p>
  <ul>
  <li>Better error messages and debugging tools</li>
  <li>Improved hot reload performance</li>
  <li>Enhanced TypeScript integration</li>
  <li>New CLI commands for project management</li>
  </ul>
  
  <h2>Migration Guide</h2>
  <p>Upgrading to Next.js 15 is straightforward for most projects. The framework maintains backward compatibility while providing clear migration paths for deprecated features.</p>',
  'A comprehensive look at the latest features and improvements in Next.js 15 that every developer should know about.',
  'nextjs-15-whats-new-exciting',
  '/nextjs-tech-background.png',
  'published',
  true,
  ARRAY['Next.js', 'React', 'JavaScript', 'Framework'],
  892,
  67,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Building Scalable APIs with Edge Computing',
  '<h2>The Edge Computing Revolution</h2>
  <p>Edge computing is transforming how we build and deploy APIs, bringing computation closer to users and reducing latency significantly. This paradigm shift is particularly important for modern applications that require real-time responsiveness.</p>
  
  <h2>What is Edge Computing?</h2>
  <p>Edge computing involves processing data at or near the source of data generation, rather than relying on centralized cloud servers. This approach reduces latency, improves performance, and enhances user experience.</p>
  
  <h2>Benefits for API Development</h2>
  <p>Edge computing offers several advantages for API development:</p>
  <ul>
  <li><strong>Reduced Latency:</strong> APIs respond faster when processing happens closer to users</li>
  <li><strong>Better Scalability:</strong> Distributed processing handles traffic spikes more effectively</li>
  <li><strong>Improved Reliability:</strong> Redundancy across edge nodes increases uptime</li>
  <li><strong>Cost Efficiency:</strong> Optimized resource usage reduces operational costs</li>
  </ul>
  
  <h2>Implementation Strategies</h2>
  <p>When building edge APIs, consider these key strategies:</p>
  
  <h3>1. Stateless Design</h3>
  <p>Design your APIs to be stateless, allowing them to run efficiently across multiple edge locations without dependency on specific server instances.</p>
  
  <h3>2. Caching Strategies</h3>
  <p>Implement intelligent caching at the edge to serve frequently requested data without hitting origin servers.</p>
  
  <h3>3. Data Synchronization</h3>
  <p>Develop robust data synchronization mechanisms to ensure consistency across distributed edge nodes.</p>
  
  <h2>Popular Edge Platforms</h2>
  <p>Several platforms make edge API deployment accessible:</p>
  <ul>
  <li>Vercel Edge Functions</li>
  <li>Cloudflare Workers</li>
  <li>AWS Lambda@Edge</li>
  <li>Deno Deploy</li>
  </ul>
  
  <h2>Real-World Example</h2>
  <pre><code>// Edge API function example
  export default async function handler(request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get(''userId'')
    
    // Process at the edge for minimal latency
    const userData = await fetchUserData(userId)
    
    return new Response(JSON.stringify(userData), {
      headers: { ''Content-Type'': ''application/json'' }
    })
  }</code></pre>
  
  <h2>Future Outlook</h2>
  <p>As edge computing continues to mature, we can expect even more sophisticated tools and platforms that make distributed API development as simple as traditional server-based approaches.</p>',
  'Learn how edge computing is transforming API development and deployment strategies for modern applications.',
  'building-scalable-apis-edge-computing',
  '/edge-computing-network.png',
  'published',
  false,
  ARRAY['Edge Computing', 'APIs', 'Performance', 'Scalability'],
  634,
  45,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Advanced TypeScript Patterns for React Developers',
  '<h2>Mastering TypeScript in React</h2>
  <p>TypeScript has become an essential tool for React developers, providing type safety and better development experience. This guide explores advanced patterns that can elevate your React TypeScript skills.</p>
  
  <h2>Generic Components</h2>
  <p>Create reusable components with generic types:</p>
  
  <pre><code>interface ListProps&lt;T&gt; {
    items: T[]
    renderItem: (item: T) =&gt; React.ReactNode
    keyExtractor: (item: T) =&gt; string
  }
  
  function List&lt;T&gt;({ items, renderItem, keyExtractor }: ListProps&lt;T&gt;) {
    return (
      &lt;ul&gt;
        {items.map(item =&gt; (
          &lt;li key={keyExtractor(item)}&gt;
            {renderItem(item)}
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;
    )
  }</code></pre>
  
  <h2>Conditional Types</h2>
  <p>Use conditional types to create flexible component APIs that adapt based on props.</p>
  
  <h2>Utility Types</h2>
  <p>Leverage TypeScript''s built-in utility types like Pick, Omit, and Partial to create more maintainable component interfaces.</p>
  
  <h2>Best Practices</h2>
  <ul>
  <li>Use strict TypeScript configuration</li>
  <li>Prefer interfaces over types for component props</li>
  <li>Implement proper error boundaries with TypeScript</li>
  <li>Use discriminated unions for complex state management</li>
  </ul>',
  'Explore advanced TypeScript patterns and techniques that will make your React applications more robust and maintainable.',
  'advanced-typescript-patterns-react',
  '/typescript-advanced-patterns.png',
  'published',
  false,
  ARRAY['TypeScript', 'React', 'Advanced', 'Patterns'],
  423,
  32,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'The Art of 3D Web Design: Creating Immersive Experiences',
  '<h2>Introduction to 3D Web Design</h2>
  <p>Three-dimensional design on the web has evolved from a novelty to a powerful tool for creating engaging user experiences. With modern browsers supporting WebGL and libraries like Three.js, developers can now create stunning 3D interfaces.</p>
  
  <h2>Getting Started with Three.js</h2>
  <p>Three.js is the most popular library for 3D web development. It provides a high-level API that makes WebGL accessible to developers without deep graphics programming knowledge.</p>
  
  <pre><code>import * as THREE from ''three''
  
  // Create scene, camera, and renderer
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()
  
  // Add a rotating cube
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)</code></pre>
  
  <h2>Performance Considerations</h2>
  <p>3D web applications require careful optimization:</p>
  <ul>
  <li>Optimize geometry and textures</li>
  <li>Use level-of-detail (LOD) techniques</li>
  <li>Implement frustum culling</li>
  <li>Consider mobile device limitations</li>
  </ul>
  
  <h2>Design Principles</h2>
  <p>Effective 3D web design follows these principles:</p>
  <ul>
  <li>Purpose-driven 3D elements</li>
  <li>Intuitive navigation and controls</li>
  <li>Accessibility considerations</li>
  <li>Progressive enhancement</li>
  </ul>
  
  <h2>Real-World Applications</h2>
  <p>3D web design is being used in various industries:</p>
  <ul>
  <li>E-commerce product visualization</li>
  <li>Educational interactive content</li>
  <li>Architectural walkthroughs</li>
  <li>Gaming and entertainment</li>
  </ul>',
  'Discover how to create stunning 3D web experiences that engage users while maintaining performance and accessibility.',
  'art-3d-web-design-immersive-experiences',
  '/geometric-web-interface.png',
  'draft',
  false,
  ARRAY['3D Design', 'Three.js', 'WebGL', 'UX'],
  156,
  12,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Mastering React Server Components',
  '<h2>Understanding React Server Components</h2>
  <p>React Server Components represent a paradigm shift in how we think about React applications. They allow us to render components on the server, reducing bundle size and improving performance.</p>
  
  <h2>Key Benefits</h2>
  <ul>
  <li>Zero bundle size impact</li>
  <li>Direct access to backend resources</li>
  <li>Improved SEO and initial page load</li>
  <li>Better security for sensitive operations</li>
  </ul>
  
  <h2>Implementation Example</h2>
  <pre><code>// Server Component
  async function BlogPost({ id }) {
    const post = await db.posts.findById(id)
    
    return (
      &lt;article&gt;
        &lt;h1&gt;{post.title}&lt;/h1&gt;
        &lt;p&gt;{post.content}&lt;/p&gt;
      &lt;/article&gt;
    )
  }</code></pre>
  
  <h2>Best Practices</h2>
  <p>When working with Server Components, remember to keep client-side interactivity separate and use the "use client" directive appropriately.</p>',
  'Deep dive into React Server Components and how they''re changing the landscape of React development.',
  'mastering-react-server-components',
  '/react-server-components.png',
  'published',
  true,
  ARRAY['React', 'Server Components', 'Performance', 'Next.js'],
  756,
  54,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'CSS Grid vs Flexbox: When to Use Which',
  '<h2>The Layout Battle: Grid vs Flexbox</h2>
  <p>CSS Grid and Flexbox are both powerful layout systems, but they excel in different scenarios. Understanding when to use each can dramatically improve your CSS architecture.</p>
  
  <h2>Flexbox: One-Dimensional Layouts</h2>
  <p>Flexbox is perfect for one-dimensional layouts - either rows or columns:</p>
  
  <pre><code>.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }</code></pre>
  
  <h2>CSS Grid: Two-Dimensional Layouts</h2>
  <p>Grid excels at two-dimensional layouts with complex positioning:</p>
  
  <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }</code></pre>
  
  <h2>Decision Framework</h2>
  <ul>
  <li><strong>Use Flexbox for:</strong> Navigation bars, button groups, centering content</li>
  <li><strong>Use Grid for:</strong> Page layouts, card grids, complex positioning</li>
  </ul>
  
  <h2>Combining Both</h2>
  <p>The most powerful approach is using Grid and Flexbox together - Grid for overall layout structure and Flexbox for component-level alignment.</p>',
  'Learn the key differences between CSS Grid and Flexbox and master when to use each layout system.',
  'css-grid-vs-flexbox-when-to-use',
  '/css-layout-comparison.png',
  'published',
  false,
  ARRAY['CSS', 'Grid', 'Flexbox', 'Layout'],
  543,
  38,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Building Progressive Web Apps in 2024',
  '<h2>The Evolution of Progressive Web Apps</h2>
  <p>Progressive Web Apps (PWAs) have matured significantly, offering native-like experiences through web technologies. In 2024, PWAs are more capable and widely supported than ever before.</p>
  
  <h2>Core PWA Features</h2>
  <p>Modern PWAs provide:</p>
  <ul>
  <li>Offline functionality with service workers</li>
  <li>Push notifications</li>
  <li>App-like installation experience</li>
  <li>Background sync capabilities</li>
  <li>Access to device APIs</li>
  </ul>
  
  <h2>Service Worker Implementation</h2>
  <pre><code>// Register service worker
  if (''serviceWorker'' in navigator) {
    navigator.serviceWorker.register(''/sw.js'')
      .then(registration =&gt; {
        console.log(''SW registered:'', registration)
      })
      .catch(error =&gt; {
        console.log(''SW registration failed:'', error)
      })
  }</code></pre>
  
  <h2>Performance Benefits</h2>
  <p>PWAs offer significant performance advantages through caching strategies, lazy loading, and optimized resource delivery.</p>
  
  <h2>Browser Support</h2>
  <p>PWA features are now supported across all major browsers, making them a viable option for production applications.</p>',
  'Explore the latest developments in Progressive Web Apps and learn how to build app-like experiences for the web.',
  'building-progressive-web-apps-2024',
  '/pwa-mobile-experience.png',
  'published',
  false,
  ARRAY['PWA', 'Service Workers', 'Mobile', 'Performance'],
  687,
  49,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Database Optimization Strategies for Modern Web Apps',
  '<h2>Database Performance Fundamentals</h2>
  <p>Database optimization is crucial for scalable web applications. Poor database performance can bottleneck even the most well-architected applications.</p>
  
  <h2>Indexing Strategies</h2>
  <p>Proper indexing is the foundation of database performance:</p>
  
  <pre><code>-- Create composite index for common queries
  CREATE INDEX idx_posts_status_created 
  ON blog_posts(status, created_at DESC);
  
  -- Partial index for specific conditions
  CREATE INDEX idx_published_posts 
  ON blog_posts(created_at) 
  WHERE status = ''published'';</code></pre>
  
  <h2>Query Optimization</h2>
  <ul>
  <li>Use EXPLAIN to analyze query plans</li>
  <li>Avoid N+1 query problems</li>
  <li>Implement proper pagination</li>
  <li>Use database-specific optimizations</li>
  </ul>
  
  <h2>Caching Layers</h2>
  <p>Implement multiple caching layers:</p>
  <ul>
  <li>Application-level caching (Redis, Memcached)</li>
  <li>Database query result caching</li>
  <li>CDN for static content</li>
  <li>Browser caching strategies</li>
  </ul>
  
  <h2>Connection Pooling</h2>
  <p>Manage database connections efficiently to handle concurrent users without overwhelming the database server.</p>
  
  <h2>Monitoring and Alerting</h2>
  <p>Set up comprehensive monitoring to identify performance issues before they impact users.</p>',
  'Learn essential database optimization techniques to ensure your web applications scale efficiently.',
  'database-optimization-strategies-modern-web-apps',
  '/database-performance-chart.png',
  'published',
  false,
  ARRAY['Database', 'Performance', 'Optimization', 'Scaling'],
  432,
  29,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Micro-Frontends: Architecture for Large-Scale Applications',
  '<h2>Understanding Micro-Frontend Architecture</h2>
  <p>Micro-frontends extend the microservices concept to frontend development, allowing large applications to be built and maintained by independent teams.</p>
  
  <h2>Key Benefits</h2>
  <ul>
  <li>Independent deployments</li>
  <li>Technology diversity</li>
  <li>Team autonomy</li>
  <li>Incremental upgrades</li>
  <li>Fault isolation</li>
  </ul>
  
  <h2>Implementation Approaches</h2>
  
  <h3>1. Build-Time Integration</h3>
  <p>Combine micro-frontends during the build process using tools like Webpack Module Federation.</p>
  
  <h3>2. Runtime Integration</h3>
  <p>Load micro-frontends dynamically at runtime:</p>
  
  <pre><code>// Dynamic import of micro-frontend
  const loadMicroFrontend = async (name) =&gt; {
    const module = await import(`./micro-frontends/${name}`)
    return module.default
  }</code></pre>
  
  <h3>3. Server-Side Integration</h3>
  <p>Compose micro-frontends on the server before sending to the client.</p>
  
  <h2>Challenges and Solutions</h2>
  <ul>
  <li><strong>Shared Dependencies:</strong> Use module federation or shared libraries</li>
  <li><strong>Styling Conflicts:</strong> Implement CSS-in-JS or scoped styles</li>
  <li><strong>Communication:</strong> Use event buses or shared state management</li>
  <li><strong>Testing:</strong> Implement contract testing between micro-frontends</li>
  </ul>
  
  <h2>When to Use Micro-Frontends</h2>
  <p>Consider micro-frontends for large applications with multiple teams, complex domains, or when you need to gradually migrate from legacy systems.</p>',
  'Explore micro-frontend architecture patterns and learn how to build scalable applications with independent, deployable frontend modules.',
  'micro-frontends-architecture-large-scale-applications',
  '/micro-frontend-architecture.png',
  'draft',
  false,
  ARRAY['Architecture', 'Micro-Frontends', 'Scalability', 'Enterprise'],
  298,
  18,
  (SELECT id FROM auth.users LIMIT 1)
);
