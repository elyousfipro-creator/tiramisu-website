# 📧 Configuration Email - Crème & Cookies

## 🆓 Services Gratuits Utilisés

- **Vercel Functions** : API serverless gratuite
- **Resend** : 3 000 emails/mois gratuits
- **Vercel Postgres** : Base de données gratuite (optionnel)

---

## 🚀 Étapes de Configuration

### 1. Créer un compte Resend (Gratuit)

1. Va sur [resend.com](https://resend.com)
2. Crée un compte gratuit
3. Récupère ta clé API dans les settings

### 2. Configurer le Domaine (Optionnel mais recommandé)

Pour que les emails n'aillent pas dans les spams :

1. Dans Resend, ajoute ton domaine (ex: `cremecookies.fr`)
2. Configure les DNS (SPF, DKIM) chez ton registrar
3. Attends la vérification (quelques heures)

**Sans domaine** : Les emails partiront de `noreply@resend.dev` (peut aller en spam)

### 3. Configurer les Variables d'Environnement sur Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Sélectionne ton projet
3. Va dans **Settings** → **Environment Variables**
4. Ajoute :

```
RESEND_API_KEY=re_YOUR_API_KEY_HERE
```

### 4. Déployer

```bash
vercel --prod
```

---

## 📧 Emails Disponibles

### 1. Email de Bienvenue (Confirmation compte)

Envoyé automatiquement quand un utilisateur s'inscrit :

```typescript
import { sendEmail, emailTemplates } from './services/email';

await sendEmail({
  to: userEmail,
  ...emailTemplates.welcome(userName)
});
```

### 2. Email de Confirmation de Commande

```typescript
await sendEmail({
  to: userEmail,
  ...emailTemplates.orderConfirmation(orderId, items, total)
});
```

### 3. Email Promotionnel

```typescript
await sendEmail({
  to: userEmail,
  ...emailTemplates.promo(
    'Offre Spéciale Weekend !',
    '1 Tiramisu acheté = 1 offert',
    'WEEKEND50'
  )
});
```

---

## 🎯 Utilisation pour les Promotions (Marketing)

### Envoyer une promo à tous les clients :

1. Récupérer la liste des emails depuis la base de données
2. Envoyer un email personnalisé à chacun
3. **Respecter le RGPD** : Avoir le consentement des utilisateurs

### Script d'envoi de newsletter :

```typescript
// api/send-newsletter.js
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { subject, html, recipients } = req.body;
  
  const results = await Promise.all(
    recipients.map(email => 
      resend.emails.send({
        from: 'Crème & Cookies <noreply@cremecookies.fr>',
        to: [email],
        subject,
        html
      })
    )
  );
  
  res.json({ sent: results.length });
}
```

---

## 📊 Limites Gratuites

| Service | Limite Gratuite |
|---------|----------------|
| Resend | 3 000 emails/mois |
| Vercel Functions | 100 GB-hrs/mois |
| Vercel Bandwidth | 100 GB/mois |

**Si tu dépasses 3 000 emails/mois** : Passe au plan payant Resend ($20/mois pour 50 000 emails)

---

## 🔒 Bonnes Pratiques

1. **Ne jamais** committer ta clé API dans le code
2. Utiliser toujours les variables d'environnement
3. Ajouter une option "Se désinscrire" dans les emails marketing
4. Respecter le RGPD (consentement explicite)
5. Tester les emails en local avant déploiement

---

## 🧪 Tester en Local

```bash
# Installer Resend localement
npm install resend

# Créer un fichier .env.local
RESEND_API_KEY=re_test_xxx

# Lancer le serveur de développement
vercel dev
```

Appeler l'API : 
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test",
    "html": "<h1>Hello!</h1>"
  }'
```
