import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";
import type { AppProps /*, AppContext */ } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
