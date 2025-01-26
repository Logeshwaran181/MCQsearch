import React, { useState, useEffect } from "react";
import "./searchcomponent.css";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showSolution, setShowSolution] = useState({});
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://mc-qsearch-z7a3.vercel.app/api/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setResults(data?.questions || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchQuestions();
  }, []);

  const NextPage = async () => {
    try {
      const response = await fetch(`https://mc-qsearch-z7a3.vercel.app/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "page": (pageNumber + 1),
          "type": (type),
        }),
      }).then((response) => response.json()).catch(() => {
        console.log("Error fetching data");
      });
      setPageNumber(response?.currentPage);
      setResults(response?.questions);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const PrevPage = async () => {
    if (pageNumber !== 1) {
      try {
        const response = await fetch(`https://mc-qsearch-z7a3.vercel.app/api/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "page": (pageNumber - 1),
            "type": (type),
          }),
        }).then((response) => response.json()).catch(() => {
          console.log("Error fetching data");
        });
        setPageNumber(response?.currentPage);
        setResults(response?.questions);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://mc-qsearch-z7a3.vercel.app/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery, type: type })
      }).then((response) => response.json()).catch(() => {
        console.log("Error fetching data");
      });
      setResults(response?.questions);
    }
    catch (err) {
      console.log("Error fetching data");
    }
  };

  const handleSearch2 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://mc-qsearch-z7a3.vercel.app/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: e.target.value })
      }).then((response) => response.json()).catch(() => {
        console.log("Error fetching data");
      });
      setResults(response?.questions);
    }
    catch (err) {
      console.log("Error fetching data");
    }
  };

  const toggleSolution = (questionId) => {
    setShowSolution(prevState => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  const getCorrectAnswer = (options) => {
    const correctOption = options.find(option => option.isCorrectAnswer === true);
    return correctOption ? correctOption.text : "No correct answer available";
  };

  const getAnagramAnswer = (blocks) => {
    // Extract text from each block and join them into a single string
    return blocks ? blocks.map(block => block.text).join(" ") : "No correct answer available";
  };

  return (
    <div className="Webname">
      <h1 className="webname-title">MCQ SEARCH</h1>
      {/* <div className="search-container"> */}
      <div className="search-container2">
        {/* <h2 className="search-title">Search the Question -👇</h2> */}
        <div className="search-bar">
          <select
            onChange={(e) => {
              handleSearch2(e);
              setType(e.target.value)
            }}
            name="type" id="type">
            <option value="">All</option>
            <option value="MCQ">MCQ</option>
            <option value="ANAGRAM">ANAGRAM</option>
            <option value="READ_ALONG">READ_ALONG</option>
            <option value="CONTENT_ONLY">CONTENT_ONLY</option>
          </select>
          <input
            type="text"
            placeholder="Type something..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            🔍
          </button>
        </div>
        <div className="search-results">
          <h3>Results:</h3>
          
          {results.length > 0 ? (
            <>
              {results.map((question, index) => (
                <div className="question-box" key={question._id}>
                  <h1 className="question-type"><b>Type :</b> {question.type || "No type"}</h1>
                  <h1 className="question-type"><b>Title :</b> {question.title || "No title available"}</h1>

                  {/* Displaying options for MCQ */}
                  {question.options && question.options.map((content, index) => (
                    <div key={index}>
                      <h1 className="options">
                        {String.fromCharCode(97 + index)}) {content.text}
                      </h1>
                    </div>
                  ))}

                  {/* Displaying blocks for ANAGRAM */}
                  {question.blocks && question.blocks.map((content, index) => (
                    <div key={index}>
                      <h1 className="options">
                        {String.fromCharCode(97 + index)}) {content.text}
                      </h1>
                    </div>
                  ))}

                  {/* Show Solution button for MCQ and Anagram types */}
                  {(question.type === "MCQ" || question.type === "ANAGRAM") && (
                    <button
                      onClick={() => toggleSolution(question._id)}
                      className="show-solution-button"
                    >
                      {showSolution[question._id] ? "Hide Solution" : "Click here for solution"}
                    </button>
                  )}

                  {/* Displaying Solution */}
                  {showSolution[question._id] && (
                    <div className="solution">

                      {/* For MCQ, show correct answer */}
                      {question.type === "MCQ" && (
                        <h3><b>Correct Answer:</b> {getCorrectAnswer(question.options)}</h3>
                      )}

                      {/* For Anagram, show correct answer */}
                      {question.type === "ANAGRAM" && (
                        <h3><b>Correct Answer:</b> {getAnagramAnswer(question.blocks)}</h3>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            loading ?
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
            :
            <h3>No Results</h3>
          )}
        </div>
        <div className="pagination">
          <button className="page-button" id={pageNumber !== 1 ? 'active' : 'hide'} onClick={()=>{PrevPage(); window.scrollTo(0,0)}}>Prev</button>
          <h1 className="page-number"><b>Page :</b> {pageNumber}</h1>
          <button className="page-button" onClick={()=>{NextPage(); window.scrollTo(0,0)}}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
