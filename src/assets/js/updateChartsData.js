import { population } from "./data";
import { malesAndFemalesInfoItem, femalesInfoItem, malesInfoItem, noData } from './domVariables';

let females = population.reduce((acc, group) => acc + group.females, 0);
let males = population.reduce((acc, group) => acc + group.males, 0);
let total = males + females;

export function updateOuterChart(chart, item, items) {
    const oppositeItem = item.index===0 ? items[1] : items[0];
    const females = items[0]; 
    const males = items[1]; 
    let popByAge = [];
        // both females and males
    if(item.hidden && !oppositeItem.hidden) {
        popByAge = population.map(group => group.males + group.females);
        toggleInfobox('both');
    }  // no females no males
    else if(!item.hidden && oppositeItem.hidden) {
        popByAge = population.map(group => 0)
        toggleInfobox('none');
    } // only men or only women
    else {
        // only men
        if((item.text==='females' && !females.hidden) || (item.text==='males' && females.hidden) ) {
            popByAge = population.map(group => group.males)
            toggleInfobox('males');
        } 
        // only females
        else if((item.text==='males' && !males.hidden) || (item.text==='females' && males.hidden)) {
            popByAge = population.map(group => group.females)
            toggleInfobox('females');
        }
    }
    // update outer chart
    chart.data.datasets[0].data = [null, null,...popByAge];
    // toggleInfobox();
}
export function updateInnerChart(chart, item) {
    const trgItem = population[item.index - 2];
    console.log(trgItem) 
    if(!item.hidden) {
        females -= trgItem.females
        males -= trgItem.males
        total = total - trgItem.females - trgItem.males
    } 
    else {
        females += trgItem.females
        males += trgItem.males
        total = total + trgItem.females + trgItem.males
    }
    chart.data.datasets[1].data = [females, males]; 
    updateInfobox();       
}
function toggleInfobox(action) {
    if(action==='both') [malesAndFemalesInfoItem, femalesInfoItem, malesInfoItem].map(item => item.style.display='block');
    else if(action==='none') [malesAndFemalesInfoItem, femalesInfoItem, malesInfoItem].map(item => item.style.display='none');
    else if(action==='females') {
        femalesInfoItem.style.display='block';
        [malesAndFemalesInfoItem, malesInfoItem].map(item => item.style.display='none');
    } 
    else if(action==='males') {
        malesInfoItem.style.display='block';
        [malesAndFemalesInfoItem, femalesInfoItem].map(item => item.style.display='none');
    } 
    action==='none' ? noData.style.display='block' : noData.style.display='none';
}

function updateInfobox() {
    let formatter = new Intl.NumberFormat("de-De");
    malesAndFemalesInfoItem.querySelector('.value').textContent = formatter.format(total);
    femalesInfoItem.querySelector('.value').textContent = formatter.format(females);
    malesInfoItem.querySelector('.value').textContent = formatter.format(males);
}
updateInfobox();