export default withPageAuthRequired(function Profile({ user }) {
  return <div>Hello {user.name}</div>;
});