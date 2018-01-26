$(document).ready(function(){
    var oTable = null;
    var options  = {
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        }
    };
    $('#deviceTable tbody').on('click','.remove_btn',function(){
      oTable.row().remove($(this).parents('tr')).draw();
    })
    $.get('http://127.0.0.1:3000/get_facility',{}).done(function(res){
      var data = JSON.parse(res).data;
      for(var i=0;i<data.length;i++){
        var oTr = $('<tr></tr>');
        var html = `
          <td>${i+1}</td>
          <td>${data[i].TYPES}</td>
          <td>${data[i].LATITUDE}</td>
          <td>${data[i].LONGITUDE}</td>
          <td>${data[i].area}</td>
          <td></td>
          <td>${data[i].davingDepartment}</td>
          <td>${data[i].dataId}</td>
          <td>${data[i].facilityType}</td>
          <td>${data[i].GISNAME}</td>
          <td>${data[i].produceTime}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="javascript:;" class="edit_btn">修改</a></td>
          <td><a href="javascript:;" class="remove_btn">删除</a></td>
        `;
        oTr.html(html);
        oTr.appendTo($('#deviceTable tbody'));
      }
      oTable = $('#deviceTable').DataTable(options);
    });

});
