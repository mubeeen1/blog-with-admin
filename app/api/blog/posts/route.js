import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "published"
    const featured = searchParams.get("featured")
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const offset = Number.parseInt(searchParams.get("offset")) || 0

    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    const { data: posts, error } = await query

    if (error) throw error

    return NextResponse.json({ posts, success: true })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated and is admin
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized", success: false }, { status: 401 })
    }

    // Check admin status
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: "Admin access required", success: false }, { status: 403 })
    }

    const body = await request.json()
    const { title, content, excerpt, slug, featured_image, status, featured, tags } = body

    // Create slug from title if not provided
    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert({
        title,
        content,
        excerpt,
        slug: finalSlug,
        featured_image,
        status: status || "draft",
        featured: featured || false,
        tags: tags || [],
        author_id: user.id,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ post, success: true }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
