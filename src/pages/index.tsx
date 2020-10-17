export default function Home() {
  return <div></div>;
}

Home.getInitialProps = async (ctx) => {
  ctx.res.writeHead(302, { Location: '/pokemon/bulbasaur' });
  ctx.res.end();
  return {};
};
