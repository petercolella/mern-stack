import React, { useEffect, useState } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const FetchContainer = () => {
  const [data, setData] = useState("");
  const [fetchingText, setFetchingText] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    let didCancel = false;

    const fetchTextAsync = async (url) => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        const data = await response.text();

        // if (!didCancel) {
        console.log("signal", abortController.signal);
        setData(data);
        // }

        setFetchingText(false);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchText = (url) => {
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          if (!didCancel) {
            setData(data);
          }
        });
    };

    fetchTextAsync(csvUrl);

    // return () => {
    //   setFetchingText(false);
    //   abortController.abort();
    //   didCancel = true;
    //   console.log("cleanup");
    // };
  }, []);

  return <p>{data}</p>;
};

export default FetchContainer;
