import type { Role } from './rbac';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AuthSession = {
  user: SessionUser;
  issuedAt: string;
};

// Phase 2C contract only. Replace with the production identity provider/session store.
// No credentials, cookies or secrets are hard-coded here.
export function getMockSession(role: Role = 'ARCHIVIST'): AuthSession {
  return {
    user: {
      id: 'demo-user',
      name: 'PSF Demo User',
      email: 'demo@agency.gov.my',
      role,
    },
    issuedAt: new Date(0).toISOString(),
  };
}
