import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


interface RequestBody {
  email?: string;
  phone?: string;
}

interface SupabaseError extends Error {
  code?: string;
  details?: string;
  hint?: string;
}

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  try {
    const { email, phone }: RequestBody = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Please provide your email" },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Please provide your phone number" },
        { status: 400 }
      );
    }


    // Step 1: Insert into database first
    const { data, error } = await supabase.from("email_signup").insert([
      {
        email: email || null,
        phone_number: phone || null,
      },
    ]).select();

    if (error) {
      const supabaseError = error as SupabaseError;
      
      if (supabaseError.code === '23505') {
        return NextResponse.json(
          { success: false, message: "You're already on our waiting list!" },
          { status: 409 }
        );
      }
      
      throw error;
    }


    return NextResponse.json({
      success: true,
      message: " Thank You For Registering with Wlve, we can't wait to unveil drop 001",
      user: data?.[0],
    }, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    
    let errorMessage = "Failed to add you to the waiting list";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}