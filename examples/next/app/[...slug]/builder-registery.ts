"use client";

import dynamic from "next/dynamic";
import { builder } from "@simple-builder/react";

builder.register(
  dynamic(() => import("../../components/hero").then((mod) => mod.Hero)),
  {
    name: "hero",
    friendlyName: "Hero",
    image: "/components/hero.png",
    inputs: [
      {
        type: "string",
        name: "title",
        friendlyName: "Titel",
        defaultValue: "Hello World",
      },
      {
        type: "file",
        name: "background",
        friendlyName: "Achtergrond",
        defaultValue: "/components/hero-background.jpeg",
      },
    ],
  },
);

builder.register(
  dynamic(() => import("../../components/section").then((mod) => mod.Section)),
  {
    name: "section",
    friendlyName: "Sectie",
  },
);
