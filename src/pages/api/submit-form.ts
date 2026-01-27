
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const city = data.get('city');
    const phone = data.get('phone');

    if (!name || !city || !phone) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

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
