import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name");
    const city = data.get("city");
    const phone = data.get("phone");
    if (!name || !city || !phone) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yogeshreo@gmail.com",
        // User needs to set this in .env
        pass: "ajpd rqwg bzoz ymmj"
        // User needs to set this in .env
      }
    });
    const mailOptions = {
      from: "yogeshreo@gmail.com",
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
        <h3>New Franchise Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
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
      JSON.stringify({ message: "Error sending email", error: error.message }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
