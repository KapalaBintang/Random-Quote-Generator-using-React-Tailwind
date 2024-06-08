import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function QuotesGenerator() {
  const [quote, setQuote] = useState({
    quote: "To see the border of possibility, go to try the impossible ",
    author: "Sultan Mehmed II",
  });

  const [isLoading, setIsLoading] = useState(false); // State untuk menandai apakah permintaan sedang berlangsung

  const generateQuote = () => {
    if (!isLoading) {
      // Cek apakah sedang memuat sebelum melakukan permintaan
      setIsLoading(true); // Atur state isLoading menjadi true saat permintaan dimulai
      fetch("https://dummyjson.com/quotes")
        .then((response) => response.json())
        .then((data) => {
          const select = data.quotes[Math.floor(Math.random() * data.quotes.length)];
          setQuote(select);
        })
        .catch((error) => console.error("Error fetching quotes:", error))
        .finally(() => setIsLoading(false)); // Setel state isLoading menjadi false setelah permintaan selesai
    }
  };

  return (
    <>
      <div className="mx-auto mt-24 bg-indigo-950 text-white w-[800px] h-[400px] p-6 flex flex-col border border-orange-50 justify-start rounded-md shadow-smshadow-white ">
        <div className="flex flex-wrap flex-col justify-center">
          <h1 className="text-3xl text-center mb-16 font-bold font-body">Quotes</h1>
          <div className="quote-container mx-auto max-w-[660px] h-[100px] overflow-auto mb-3">
            <h1 className="quote-text text-center text-3xl  font-body">{quote.quote}</h1>
          </div>
          <div className="w-[660px] h-[2px] bg-white mx-auto mb-10"></div>
          <div className="flex items-center justify-between px-11">
            <p className="font-medium text-lg cursor-pointer font-body ">{quote.author}</p>
            <FontAwesomeIcon onClick={generateQuote} className={`text-2xl cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} icon={faShuffle} />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuotesGenerator;
