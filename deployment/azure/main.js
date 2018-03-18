// Azure Application Insights should be the first thing initialized on the
// server so that the SDK can instrument node packages.
const appInsights = require('applicationinsights');

if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.setup().start();
}
