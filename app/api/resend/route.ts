import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "WLVE Brand <no-reply@wlveee.com>",
      to: email,
      subject: "Thank you for entering the WLVE world!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WLVE Presale Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: black; font-family: Arial, sans-serif;">

    <!-- Preheader: shows in inbox preview, hidden in email body -->
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
        You're in. The WLVE drop is coming — stay close.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: black;">
        <tr>
            <td align="center" style="padding: 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%;">
                    
                    <!-- Image 1 -->
                    <tr>
                        <td>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <img src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_4313_2.jpg?v=1779537679" alt="Thank You for entering the WLVE world." width="560" style="display: block; max-width: 100%; height: auto; border: 0;">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Image 2 -->
                    <tr>
                        <td align="center">
                            <img src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_4313.jpg?v=1779537679" alt="Thank You for entering the WLVE world." width="560" style="display: block; max-width: 100%; height: auto; border: 0;">
                        </td>
                    </tr>

                    <!-- Visible text content (improves text-to-image ratio) -->
                    <tr>
                        <td align="center" style="padding: 24px 20px; color: #ffffff; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
                            You're on the list. We'll reach out before the drop.<br>
                            <a href="https://wlveee.com" style="color: #ffffff; text-decoration: underline;">wlveee.com</a>
                        </td>
                    </tr>

                    <!-- Unsubscribe (required by CAN-SPAM — skipping this is also a spam trigger) -->
                    <tr>
                        <td align="center" style="padding: 0 20px 24px; color: #555555; font-family: Arial, sans-serif; font-size: 11px;">
                            You're receiving this because you signed up at wlveee.com.<br>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
