import "../styles/vars.scss";
import "../styles/global.scss";
import type { AppProps /*, AppContext */ } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
