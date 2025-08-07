exports.signupSuccessEmail = (name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Welcome to Nexucon!</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxqVGBpQ-J_KougIyF5gLMGsCLHgNJU3grA&s"
                    alt="Nexucon Logo"></a>
            <div class="message">Welcome to StudyNotion!</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Congratulations! You have successfully signed up for <span class="highlight">Nexucon Consultancy Services</span>. We're thrilled to have you join our learning community!</p>
                <p>Get started by exploring our Services.</p>
                <a class="cta" href="">Explore Your Dashboard</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:santrabikash921@gmail.com">santrabikash921@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};