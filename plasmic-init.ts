/** @format */
import 'dotenv/config'
require('dotenv').config() 

import { ScrollProvider } from "./components/ScrollContext";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { registerReveal } from "./components/react-awesome-reveal";
import NextScript from "./components/NextScript";
import EcwidStoreDiv from "./components/EcwidStoreDiv";
import EcwidStore from "./components/EcwidStore";
import FeatherIcon from "./components/FeatherIcon";
import CustomHead from './components/CustomHead';
import FramerMotionComponent from './components/FramerMotionComponent';

const isDevelopment = process.env.NODE_ENV === 'development';
console.log("Plasmic preview mode:", isDevelopment);

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_TOKEN!,
    },
  ],
  preview: isDevelopment,
});

// Register reveal components
registerReveal(PLASMIC);

// Register ScrollProvider
PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
});

// Register EcwidStoreDiv
PLASMIC.registerComponent(EcwidStoreDiv, {
  name: "Ecwid Store Div",
  props: {
    className: "string",
    storeId: "string",
  },
});

// Register NextScript
PLASMIC.registerComponent(NextScript, {
  name: "NextScript",
  props: {
    src: "string",
  },
});

// Register FeatherIcon
PLASMIC.registerComponent(FeatherIcon, {
  name: "FeatherIcon",
  props: {
    name: 'string',
    color: 'string',
    size: 'string',
    strokeWidth: 'number',
  },
});

// Register CustomHead
PLASMIC.registerComponent(CustomHead, {
  name: "Head Inject",
  props: {
    mycodehere: {
      displayName: "Other Code",
      type: "code",
      lang: "html",
    },
    measurementId: {
      displayName: "Google Analytics ID",
      type: "string",
    },
  },
});

// Register FramerMotion
PLASMIC.registerComponent(FramerMotionComponent, {
  name: "Framer Motion",
  isAttachment: true,
  props: {
    className: "string",
    children: 'slot',
    duration: "number",
    bounce: "number",
    delay: "number",
    initialX: {
      displayName: "Initial X",
      type: "number",
    },
    initialY: {
      displayName: "Initial Y",
      type: "number",
    },
    initialRotate: {
      displayName: "Initial Rotation",
      type: "number",
    },
    initialOpacity: {
      displayName: "Initial Opacity",
      type: "number",
      control: "slider",
      min: 0,
      max: 1
    },
  },
});