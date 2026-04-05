import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

// Rate limiting state (in-memory, best-effort for serverless)
const rateLimits = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 3;
const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

export async function POST({ request }: { request: Request }) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const now = Date.now();
    
    // Check Rate Limit
    const limitInfo = rateLimits.get(ip) || { count: 0, lastReset: now };
    if (now - limitInfo.lastReset > WINDOW_MS) {
      limitInfo.count = 0;
      limitInfo.lastReset = now;
    }
    
    if (limitInfo.count >= LIMIT) {
      return new Response(
        JSON.stringify({ message: 'Too many requests. Please try again later.' }),
        { status: 429 }
      );
    }

    const data = await request.formData();
    const name = data.get('name')?.toString();
    const city = data.get('city')?.toString();
    const phone = data.get('phone')?.toString();
    const message = data.get('message')?.toString() || 'No additional message provided';
    const honeypot = data.get('address')?.toString();

    // Honeypot check for bots
    if (honeypot) {
      return new Response(
        JSON.stringify({ message: 'Automated submission detected.' }),
        { status: 400 }
      );
    }

    if (!name || !city || !phone) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }
    
    // Increment rate limit count
    limitInfo.count++;
    rateLimits.set(ip, limitInfo);

    const emailUser = import.meta.env.EMAIL_USER;
    const emailPass = import.meta.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        throw new Error("SMTP credentials not configured in environment variables.");
    }

    // Create a transporter with more robust production settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s+/g, ''), // Remove spaces if present
      },
    });

    const mailOptions = {
      from: emailUser,
      to: 'yogeshreo@gmail.com',
      subject: `New Franchise Inquiry: ${name} from ${city}`,
      text: `
        New Franchise Inquiry
        ---------------------
        Name: ${name}
        City: ${city}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c5a059;">New Franchise Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #c5a059; margin-top: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">Sent from Vantha Vettuvom Franchise Portal</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Save to Google Sheets automatically
    const scriptUrl = import.meta.env.GOOGLE_APPS_SCRIPT_URL;
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, city, phone, message }),
        });
      } catch (err) {
        // Log error but don't fail the user submission since the email was successful
        console.error("Google Sheets sync error:", err);
      }
    }

    return new Response(
      JSON.stringify({ message: 'Form submitted successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ 
        message: 'Error processing request'
      }),
      { status: 500 }
    );
  }
};
