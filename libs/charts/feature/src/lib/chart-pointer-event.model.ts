import { Chart, ChartEvent } from "chart.js";

export type ChartPointerEvent = ChartEvent & {chart: Chart}
