import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose/client"
import { BlogPost, CustomFont, AdminUser } from "@/lib/mongoose/models"

export async function GET() {
  try {
    await connectDB()

    // TODO: Implement proper authentication
    // For now, we'll use a placeholder for admin user ID
    // You'll need to integrate with your authentication system
    const adminUserId = "placeholder-admin-id" // Replace with actual auth user ID

    // Check if user is admin
    const adminUser = await AdminUser.findOne({ auth_user_id: adminUserId })
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required", success: false }, { status: 403 })
    }

    // Get statistics using MongoDB aggregation
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalFonts,
      viewsData,
      likesData
    ] = await Promise.all([
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: "published" }),
      BlogPost.countDocuments({ status: "draft" }),
      CustomFont.countDocuments(),
      BlogPost.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }]),
      BlogPost.aggregate([{ $group: { _id: null, totalLikes: { $sum: "$likes" } } }])
    ])

    const totalViews = viewsData[0]?.totalViews || 0
    const totalLikes = likesData[0]?.totalLikes || 0

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
