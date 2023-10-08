import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from "../assets/theme";
import createEmotionCache from '../src/createEmotionCache';
import '../styles/global.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import '../styles/global.css';
import Layout from './layouts/main'
import { withAuthenticator } from "@aws-amplify/ui-react";
import Loader from './components/Loader';

Amplify.configure({ ...awsExports, ssr: true });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (you can replace this with your actual data loading logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {isLoading ? (
        // Display a loader while loading
        <Loader />
      ) : (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      )}
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default withAuthenticator(MyApp);