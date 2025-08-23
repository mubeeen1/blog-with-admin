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
);
