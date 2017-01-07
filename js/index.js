function buildChart(info){
    var elts = JSON.stringify(info["elts"]);
    var keys = JSON.stringify(info["keys"]);
    
    var chart = c3.generate({
        data: {
            rows: elts,
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

}

function loadData(){
    $.ajax({
        url: "../ajax.php", 
        data: {action: "test"},
        type: "post",
        dataType: "json",
        success: function(result){
            console.log(result["keys"]);
            console.log(JSON.stringify(result["elts"]));
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