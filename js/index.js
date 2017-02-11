function buildChart(info){
    // var elts = JSON.stringify(info["elts"]);
    // var keys = JSON.stringify(info["keys"]);
    var keys = info['keys'];
    var e = info['elts'];
    console.log(e);
    console.log([keys[0], e[keys[0]]]);
    var chart = c3.generate({
        data: {
            columns: [
                [keys[0]].concat(e[keys[0]]),
                [keys[1]].concat(e[keys[1]]),
                [keys[2]].concat(e[keys[2]]),
                [keys[3]].concat(e[keys[3]]),
                [keys[4]].concat(e[keys[4]]),
                [keys[5]].concat(e[keys[5]]),
                [keys[6]].concat(e[keys[6]]),
                [keys[7]].concat(e[keys[7]]),
                [keys[8]].concat(e[keys[8]]),
                [keys[9]].concat(e[keys[9]]),
                [keys[10]].concat(e[keys[10]]),
                [keys[11]].concat(e[keys[11]]),
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        }
    });
    
    // var chart = c3.generate({
    //     data: {
    //         columns: [
    //             ['data1', 30, 200, 100, 400, 150, 250],
    //             ['data2', 130, 100, 140, 200, 150, 50]
    //         ],
    //         type: 'bar'
    //     },
    //     bar: {
    //         width: {
    //             ratio: 0.5 // this makes bar width 50% of length between ticks
    //         }
    //         // or
    //         //width: 100 // this makes bar width 100px
    //     }
    // });

}

function loadData(){
    $.ajax({
        url: "../ajax.php", 
        data: {action: "test", weekDay: "Monday"},
        type: "post",
        dataType: "json",
        success: function(result){
            // console.log(result["keys"]);
            console.log(result["elts"]);
            // console.log(JSON.stringify(result["elts"]));
            buildChart(result);
        },
        error: function(){
            
        }
    });
}
    
$(document).ready(function(){
    // buildChart();
    loadData();
    
});