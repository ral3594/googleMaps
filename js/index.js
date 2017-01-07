function buildChart(){
    var chart = c3.generate({
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
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

}

function loadData(){
    $.ajax({
        url: "../ajax.php", 
        data: {action: "test"},
        type: "post",
        dataType: "json",
        success: function(result){
            alert(result);
        },
        error: function(){
            
        }
    });
}
    
$(document).ready(function(){
    buildChart();
    loadData();
    
});