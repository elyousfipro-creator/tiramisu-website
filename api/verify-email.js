const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory storage for verification tokens (replace with Vercel KV for production)
const verificationTokens = new Map();

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle verification check (GET /api/verify-email?token=xxx)
  if (req.method === 'GET') {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'Token missing' });
    }

    const verificationData = verificationTokens.get(token);
    
    if (!verificationData) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    if (verificationData.expires < Date.now()) {
      verificationTokens.delete(token);
      return res.status(400).json({ error: 'Token expired' });
    }

    // Mark as verified
    verificationData.verified = true;
    verificationTokens.set(token, verificationData);

    return res.status(200).json({ 
      success: true, 
      email: verificationData.email,
      message: 'Email verified successfully'
    });
  }

  // Handle sending verification email (POST /api/verify-email)
  if (req.method === 'POST') {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Missing required fields: email, name' });
    }

    // Generate verification token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Store token
    verificationTokens.set(token, {
      email,
      name,
      expires,
      verified: false
    });

    // Build verification URL
    const verificationUrl = `${process.env.VERCEL_URL || 'https://cremecookies.vercel.app'}/verify-email?token=${token}`;

    // Send email using Resend
    try {
      const data = await resend.emails.send({
        from: 'Crème & Cookies <noreply@cremecookies.fr>',
        to: [email],
        subject: 'Confirmez votre email - Crème & Cookies 🍪',
        html: generateVerificationEmail(name, verificationUrl)
      });

      return res.status(200).json({ 
        success: true, 
        message: 'Verification email sent',
        data 
      });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

// Generate verification email HTML with pastel theme
function generateVerificationEmail(name, verificationUrl) {
  const COLORS = {
    pink: '#ffb3ba',
    blue: '#bae1ff',
    beigeLight: '#faf5ef',
    text: '#4a4a4a',
    textLight: '#666666'
  };

  return `
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
              
              <!-- Header with Logo -->
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
                    <span style="color: #bbb;">Cet email a été envoyé automatiquement.</span>
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
