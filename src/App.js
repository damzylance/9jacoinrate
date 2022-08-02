import Modalbutton from "./Modalbutton/Modalbutton";
import { useState, useEffect, useRef } from "react";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import { GiFallDown } from "react-icons/gi";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import axios from "axios";
import "./App.css";

function App() {
  const exchangeList = [
    { name: "Binance", url: "https://www.binance.com" },
    { name: "Remitano", url: "https://www.remitano.com" },
    { name: "Bitmama", url: "https://www.bitmama.com" },
  ];
  const [coinlist, setCoinList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [coinDetails, setCoinDetails] = useState({});
  const [pricePercentage, setPricePercentage] = useState(0);
  const [price, setPrice] = useState();
  const [localRates, setLocalRates] = useState([]);
  const [coinAmount, setCoinAmount] = useState(1);
  const [coinValue, setCoinValue] = useState(price);

  const onSetRate = (e) => {
    const exchange = e.target.textContent;
    console.log(exchange);
    const parent = e.target.parentNode;
    for (let index = 0; index < parent.children.length; index++) {
      const element = parent.children[index];
      if (element === e.target) {
        element.classList.add("active");
        console.log(element);
      } else {
        element.classList.remove("active");
      }
    }
  };
  let amount;
  let value;
  const onChangeCoinAmount = (e) => {
    amount = e.target.value;
    console.log(amount);
    setCoinAmount(amount);
    value = amount * price;
    console.log(coinAmount);
    // setCoinValue(coinAmount * price);
  };

  useEffect(() => {
    fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=c0f2f97f552b4405ac67b4521572fa7c2caf444c&ids=USDT,BTC,ETH,XRP&interval=1d,7d,30d&convert=USD&per-page=100&page=1"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoinList(data);
      });

    axios
      .get("http://localhost:8000/")
      .then((response) => {
        //   setTimeout(() => {
        //     const body = response.data;
        //     let $ = load(body);
        //     let footer = $("#tour-offer-price > p");
        //     console.log(footer.length);
        //   }, 10000);
        const { btc_ask, eth_ask, usdt_ask, bnb_ask, xrp_ask, bch_ask } =
          response.data.data.ng;
        const rates = [btc_ask, eth_ask, usdt_ask, bnb_ask, xrp_ask, bch_ask];
        console.log(rates);
        setLocalRates(rates);
        console.log(localRates);
      })
      .catch((error) => {
        console.log(error);
      });

    setInterval(() => {
      fetch(
        "https://api.nomics.com/v1/currencies/ticker?key=c0f2f97f552b4405ac67b4521572fa7c2caf444c&ids=USDT,BTC,ETH,XRP&interval=1d,7d,30d&convert=USD&per-page=100&page=1"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCoinList(data);
        });
    }, 3000000);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="exchanges">
          <h1>
            Top Exchanges Buy Crypto in <span className="green">Ni</span>
            <span className="white">ge</span>
            <span className="green">ria</span>
          </h1>
          <div className="exchangeList">
            <div
              className="exchangeCard"
              style={{
                background:
                  "url(https://public.bnbstatic.com/image/cms/blog/20210923/4d355307-c090-47d9-aeaa-88bcdb17751e.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="exchangeCard"
              style={{
                background:
                  "url(https://pbs.twimg.com/profile_images/1478280216644661249/nfErkhyC_400x400.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="exchangeCard"
              style={{
                background:
                  "url(https://www.forbes.com/advisor/wp-content/uploads/2022/01/Untitled-design-3.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="exchangeCard"
              style={{
                background:
                  "url(https://cryptotvplus.com/wp-content/uploads/2021/10/wp-1633696973754.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
        <section className="coinList">
          <h2 className="">Today's Cryptocurrency Prices Accross Exchanges</h2>
          <table>
            <thead>
              <tr>
                <th className="id">#</th>
                <th className="coinName">Name</th>
                <th>Price</th>
                <th>1d Change</th>
                <th>Market Cap</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {coinlist.map((coin, index) => {
                let color;
                let icon;
                if (coin["1d"].price_change_pct.charAt(0) === "-") {
                  color = "red";
                  icon = BsCaretDownFill();
                } else {
                  color = "green";
                  icon = BsCaretUpFill();
                }
                return (
                  <tr
                    className="coinDetails"
                    key={index}
                    onClick={() => {
                      setModalOpen(true);
                      setCoinDetails({
                        coinName: coin.name,
                        coinAth: coin.high,
                        coinPrice: coin.price,
                      });
                      setPricePercentage(
                        parseFloat((coin.price / coin.high) * 100).toFixed(2)
                      );

                      console.log(pricePercentage);
                      setPrice(parseFloat(localRates[index]).toFixed(2));
                    }}
                  >
                    <td className="id">{index + 1}</td>
                    <td className="coinName">{coin.name}</td>
                    <td>
                      <b>&#8358; </b>
                      {
                        parseFloat(localRates[index])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        /* {parseFloat(coin.price * 649)
                      .toFixed(3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */
                      }
                    </td>
                    <td
                      style={{
                        color: color,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "40px",
                      }}
                    >
                      {icon}
                      {coin["1d"].price_change_pct} %
                    </td>
                    <td>
                      <b>&#8358;</b>{" "}
                      {parseFloat(coin.market_cap * localRates[2])
                        .toFixed(3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>
                      {parseFloat(coin["1d"].volume * localRates[2])
                        .toFixed(3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {modalOpen && (
          <div className="modalContainer">
            <div className="modalBox">
              <div className="coinTitle">
                <h2>{coinDetails.coinName}</h2>
                <h2>
                  <BsFillXCircleFill
                    className="closeModal"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  />
                </h2>
              </div>
              <div className="modalContentWrapper">
                <div style={{ display: "flex", height: "300px", gap: "20px" }}>
                  <div style={{ width: 200, height: 200, textAlign: "center" }}>
                    <h4 style={{ color: "rgb(76, 155, 76)" }}>
                      All Time High {coinDetails.coinAth}
                    </h4>
                    <CircularProgressbar
                      value={pricePercentage}
                      text={`₦ ${price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        textSize: "9px",
                        backgroundColor: "rgb(76, 155, 76)",
                        textColor: "#fff",
                        pathColor: "rgb(217 202 77)",
                        trailColor: "transparent",
                      })}
                    />
                  </div>
                </div>
                <div className="converterContainer">
                  <div className="containerWrapper">
                    <div className="formContainer">
                      <div className="formGroup">
                        <label htmlFor="coin">
                          Amount of {coinDetails.coinName}
                        </label>
                        <input
                          type="number"
                          name="coin"
                          id="coin"
                          value={coinAmount}
                          onChange={onChangeCoinAmount}
                        />
                      </div>
                      <GiFallDown size={30} color="rgb(76, 155, 76)" />
                      <div className="formGroup">
                        <label htmlFor="coin">Amount of Naira</label>
                        <input
                          type="number"
                          name="coin"
                          id="coin"
                          value={coinValue}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="exchangeButtons"
                    style={{
                      marginTop: "40px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Modalbutton
                      text="Binance"
                      action={onSetRate}
                      class="active"
                    />
                    <Modalbutton text="Remitano" action={onSetRate} />
                    <Modalbutton text="Bitmama" action={onSetRate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
