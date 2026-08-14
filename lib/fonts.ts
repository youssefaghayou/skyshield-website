import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

/* Self-hosted via next/font — zero external font requests at runtime.
   Archivo carries the wdth axis; display style uses font-stretch: 125%. */

export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${inter.variable} ${jetbrains.variable}`;
