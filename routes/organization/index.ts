export default eventHandler(async (event) => {
  const accessToken = getCookie(event, "accessToken");
  const { secret } = useRuntimeConfig();
  if (accessToken) {
    try {
      const { userId } = await verify(accessToken, secret);
      const organizations = await ModelOrganization.find({ owner: userId });

      return organizations;
    } catch (error) {
      return error;
    }
  }
  throw createError({ message: "Access token not found!", status: 404 });
});
