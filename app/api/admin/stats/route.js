import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
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

    // Get statistics
    const [{ count: totalPosts }, { count: publishedPosts }, { count: draftPosts }, { count: totalFonts }] =
      await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("custom_fonts").select("*", { count: "exact", head: true }),
      ])

    // Get total views
    const { data: viewsData } = await supabase.from("blog_posts").select("views")
    const totalViews = viewsData?.reduce((sum, post) => sum + (post.views || 0), 0) || 0

    // Get total likes
    const { data: likesData } = await supabase.from("blog_posts").select("likes")
    const totalLikes = likesData?.reduce((sum, post) => sum + (post.likes || 0), 0) || 0

    const stats = {
      totalPosts: totalPosts || 0,
      publishedPosts: publishedPosts || 0,
      draftPosts: draftPosts || 0,
      totalViews,
      totalLikes,
      totalFonts: totalFonts || 0,
    }

    return NextResponse.json({ stats, success: true })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
