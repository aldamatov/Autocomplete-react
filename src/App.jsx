import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [contries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/capital"
      );

      setCountries(response.data.data);
    };
    loadCountries();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = contries.filter((country) => {
        const regex = new RegExp(`${text}`, "gi");
        return country.name.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };
  return (
    <div className="App">
      <h2>Please enter the country name</h2>

      <input
        style={{ marginTop: 10 }}
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
      />
      {suggestions &&
        suggestions.map((suggestion, i) => (
          <div
            className="suggest"
            onClick={() => onSuggestHandler(suggestion.name)}
            key={i}
          >
            {suggestion.name}
          </div>
        ))}
    </div>
  );
}
