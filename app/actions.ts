'use server';

// Server Actions - functions that run on the server
// Called directly from Client Components without needing API routes

export async function submitFeedback(formData: FormData) {
  // Extract form data
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return {
      success: false,
      error: 'All fields are required'
    };
  }

  // Simulate async operation (in real app: save to database, send email, etc.)
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Feedback received:', { name, email, message });

  return {
    success: true,
    message: 'Thank you for your feedback!'
  };
}
