import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const rateLimits = /* @__PURE__ */ new Map();
const LIMIT = 3;
const WINDOW_MS = 30 * 60 * 1e3;
async function POST({ request }) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const now = Date.now();
    const limitInfo = rateLimits.get(ip) || { count: 0, lastReset: now };
    if (now - limitInfo.lastReset > WINDOW_MS) {
      limitInfo.count = 0;
      limitInfo.lastReset = now;
    }
    if (limitInfo.count >= LIMIT) {
      return new Response(
        JSON.stringify({ message: "Too many requests. Please try again later." }),
        { status: 429 }
      );
    }
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const city = data.get("city")?.toString();
    const phone = data.get("phone")?.toString();
    const honeypot = data.get("address")?.toString();
    if (honeypot) {
      return new Response(
        JSON.stringify({ message: "Automated submission detected." }),
        { status: 400 }
      );
    }
    if (!name || !city || !phone) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }
    limitInfo.count++;
    rateLimits.set(ip, limitInfo);
    const emailUser = "yogeshreo@gmail.com";
    const emailPass = "ajpd rqwg bzoz ymmj";
    if (!emailUser || !emailPass) ;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      // Use SSL
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s+/g, "")
        // Remove spaces if present
      }
    });
    const mailOptions = {
      from: emailUser,
      to: "yogeshreo@gmail.com",
      subject: `New Franchise Inquiry: ${name} from ${city}`,
      text: `
        New Franchise Inquiry
        ---------------------
        Name: ${name}
        City: ${city}
        Phone: ${phone}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c5a059;">New Franchise Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">Sent from Vantha Vettuvom Franchise Portal</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Form submitted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error: error.message || "Unknown error"
      }),
      { status: 500 }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
