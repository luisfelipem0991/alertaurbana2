global.Response = {
  json: (data, options = {}) => ({
    json: async () => data,
    status: options.status || 200,
  }),
};