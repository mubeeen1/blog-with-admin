import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServerClient()

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

    // Get all admin users
    const { data: users, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching admin users:", error)
      return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error("Error in admin users GET:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const supabase = createServerClient()

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

    const { email, password, username, role = "admin" } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ success: false, error: "Email, password, and username are required" }, { status: 400 })
    }

    // Create auth user
    const { data: authData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (createError) {
      console.error("Error creating auth user:", createError)
      return NextResponse.json({ success: false, error: createError.message }, { status: 400 })
    }

    // Create admin user record
    const { data: newAdminUser, error: adminCreateError } = await supabase
      .from("admin_users")
      .insert({
        id: authData.user.id,
        username,
        role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (adminCreateError) {
      console.error("Error creating admin user record:", adminCreateError)
      // Try to clean up the auth user if admin record creation failed
      await supabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ success: false, error: "Failed to create admin user record" }, { status: 500 })
    }

    return NextResponse.json({ success: true, user: newAdminUser })
  } catch (error) {
    console.error("Error in admin users POST:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
