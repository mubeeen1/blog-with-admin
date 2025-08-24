import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose/client"
import { CustomFont, AdminUser } from "@/lib/mongoose/models"

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    // TODO: Implement proper authentication
    // For now, we'll use a placeholder for admin user ID
    // You'll need to integrate with your authentication system
    const adminUserId = "placeholder-admin-id" // Replace with actual auth user ID

    // Check if user is admin
    const adminUser = await AdminUser.findOne({ auth_user_id: adminUserId })
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required", success: false }, { status: 403 })
    }

    // Find and delete the font
    const font = await CustomFont.findByIdAndDelete(id)

    if (!font) {
      return NextResponse.json({ error: "Font not found", success: false }, { status: 404 })
    }

    // TODO: Implement file deletion from your storage solution
    // If you're using a storage service like AWS S3, Cloudinary, etc.
    // you would delete the file here

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting font:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
