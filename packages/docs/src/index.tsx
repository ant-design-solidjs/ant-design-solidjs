import { Router } from "@solidjs/router"

/* @refresh reload */
import { render } from "solid-js/web"
import { routes } from "./router"

import "@ant-design-solidjs/core/themes/default.css"

const root = document.getElementById("root")

render(() => <Router>{routes}</Router>, root!)
