import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose/client"
import { CustomFont, AdminUser } from "@/lib/mongoose/models"

export async function GET() {
  try {
    await connectDB()

    const fonts = await CustomFont.find()
      .sort({ created_at: -1 })
      .populate('uploaded_by', 'username')
      .lean()

    return NextResponse.json({ fonts, success: true })
  } catch (error) {
    console.error("Error fetching fonts:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
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
      return NextResponse.json({ error: "Admin access required", success: false }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get("font")
    const name = formData.get("name")
    const fontFamily = formData.get("fontFamily")

    if (!file || !name || !fontFamily) {
      return NextResponse.json({ error: "Missing required fields", success: false }, { status: 400 })
    }

    // TODO: Implement file upload to your preferred storage solution
    // For now, we'll store the file data as base64 or use a placeholder
    // You might want to use AWS S3, Cloudinary, or another storage service
    const fileBuffer = await file.arrayBuffer()
    const base64File = Buffer.from(fileBuffer).toString('base64')

    // Save font metadata to database
    const font = new CustomFont({
      name,
      font_family: fontFamily,
      file_url: `data:${file.type};base64,${base64File}`, // Temporary base64 storage
      file_size: file.size,
      font_format: file.type,
      uploaded_by: adminUser._id // Use the MongoDB ObjectId
    })

    const savedFont = await font.save()
    await savedFont.populate('uploaded_by', 'username')

    return NextResponse.json({ font: savedFont, success: true }, { status: 201 })
  } catch (error) {
    console.error("Error uploading font:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
