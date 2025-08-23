import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
  try {
    const supabase = createServerClient()
    const { id } = params

    // Check if user is authenticated and is admin
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    // Prevent self-deletion
    if (id === user.id) {
      return NextResponse.json({ success: false, error: "Cannot delete your own admin account" }, { status: 400 })
    }

    // Delete admin user record
    const { error: deleteAdminError } = await supabase.from("admin_users").delete().eq("id", id)

    if (deleteAdminError) {
      console.error("Error deleting admin user record:", deleteAdminError)
      return NextResponse.json({ success: false, error: "Failed to delete admin user record" }, { status: 500 })
    }

    // Delete auth user
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(id)

    if (deleteAuthError) {
      console.error("Error deleting auth user:", deleteAuthError)
      // Note: Admin record is already deleted, but auth user deletion failed
      return NextResponse.json({ success: false, error: "Failed to delete auth user" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in admin users DELETE:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
