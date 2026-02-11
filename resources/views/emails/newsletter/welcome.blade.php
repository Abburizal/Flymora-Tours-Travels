<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Flymora Newsletter</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
            color: #333333;
            line-height: 1.6;
        }
        .content h2 {
            color: #667eea;
            margin-top: 0;
        }
        .content p {
            margin: 15px 0;
        }
        .benefits {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
        }
        .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .benefits li {
            margin: 8px 0;
            color: #555;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 13px;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        .unsubscribe {
            margin-top: 20px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🎉 Welcome to Flymora Tours & Travels!</h1>
        </div>
        
        <div class="content">
            <h2>Thank You for Subscribing!</h2>
            
            <p>Dear Traveler,</p>
            
            <p>We're thrilled to have you join our community! You've successfully subscribed to the Flymora Tours & Travels newsletter.</p>
            
            <div class="benefits">
                <strong>Here's what you'll receive:</strong>
                <ul>
                    <li>✈️ Exclusive travel deals and early bird discounts</li>
                    <li>🌍 Latest tour packages and destinations</li>
                    <li>🎁 Special offers for newsletter subscribers</li>
                    <li>📚 Travel tips and destination guides</li>
                    <li>🎉 Seasonal promotions and flash sales</li>
                </ul>
            </div>
            
            <p>Get ready to explore the world with us! Browse our latest tours and start planning your next adventure.</p>
            
            <center>
                <a href="{{ config('app.frontend_url', 'http://localhost:5173') }}/tours" class="cta-button">
                    Explore Our Tours
                </a>
            </center>
            
            <p style="margin-top: 30px;">If you have any questions, feel free to reach out to us at <a href="mailto:info@flymora.com">info@flymora.com</a></p>
            
            <p>Happy travels! 🌏✨</p>
            
            <p><strong>The Flymora Team</strong></p>
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} Flymora Tours & Travels. All rights reserved.</p>
            
            <p>📧 {{ $subscriber->email }}</p>
            
            <div class="unsubscribe">
                <p>Don't want to receive these emails?</p>
                <a href="{{ config('app.frontend_url', 'http://localhost:5173') }}/newsletter/unsubscribe/{{ $subscriber->token }}">
                    Unsubscribe from this list
                </a>
            </div>
        </div>
    </div>
</body>
</html>
