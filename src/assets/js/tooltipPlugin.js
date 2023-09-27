export const tooltipPlugin = {
    callbacks: {
        title: (context) => context[0].label.toUpperCase(),
        labelPointStyle: function(context) {
            return {
                pointStyle: 'rectRounded'
            };
        }
    },
    cornerRadius:4,
    caretSize:6,
    boxWidth:23,
    boxHeight:23,
    usePointStyle: true,
    borderColor:'white',
    borderWidth:2,
    backgroundColor:'rgba(220, 242, 255, .93)',
    titleAlign: "center",
    titleFont: {
        size: 14,
        weight: "bold",
    },
    padding:11,
    titleColor: "white",
    bodyColor:"black",
    titleColor: "black",
    bodyFont: { 
        size: 14,
        weight: "bold",
    },
}