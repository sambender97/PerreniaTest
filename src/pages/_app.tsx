import React from "react";
import type { AppProps } from "next/app";
import AppSyncProvider from "@/lib/apolloConfig";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppSyncProvider>
      <main className="App">
        <div className="page-container">
          <StatusBar />
          <Component {...pageProps} />
        </div>
      </main>
    </AppSyncProvider>
  );
}

const StatusBar = () => {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedTime = `${hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${ampm}`;
      setTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="status-bar">
      <div className="status-bar-left">
        <p>{time}</p>
      </div>
      <div className="notch" />
      <div className="status-bar-right">
        <span>
          <AiIcons.AiFillSignal />
        </span>
        <span>
          <AiIcons.AiOutlineWifi />
        </span>
        <span>
          <BsIcons.BsBatteryFull />
        </span>
      </div>
    </div>
  );
};
