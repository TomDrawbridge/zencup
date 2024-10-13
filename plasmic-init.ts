/** @format */

import 'dotenv/config'
require('dotenv').config() 


import { ScrollProvider } from "./components/ScrollContext";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import NextScript from "./components/NextScript";
import { FormUpload } from "./components/uploadCare";



const isDevelopment = process.env.NODE_ENV === 'development';
console.log("Plasmic preview mode:", isDevelopment);

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_TOKEN!,
    },
  ],
 

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
   preview: isDevelopment,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host



PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
});


import EcwidStoreDiv from "./components/EcwidStoreDiv";

PLASMIC.registerComponent(EcwidStoreDiv, {
  name: "Ecwid Store Div",
  props: {
className: "string",
},
});

import EcwidStore from "./components/EcwidStore";

PLASMIC.registerComponent(EcwidStore, {
  name: "Ecwid Store",
  props: {
className: "string",
storeId: "string",
},
});


import FramerMotionComponent from './components/FramerMotionComponent'; 

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

import schemaArticle from './components/schema_article'; 

PLASMIC.registerComponent(schemaArticle, {
  name: "Article Schema/Markdown",
  props: {
      headline: 'string',
  image: 'string',
  authorType: 'string',
  authorName: 'string',
  publisherName: 'string',
  publisherLogoUrl: 'string',
  datePublished: 'string',
  },
});
