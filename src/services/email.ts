// Email service for sending emails via Vercel API

const API_URL = '/api/send-email';

// Brand colors matching the website theme
const COLORS = {
  pink: '#ffb3ba',
  pinkLight: '#ffd1d9',
  blue: '#bae1ff',
  blueLight: '#d1ebff',
  beige: '#f5e6d3',
  beigeLight: '#faf5ef',
  text: '#4a4a4a',
  textLight: '#666666'
};

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

// Email templates with pastel theme matching the website
export const emailTemplates = {
  verification: (name: string, verificationUrl: string) => ({
    subject: 'Confirmez votre email - Crème & Cookies 🍪',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérification email - Crème & Cookies</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: ${COLORS.beigeLight}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(255, 179, 186, 0.2);">
                
                <!-- Header with Logo Area -->
                <tr>
                  <td style="background: linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.blue} 100%); padding: 40px 30px; text-align: center;">
                    <div style="background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                      <span style="font-size: 40px;">🍪</span>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Crème & Cookies</h1>
                    <p style="color: white; margin: 10px 0 0; font-size: 16px; opacity: 0.95;">Votre tiramisu sur mesure</p>
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: ${COLORS.text}; font-size: 24px; margin: 0 0 20px; text-align: center;">Bienvenue ${name} ! 👋</h2>
                    
                    <p style="color: ${COLORS.textLight}; font-size: 16px; line-height: 1.7; margin: 0 0 25px; text-align: center;">
                      Merci de vous être inscrit chez <strong style="color: ${COLORS.pink};">Crème & Cookies</strong>.<br>
                      Pour activer votre compte et commencer à composer vos tiramisus, veuillez confirmer votre email.
                    </p>
                    
                    <!-- Verification Button -->
                    <div style="text-align: center; margin: 35px 0;">
                      <a href="${verificationUrl}" 
                         style="background: linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.blue} 100%); 
                                color: white; padding: 18px 40px; text-decoration: none; 
                                border-radius: 30px; font-weight: 700; font-size: 16px;
                                display: inline-block; box-shadow: 0 4px 15px rgba(255, 179, 186, 0.4);">
                        ✅ Confirmer mon email
                      </a>
                    </div>
                    
                    <p style="color: #999; font-size: 13px; text-align: center; margin: 25px 0 0;">
                      Si le bouton ne fonctionne pas, copiez ce lien :<br>
                      <span style="color: ${COLORS.blue}; word-break: break-all;">${verificationUrl}</span>
                    </p>
                  </td>
                </tr>
                
                <!-- Features -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <div style="background: ${COLORS.beigeLight}; border-radius: 15px; padding: 25px;">
                      <h3 style="color: ${COLORS.text}; font-size: 18px; margin: 0 0 20px; text-align: center;">Avec votre compte, vous pouvez :</h3>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="33%" style="text-align: center; padding: 10px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">🎂</div>
                            <p style="color: ${COLORS.textLight}; font-size: 13px; margin: 0;">Composer votre tiramisu</p>
                          </td>
                          <td width="33%" style="text-align: center; padding: 10px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">💝</div>
                            <p style="color: ${COLORS.textLight}; font-size: 13px; margin: 0;">Sauvegarder vos favoris</p>
                          </td>
                          <td width="33%" style="text-align: center; padding: 10px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">🎁</div>
                            <p style="color: ${COLORS.textLight}; font-size: 13px; margin: 0;">Recevoir des offres</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background: ${COLORS.beigeLight}; text-align: center;">
                    <p style="color: #999; font-size: 12px; margin: 0;">
                      © 2024 Crème & Cookies - Tous droits réservés<br>
                      <span style="color: #bbb;">Cet email a été envoyé automatiquement, merci de ne pas y répondre.</span>
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
