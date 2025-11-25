export const unleashConfig = {
  // Get your client key from: https://app.unleash-hosted.com/
  url: 'https://us.app.unleash-hosted.com/ushosted/api/frontend',
  clientKey: 'YOUR_UNLEASH_CLIENT_KEY_HERE',
  appName: 'allianz-demo-frontend',
  refreshInterval: 15,
  features: {
    messageKillSwitch: 'message_kill_switch'
  }
};
