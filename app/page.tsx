"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  async function generateImage(): Promise<any> {
    setLoading(true);
    console.log(searchVal);

    const response = await fetch(`http://localhost:3000/api/genarate_image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "test",
    });
    const data = await response.json();

    setImage(data.url);
    setSearchVal("");
    setLoading(false);
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.background}>
          <h1>AI Image Generation with OpenAI</h1>
          <input
            value={searchVal}
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchVal(event.target.value)
            }
          />
          <button onClick={() => generateImage()}>
            {loading ? "Loading..." : "Generate image"}
          </button>
        </div>
        {image && (
          <>
            <img className="image-result" src={image} alt="ai generated" />
          </>
        )}
      </main>
    </>
  );
}
