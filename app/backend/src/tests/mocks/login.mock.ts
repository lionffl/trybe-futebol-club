export const validUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const validLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const invalidLoginPassword = {
  email: 'admin@admin.com',
  password: '1231321r345235145'
};

export const invalidLoginEmail = {
  email: 'lionffl@gmail.com',
  password: '1231321r345235145'
};

export const passwordMissing = {
  email: 'lionffl@gmail.com'
};

export const emailMissing = {
  password: '12312231231231'
};
