import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const supabase = await createClient()
    const { id } = await params

    const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

    if (error) throw error

    // Increment view count
    await supabase
      .from("blog_posts")
      .update({ views: post.views + 1 })
      .eq("id", id)

    return NextResponse.json({ post: { ...post, views: post.views + 1 }, success: true })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const supabase = await createClient()
    const { id } = await params

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

    const { data: post, error } = await supabase
      .from("blog_posts")
      .update({
        title,
        content,
        excerpt,
        slug,
        featured_image,
        status,
        featured,
        tags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ post, success: true })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const supabase = await createClient()
    const { id } = await params

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

    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
