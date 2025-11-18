export interface UserType {
  _links: {
    self: {
      href: string;
    };
    password: {
      href: string;
    };
    'password.set': {
      href: string;
    };
    'password.reset': {
      href: string;
    };
    'password.check': {
      href: string;
    };
    'password.recover': {
      href: string;
    };
    'account.sendVerificationCode': {
      href: string;
    };
    linkedAccounts: {
      href: string;
    };
  };
  _embedded: {
    password: {
      environment: {
        id: string;
      };
      user: {
        id: string;
      };
      passwordPolicy: {
        id: string;
      };
      status: string;
      lastChangedAt: string;
    };
  };
  id: string;
  key: string | React.Key;
  environment: {
    id: string;
  };
  account: {
    canAuthenticate: boolean;
    status: string;
  };
  createdAt: string;
  email: string;
  enabled: boolean;
  identityProvider: {
    type: string;
  };
  lifecycle: {
    status: string;
  };
  mfaEnabled: boolean;
  name: {
    given: string;
    family: string;
  };
  population: {
    id: string;
  };
  updatedAt: string;
  username: string;
  verifyStatus: string;
}
