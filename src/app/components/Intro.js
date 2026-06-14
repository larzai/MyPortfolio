"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/intro.module.css";

export default function Intro() {
  const words = [
    { hello: "Hello", you: "You" },
    { hello: "Hola", you: "你" },
    { hello: "สวัสดี", you: "당신" },
    { hello: "Merhaba", you: "あなた" },
    { hello: "Привет", you: "أنت" },
    { hello: "Hej", you: "तum" },
    { hello: "Bonjour", you: "Você" },
    { hello: "Ciao", you: "Du" },
    { hello: "Hallo", you: "Tu" },
    { hello: "Olá", you: "Toi" },
    { hello: "नमस्ते", you: "Du" },
    { hello: "السلام عليكم", you: "Ты" },
    { hello: "こんにちは", you: "Sen" },
    { hello: "안녕하세요", you: "คุณ" },
    { hello: "你好", you: "Tú" }
  ];

  const [index, setIndex] = useState(0);
  const [introVH, setIntroVH] = useState(100);
  const [radiusIntroVH, setRadiusIntroVH] = useState(0);

  useEffect(() => {
    if (window.__INTRO_PLAYED__) {
      setIntroVH(0);
      return;
    }

    window.__INTRO_PLAYED__ = true;

    const interval = setInterval(() => {
      setIndex((i) => {
        if (i + 1 >= words.length) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 140);

    const timeout = setTimeout(() => {
      setIntroVH(0);
      setRadiusIntroVH(100);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className={styles.intro}
      style={{
        height: `${introVH}vh`,
        borderBottomLeftRadius: `${radiusIntroVH}%`,
        borderBottomRightRadius: `${radiusIntroVH}%`
      }}
    >
      <h1 className={styles.introText}>
        {words[index].hello} <span>{words[index].you}</span>
      </h1>
    </section>
  );
}