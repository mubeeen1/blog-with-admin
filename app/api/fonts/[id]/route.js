import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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

    // Get font data first to delete file from storage
    const { data: font, error: fetchError } = await supabase.from("custom_fonts").select("*").eq("id", id).single()

    if (fetchError) throw fetchError

    // Delete file from storage
    const fileName = font.file_url.split("/").pop()
    const { error: storageError } = await supabase.storage.from("fonts").remove([fileName])

    if (storageError) {
      console.error("Error deleting font file:", storageError)
    }

    // Delete font record from database
    const { error: deleteError } = await supabase.from("custom_fonts").delete().eq("id", id)

    if (deleteError) throw deleteError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting font:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
