export default function Main({}) {
  return (
    <>
      Enviroment:{process.env.TEST_VAR}
      <br /> Database url: {process.env.DATABASE_URL}
    </>
  );
}
