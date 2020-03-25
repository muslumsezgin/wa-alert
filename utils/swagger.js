const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'WA Alert Api'
};

const specs = swaggerJsDoc({
    definition: {
        info: {
            title: 'Adc WhatsApp Alert Messaging API',
            version: '1.0.1',
            description: 'WhatsApp Alert Messaging `Futurama`',
            contact: {
                email: 'AcikBankacilik@yapikredi.com.tr',
                name: 'Açık Bankacılık ve Uygulama Geliştirme',
            }
        },
        basePath: '/',
        securityDefinitions: {
            BasicKeyAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [
            {
                BasicKeyAuth: []
            }
        ]
    },
    apis: ['./routes/*.js'],
});

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, options))
};
