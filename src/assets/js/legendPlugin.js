import { updateInnerChart , updateOuterChart} from './updateChartsData';
import { colors } from "./colors";
import { outerChartLegend, innerChartLegend } from './domVariables';
/* generate inner chart legend item */
function createLabel(item) {
    const label = document.createElement("p");
    label.classList.add("legend-item-label");
    label.style.textDecoration = item.hidden ? "line-through" : "none";
    const text = document.createTextNode(item.text);
    label.appendChild(text);

    return label;
}
function insertLabelItem(li, el, label, legend) {
    li.appendChild(el);
    li.appendChild(label);
    legend.appendChild(li);
}
function hiddenElementStyle(el, label) {
    el.style.borderColor = colors.red;
    label.style.color = colors.red;
    el.style.setProperty("--hoverColor", colors.grayHover);
    label.style.setProperty("--hoverColor", colors.grayHover);
}
function visibleElementStyle(el, item, label) {
    el.style.borderColor = item.strokeStyle;
    el.style.setProperty("--hoverColor", colors.bgHover[item.index]);
    label.style.setProperty("--hoverColor", colors.grayHover);
}
function styleInnerLegendItem(li, item) {
    const label = createLabel(item);
    const icon = document.createElement("i");
    icon.classList.add("legend-item-icon");
    icon.classList.add("fa-solid");
    item.text === 'females' ? icon.classList.add('fa-person-dress') : icon.classList.add('fa-person');

    if (item.hidden) {
        icon.style.color = colors.red;
        hiddenElementStyle(icon, label)
    } else {
        visibleElementStyle(icon, item, label);
        item.index===0 ? icon.style.color = colors.bg[0] : icon.style.color = colors.bg[1];
    } 
    insertLabelItem(li, icon, label, innerChartLegend);
}
function styleOuterLegendItem(li, item) {
    const label = createLabel(item);

    const square = document.createElement("div");
    square.classList.add("legend-item-square");

    if (item.hidden) {
        hiddenElementStyle(square, label);
    } else {
        visibleElementStyle(square, item, label);
        square.style.background = item.fillStyle;
    }  
    insertLabelItem(li, square, label, outerChartLegend);
}

/* Creating chart legend */
export const legendPlugin = {
    afterUpdate(chart){
        const items = chart.options.plugins.legend.labels.generateLabels(chart);
        // Remove old legend items
        while (outerChartLegend.firstChild) {
            outerChartLegend.firstChild.remove();
        }
        while (innerChartLegend.firstChild) {
            innerChartLegend.firstChild.remove();
        }
        // Create new legend items
        items.map(item => { 
            const li = document.createElement("li");   
            item.text === 'females' || item.text === 'males' ? li.classList.add("legend-item-inner") : li.classList.add("legend-item-outer");
            li.onclick = (e) => {
                chart.toggleDataVisibility(item.index);
                if(item.index >= 2) updateInnerChart(chart, item);
                else updateOuterChart(chart, item, items);
                chart.update();
            }; 
            item.text === 'females' || item.text === 'males' ? styleInnerLegendItem(li, item) : styleOuterLegendItem(li, item);
        });
    }
}