const requestBodySchema = z.object({
  name: z.string(),
  company: z.string(),
});

export default eventHandler(async (event) => {
  const { name, company } = await zodValidateBody(
    event,
    requestBodySchema.parse
  );
  const accessToken = getCookie(event, "accessToken");
  const { secret } = useRuntimeConfig();
  if (accessToken) {
    try {
      const { userId } = await verify(accessToken, secret);
      const organizationDocument = new ModelOrganization({
        name,
        company,
        timestamp: Date.now(),
        owner: userId,
      });

      const organizationSaved = await organizationDocument.save();

      return organizationSaved;
    } catch (error) {
      return error;
    }
  }
  throw createError({ message: "Access token not found!", status: 404 });
});
