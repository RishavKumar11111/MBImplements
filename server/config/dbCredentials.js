const dbCredentials = () => {
  const encodedUser = 'cG9zdGdyZXM=';
  const encodedHost = 'bG9jYWxob3N0'; // local
  // const encodedHost = 'MTAuMTcyLjAuNzg='; // staging
  const enCodedDatabase = 'TUJJbXBsZW1lbnRz';
  const encodedPassword = 'c2FAMTIzIw=='; // local Rishav
  // const encodedPassword = 'MTIzNA=='; // local Sandeep
  // const encodedPassword = 'cG9zdGdyZXM='; // staging
  const encodedPort = 'NTQzMg==';
  return {
    encodedUser, encodedHost, enCodedDatabase, encodedPassword, encodedPort
  };
};

exports.dbCredentials = dbCredentials;