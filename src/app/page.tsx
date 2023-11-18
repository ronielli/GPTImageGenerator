"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";

import { Timestamp } from "firebase/firestore";
// import { firestore } from "../db";

import { v4 } from "uuid";

import apiOpenai from "./service/apiOpenai";

export interface IImageGeneration {
  created: number;
  data: Data[];
}

export interface Data {
  revised_prompt: string;
  url: string;
}
export interface IImage {
  imgUrl: string;
  id: string;
  createdAt: Timestamp;
}

export default function Home() {
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState("Nenhum texto gerado");
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageGeneration = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await apiOpenai.post("/images/generations", {
          model: "dall-e-3",
          prompt: text,
          n: 1,
          size: "1024x1024",
        });

        const { data } = response.data as IImageGeneration;

        setPrompt(data[0].revised_prompt);
        const imagesData = data.map((image) => ({
          id: v4(),
          createdAt: Timestamp.now(),
          imgUrl: image.url,
        })) as IImage[];

        setImages(imagesData);
      } catch (error) {
        // Handle errors here
        console.error("Error generating images:", error);
      } finally {
        setLoading(false);
      }
    },
    [text, setImages, setLoading]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <form className="flex w-full lg:flex-col items-center">
          <div className="flex w-full lg:flex-row items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full lg:w-1/1 p-4 mb-4 lg:mb-0 bg-gray-100 rounded-lg text-black mr-0 lg:mr-2"
              type="text"
              placeholder="Descreva a imagem que você procura"
            />
            <button
              onClick={handleImageGeneration}
              className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-lg bg-gray-100 text-black font-bold hover:bg-gray-300 transition duration-300"
            >
              {loading ? "Carregando..." : "Gerar Imagens"}
            </button>
          </div>

          <div className="flex w-full lg:flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-5">
              {images.length > 0 ? prompt : "Nenhuma imagem gerada"}
            </h1>

            <div className="grid grid-cols-3 gap-4">
              {images.map((image) => (
                <div className="bg-gray-100 rounded-lg p-4" key={image.id}>
                  <Image
                    src={image.imgUrl}
                    width={500}
                    height={500}
                    alt="Imagem camisa da seleção brasileira"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
