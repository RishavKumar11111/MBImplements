const dbCredentials = () => {
  const encodedUser = 'cG9zdGdyZXM=';
  const encodedHost = 'bG9jYWxob3N0';
  const enCodedDatabase = 'TUJJbXBsZW1lbnRz';
  const encodedPassword = 'c2FAMTIzIw==';
  // const encodedPassword = 'MTIzNA==';
  const encodedPort = 'NTQzMg==';
  return {
    encodedUser, encodedHost, enCodedDatabase, encodedPassword, encodedPort
  };
};

exports.dbCredentials = dbCredentials;