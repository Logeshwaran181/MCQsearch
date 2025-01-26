import React, { useState, useEffect } from "react";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [pageNumber,setPageNumber] = useState(1);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched Questions:", data?.questions); // Debug log
        setResults(data?.questions || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchQuestions();
  }, []);


  const NextPage = async() =>{
      try{
        const response = await fetch(`http://localhost:8080/api/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            "page" : (pageNumber+1),
            "type" : (type)
          })
          
        }).then((response) => response.json()).catch(()=>{
          console.log("Error fetching data");
        })
        setPageNumber((await response?.currentPage) );

        console.log(await response)
        setResults(await response?.questions)
      }catch(error){
        console.error("Error fetching data:", error.message);
      }
  }

  const PrevPage = async() =>{
    if(pageNumber!=1){

    
    try{
      const response = await fetch(`http://localhost:8080/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "page" : (pageNumber-1),
          "type" : (type)
        })
        
      }).then((response) => response.json()).catch(()=>{
        console.log("Error fetching data");
      })
      setPageNumber((await response?.currentPage));
      console.log(await response)
      setResults(await response?.questions)
    }catch(error){
      console.error("Error fetching data:", error.message);
    }
  }
}
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add additional search handling logic if needed
    try{
      const response = await fetch(`http://localhost:8080/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery,type: type })
        
      }).then((response) => response.json()).catch(()=>{
        console.log("Error fetching data");
      })

      console.log(await response)
      setResults(await response?.questions)
    }
    catch(err){
      console.log("Error fetching data");
    }

  };

  const handleSearch2 = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add additional search handling logic if needed
    try{
      const response = await fetch(`http://localhost:8080/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({type: e.target.value })
        
      }).then((response) => response.json()).catch(()=>{
        console.log("Error fetching data");
      })

      console.log(await response)
      setResults(await response?.questions)
    }
    catch(err){
      console.log("Error fetching data");
    }

  };

  return (
    <div className="Webname">
      <h1>MCQ SEARCH</h1>
      <div className="search-container">
        <h2 className="search-title">Search the Question -👇</h2>
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
            onChange={(e) =>setSearchQuery(e.target.value)}
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
                <div className="question-box">
                  <h1 className="question-type" key={index}>
                    <b>Type :</b> {question.type || "No type"}
                  </h1>
                  <h1 className="question-type" key={index}>
                    <b>Title :</b> {question.title || "No title available"}
                  </h1>
                  {
                    question.options && question.options.map((content, index) => (
                      <div key={index}>
                        <h1 className="options">
  {String.fromCharCode(97 + index)}{')'} {/* Converts ASCII value to character */}
  {content.text}
</h1>
                        </div>
                    ))
                  }
                  {
                    question.blocks && question.blocks.map((content, index) => (
                      <div key={index}>
                        <div>
                        <h1 className="options">
                          
                            {String.fromCharCode(97 + index + ')')} {/* Converts ASCII value to character */}
                            {content.text}
                  
                        </h1>
                        </div>
                        </div>
                    ))
                  }

                </div>
              ))}
              </>
            
          ) : (
            <p>No results found.</p>
          )}
        </div>
        <div className="pagination">
          <button className="page-button" id={pageNumber!=1 ? 'active' : 'hide'} onClick={PrevPage}>Prev</button>
          <h1 className="page-number"><b>Page :</b> {pageNumber}</h1>
          <button className="page-button" onClick={NextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
