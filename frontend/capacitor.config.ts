import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neka.app', // ✅ FIXED
  appName: 'NEKA',
  webDir: 'dist',

  server: {
    url: 'https://nekaapp.com', // 🔥 VERY IMPORTANT
    cleartext: true
  }
};

export default config;