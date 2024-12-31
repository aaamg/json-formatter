"use client"
import { useState, useEffect } from "react";

export default function Home() {
  // state
  let [userJSON, setUserJSON] = useState('');
  let [formattedJSON, setFormattedJSON] = useState('');

  // handles user input
  const handleJson = (e) => {
    setUserJSON(e.target.value)
  }

  // formats user input to JSON, or fails if invalid
  let formatJSON = () => {
    try {
      const result = JSON.stringify(JSON.parse(userJSON), null, 2);
      setFormattedJSON(result);
      localStorage.setItem('formattedJSON', result);
    } catch (error) { 
      setFormattedJSON('Invalid JSON, try again.');
      localStorage.removeItem('formattedJSON');
    }
  }
  
  // copy for pasting
  const copyJSONToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJSON);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  }

  // render magic
  useEffect(() => {
    const savedFormattedJSON = localStorage.getItem('formattedJSON');
    if (savedFormattedJSON) {
      setFormattedJSON(savedFormattedJSON);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="p-4">
        <input
          className="px-7 mr-4"
          type="text"
          value={userJSON}
          onChange={handleJson}
          placeholder="Type something..."
          required
        />
      <button onClick={formatJSON} className="border p-2">Format JSON</button>
      </div>
      <button onClick={copyJSONToClipboard} className="border p-2 mb-4">Copy to clipboard</button>
        <pre>{formattedJSON === '' ? "Waiting on you..." : formattedJSON}</pre>
    </div>
  );
}
