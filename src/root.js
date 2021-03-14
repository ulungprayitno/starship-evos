import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './pages';
import { ChakraProvider } from "@chakra-ui/react"

const Root = () => {
  return (
    <Fragment>
      <Router basename="/">
      <ChakraProvider>
            <Pages />
        </ChakraProvider>
      </Router>
    </Fragment>
  );
};

export default Root;