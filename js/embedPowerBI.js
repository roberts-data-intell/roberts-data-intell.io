// Assuming you've already fetched your embed token from your backend
var embedToken = "YOUR_EMBED_TOKEN_HERE";

// Configuration for the report embedding
var config = {
    type: 'report',
    tokenType: PowerBI.models.TokenType.Embed,
    accessToken: embedToken,
    embedUrl: 'YOUR_EMBED_URL_HERE',
    id: 'YOUR_REPORT_ID',
    permissions: PowerBI.models.Permissions.All,
    settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true
    }
};

// Embed the report once the document is loaded
document.addEventListener("DOMContentLoaded", function() {
    var reportContainer = document.getElementById('reportContainer');
    var report = powerbi.embed(reportContainer, config);
});
