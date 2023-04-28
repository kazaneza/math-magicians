import React, { useState, useEffect } from 'react';
import { FaCircleNotch, FaQuoteLeft } from 'react-icons/fa';

function Quotes() {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = 'zWbFdXe3BQWrlhFsnImSAw==HEDkeSdVW05kaUH7';
  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://api.api-ninjas.com/v1/quotes?category=happiness',
          {
            method: 'GET',
            headers: {
              'X-API-Key': apiKey,
            },
          },
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchQuotes();
  }, [setData, setIsLoading]);

  if (hasError) {
    return (
      <div>
        <p>SOmething went wrong</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div className="spinner">
          <FaCircleNotch />
        </div>
      </div>
    );
  }

  return (
    <section id="quote">
      <div id="qoute-box">
        {data.map((item) => (
          <blockquote key={data.indexOf(item)} className="blockquote">
            <p className="quote">
              <FaQuoteLeft size={42} />
              <span id="text">{item.quote}</span>
            </p>
            <footer className="blockquote-footer" id="author">
              {item.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export default Quotes;
