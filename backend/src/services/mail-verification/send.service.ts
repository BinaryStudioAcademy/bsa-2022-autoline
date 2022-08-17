const mailSend = (email: string): string => {
  // Mock token, it must be genereted here
  const token = 'rOiBUBf2pPvOHTNBeTR8CkLGokwHADhv';
  console.log(`Sending email to ${email}`);
  return token;
};

export { mailSend };
