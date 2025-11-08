import ReceiptTemplate from '../../../../emails/ReceiptTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'JSHOP <onboarding@resend.dev>',
      to: ['jirokuntivero@gmail.com'],
      subject: 'Your order has been placed',
      react: ReceiptTemplate(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
