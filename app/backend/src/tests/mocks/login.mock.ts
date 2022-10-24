export const validUserMock = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const validLoginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const invalidLoginPasswordMock = {
  email: 'admin@admin.com',
  password: '1231321r345235145'
};

export const invalidLoginEmailMock = {
  email: 'lionffl@gmail.com',
  password: '1231321r345235145'
};

export const passwordMissingMock = {
  email: 'lionffl@gmail.com'
};

export const emailMissingMock = {
  password: '12312231231231'
};
