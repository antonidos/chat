import '../app/index.css'

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <Component {...pageProps} />
}