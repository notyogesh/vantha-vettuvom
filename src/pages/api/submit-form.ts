import type { APIRoute } from 'astro';

export const prerender = false;

// Rate limiting state (in-memory, best-effort for serverless)
const rateLimits = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 3;
const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

export const POST: APIRoute = async ({ request }) => {
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
        JSON.stringify({ message: 'Too many requests. Please try again after some time.' }),
        { status: 429 }
      );
    }

    const data = await request.formData();
    const name = data.get('name');
    const city = data.get('city');
    const phone = data.get('phone');
    const honeypot = data.get('address');

    // Honeypot check
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

    // Dynamic import to prevent cold start crashes if dependencies fail
    const nm = (await import('nodemailer')) as any;
    const createTransport = nm.createTransport || nm.default?.createTransport;

    if (!createTransport) {
        throw new Error("Nodemailer transport creator not found");
    }

    // Create a transporter
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.EMAIL_USER, // User needs to set this in .env
        pass: import.meta.env.EMAIL_PASS, // User needs to set this in .env
      },
    });

    const mailOptions = {
      from: import.meta.env.EMAIL_USER,
      to: 'yogeshreo@gmail.com',
      subject: `New Franchise Inquiry: ${name} from ${city}`,
      text: `
        New Franchise Inquiry
        ---------------------
        Name: ${name}
        City: ${city}
        Phone: ${phone}
      `,
      html: `
        <h3>New Franchise Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Form submitted successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ message: 'Error sending email', error: (error as Error).message }),
      { status: 500 }
    );
  }
};
