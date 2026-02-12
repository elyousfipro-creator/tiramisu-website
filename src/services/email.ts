// Email service for sending emails via Vercel API

const API_URL = '/api/send-email';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Email service error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Bienvenue chez Crème & Cookies ! 🍪',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff5f5;">
        <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); border-radius: 15px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Bienvenue ${name} !</h1>
          <p style="color: white; font-size: 18px; margin: 10px 0;">Votre compte Crème & Cookies est créé</p>
        </div>
        <div style="padding: 30px; background: white; border-radius: 15px; margin-top: 20px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Merci d'avoir créé votre compte ! Vous pouvez maintenant :
          </p>
          <ul style="font-size: 16px; color: #555; line-height: 1.8;">
            <li>Composer votre tiramisu personnalisé</li>
            <li>Sauvegarder vos créations favorites</li>
            <li>Recevoir des offres exclusives</li>
          </ul>
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://cremecookies.vercel.app/configurator" 
               style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); 
                      color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 25px; font-weight: bold; display: inline-block;">
              Composer mon Tiramisu
            </a>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
          © 2024 Crème & Cookies - Tous droits réservés
        </div>
      </div>
    `
  }),

  orderConfirmation: (orderId: string, items: any[], total: number) => ({
    subject: `Confirmation de votre commande #${orderId} 🍰`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff5f5;">
        <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); border-radius: 15px;">
          <h1 style="color: white; margin: 0;">Commande Confirmée !</h1>
          <p style="color: white; font-size: 18px;">#${orderId}</p>
        </div>
        <div style="padding: 30px; background: white; border-radius: 15px; margin-top: 20px;">
          <p style="font-size: 16px; color: #333;">Votre commande a été reçue et est en préparation !</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #ff9a9e;">Détails de la commande :</h3>
            ${items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <strong>Tiramisu ${item.size}</strong><br>
                Toppings: ${item.toppings.join(', ') || 'Aucun'}<br>
                Coulis: ${item.coulis.join(', ') || 'Aucun'}
              </div>
            `).join('')}
            <div style="text-align: right; font-size: 20px; font-weight: bold; color: #ff9a9e; margin-top: 10px;">
              Total: ${total}€
            </div>
          </div>
          <p style="text-align: center; color: #666;">
            Vous recevrez un email lorsque votre commande sera prête !
          </p>
        </div>
      </div>
    `
  }),

  promo: (title: string, message: string, code?: string) => ({
    subject: `${title} 🎁`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff5f5;">
        <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); border-radius: 15px;">
          <h1 style="color: white; margin: 0;">${title}</h1>
        </div>
        <div style="padding: 30px; background: white; border-radius: 15px; margin-top: 20px; text-align: center;">
          <p style="font-size: 18px; color: #333; line-height: 1.6;">${message}</p>
          ${code ? `
            <div style="background: #fff3cd; border: 2px dashed #ffc107; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #856404;">Code promo :</p>
              <p style="margin: 10px 0; font-size: 24px; font-weight: bold; color: #ff6b6b; letter-spacing: 2px;">${code}</p>
            </div>
          ` : ''}
          <a href="https://cremecookies.vercel.app" 
             style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); 
                    color: white; padding: 15px 30px; text-decoration: none; 
                    border-radius: 25px; font-weight: bold; display: inline-block; margin-top: 20px;">
            Commander maintenant
          </a>
        </div>
      </div>
    `
  })
};
