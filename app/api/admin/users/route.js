import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose/client"
import { AdminUser } from "@/lib/mongoose/models"

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
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    // Get all admin users
    const users = await AdminUser.find()
      .sort({ created_at: -1 })
      .lean()

    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error("Error in admin users GET:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    // TODO: Implement proper authentication
    // For now, we'll use a placeholder for admin user ID
    // You'll need to integrate with your authentication system
    const adminUserId = "placeholder-admin-id" // Replace with actual auth user ID

    // Check if user is admin
    const adminUser = await AdminUser.findOne({ auth_user_id: adminUserId })
    if (!adminUser) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    const { username, role = "admin", auth_user_id } = await request.json()

    if (!username || !auth_user_id) {
      return NextResponse.json({ success: false, error: "Username and auth_user_id are required" }, { status: 400 })
    }

    // Check if username already exists
    const existingUser = await AdminUser.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Username already exists" }, { status: 400 })
    }

    // Check if auth_user_id already exists
    const existingAuthUser = await AdminUser.findOne({ auth_user_id })
    if (existingAuthUser) {
      return NextResponse.json({ success: false, error: "Auth user already has admin privileges" }, { status: 400 })
    }

    // Create admin user record
    const newAdminUser = new AdminUser({
      username,
      role,
      auth_user_id
    })

    const savedUser = await newAdminUser.save()

    return NextResponse.json({ success: true, user: savedUser })
  } catch (error) {
    console.error("Error in admin users POST:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
