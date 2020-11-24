/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { wrapRootElement as wrap } from "./wrap-root-element"
import "./src/styles/global.scss"

/*-----------------------------------------
 ~~~~~ CSS ~~~~~
-----------------------------------------*/
// Code blocks
require("prismjs/themes/prism-twilight.css");
require("prismjs/plugins/command-line/prism-command-line.css");

/*-----------------------------------------
 ~~~~~ JS ~~~~~
-----------------------------------------*/
export const wrapRootElement = wrap