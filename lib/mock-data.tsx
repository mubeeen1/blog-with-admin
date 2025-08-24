// Mock data structure for blog posts
export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  readTime: string
  tags: string[]
  image: string
  featured: boolean
  published: boolean
}

export interface CustomFont {
  id: string
  name: string
  family: string
  style: "normal" | "italic"
  weight: number
  format: "woff2" | "woff" | "ttf" | "otf"
  url: string
  size: number
  uploadDate: string
  isActive: boolean
  appliedTo: string[]
}

// Mock authentication state
export interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    username: string
    role: "admin" | "user"
  } | null
}

// Mock blog posts database
export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: AI-Powered Coding",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is transforming every aspect of software development...</p>
      <h2>AI Code Generation</h2>
      <p>Modern AI tools can now generate entire functions and components...</p>
    `,
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we write and maintain code.",
    author: "Tech Admin",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Web Dev", "Future Tech"],
    image: "/futuristic-ai-coding-interface.png",
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "Building Scalable 3D Web Experiences",
    content: `
      <h2>Getting Started with WebGL</h2>
      <p>WebGL provides the foundation for 3D graphics on the web...</p>
      <h2>Performance Optimization</h2>
      <p>Optimizing 3D content for web delivery requires careful consideration...</p>
    `,
    excerpt: "A deep dive into creating immersive 3D interfaces that perform well across all devices.",
    author: "Tech Admin",
    date: "2024-01-12",
    readTime: "12 min read",
    tags: ["3D", "WebGL", "Performance"],
    image: "/geometric-web-interface.png",
    featured: true,
    published: true,
  },
  {
    id: 3,
    title: "Next.js 15: What's New and Why It Matters",
    content: `
      <h2>New Features Overview</h2>
      <p>Next.js 15 brings several exciting improvements...</p>
    `,
    excerpt: "Breaking down the latest features and improvements in the newest Next.js release.",
    author: "Tech Admin",
    date: "2024-01-10",
    readTime: "6 min read",
    tags: ["Next.js", "React", "Framework"],
    image: "/nextjs-tech-background.png",
    featured: false,
    published: false,
  },
]

export const postUtils = {
  createPost: (postData: Omit<BlogPost, "id">) => {
    const newId = Math.max(...mockPosts.map((p) => p.id)) + 1
    return { ...postData, id: newId }
  },

  updatePost: (id: number, updates: Partial<BlogPost>) => {
    const index = mockPosts.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], ...updates }
      return mockPosts[index]
    }
    return null
  },

  deletePost: (id: number) => {
    const index = mockPosts.findIndex((p) => p.id === id)
    if (index !== -1) {
      return mockPosts.splice(index, 1)[0]
    }
    return null
  },
}

// Mock authentication functions
export const mockAuth = {
  login: async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return username === "admin" && password === "admin"
  },

  logout: async (): Promise<void> => {
    // Simulate logout
    await new Promise((resolve) => setTimeout(resolve, 500))
  },

  getCurrentUser: (): AuthState["user"] => {
    // Mock current user - in real app, this would check tokens/session
    return {
      id: "1",
      username: "admin",
      role: "admin",
    }
  },
}
