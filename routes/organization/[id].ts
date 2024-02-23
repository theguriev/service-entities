export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return { id };
});
