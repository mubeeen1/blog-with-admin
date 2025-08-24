import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: fonts, error } = await supabase
      .from("custom_fonts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ fonts, success: true })
  } catch (error) {
    console.error("Error fetching fonts:", error)
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

    const formData = await request.formData()
    const file = formData.get("font")
    const name = formData.get("name")
    const fontFamily = formData.get("fontFamily")

    if (!file || !name || !fontFamily) {
      return NextResponse.json({ error: "Missing required fields", success: false }, { status: 400 })
    }

    // Upload font file to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage.from("fonts").upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) throw uploadError

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("fonts").getPublicUrl(fileName)

    // Save font metadata to database
    const { data: font, error: dbError } = await supabase
      .from("custom_fonts")
      .insert({
        name,
        font_family: fontFamily,
        file_url: publicUrl,
        file_size: file.size,
        font_format: file.type,
        uploaded_by: user.id,
      })
      .select()
      .single()

    if (dbError) throw dbError

    return NextResponse.json({ font, success: true }, { status: 201 })
  } catch (error) {
    console.error("Error uploading font:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
