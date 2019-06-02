import React from 'react';
import fetch from 'isomorphic-unfetch';

function Home(props) {
  const { races } = props;

  return races.map(race => <div>{race.title}</div>);
}

Home.getInitialProps = async () => {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3333' : 'https://your_deployment.server.com';

  const res = await fetch(`${server}/data`);
  const races = await res.json();
  return { races };
};

export default Home;
