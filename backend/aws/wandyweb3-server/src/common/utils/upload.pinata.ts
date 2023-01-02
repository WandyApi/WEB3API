export const uploadFile = async (file, onError) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    method: 'POST',
    maxContentLength: Infinity,
    headers: {
      pinata_api_key: '68f08f473c9f89e4cdfb',
      pinata_secret_api_key:
        '487ebb283253bbfd0da75bc23c618886d1ad91c5966d14ce158f1d7185b064ae',
    },
    body: formData,
  };

  try {
    const response = await fetch(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      config,
    );

    const data = await response.json();

    return data.IpfsHash as string;
  } catch (error) {
    onError({ error });
  }
};
