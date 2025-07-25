// Mocking the global.fetch and global.Headers
global.fetch = jest.fn();
global.Headers = jest.fn();

/**
 * Helper to mock a success JSON response.
 */
fetch.mockResponseSuccessJSON = (body) => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(JSON.parse(body)),
      ok: true,
      status: 200,
      statusText: 'OK',
    }),
  );
};

/**
 * Helper to mock a success text response.
 */
fetch.mockResponseSuccessText = (body) => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      text: () => Promise.resolve(body),
      ok: true,
      status: 200,
      statusText: 'OK',
    }),
  );
};

/**
 * Helper to mock a failure response.
 */
fetch.mockResponseFailure = () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      status: 500,
      statusText: 'Internal Error',
    }),
  );
};

fetch.mockResponseCrash = () => {
  fetch.mockImplementationOnce(() =>
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject({
      status: 500,
      statusText: 'Internal Error',
    }),
  );
};

/**
 * Helper to mock a timeout response.
 */
fetch.mockResponseTimeout = () => {
  fetch.mockImplementationOnce(() => {
    const timeout = 1000;

    return new Promise((resolve) => {
      setTimeout(() => setTimeout(resolve, timeout), timeout);
    });
  });
};
