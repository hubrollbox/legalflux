export const authConfig = {
  clientPortal: {
    require2FA: true,
    sessionTimeout: 30, // minutes
    encryption: {
      documentUploads: true,
      messaging: true
    }
  }
};