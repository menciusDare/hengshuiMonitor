/**
 * @author weizhuang 2020-08-27
 * html导出execl
 */
export default function htmlTableToExcel(tableID,fileName) {
    if(tableID){
        var table = document.getElementById(tableID);
        var excelContent = table.innerHTML;
        //添加边框线
        var reg = new RegExp('border="0"',"g")
        var excelContent1 = excelContent.replace(reg,'border="1"')
        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
        excelFile += "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name></x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
        excelFile += "<body>";
        excelFile += excelContent1;
        excelFile += "</body>";
        excelFile += "</html>";
        var link = "data:application/vnd.ms-excel;base64," + base64(excelFile);
        var a = document.createElement("a");
        a.download = fileName+new Date().format('yyyyMMddhhmmss')+'.xlsx'; //下载后文件名
        a.href = link;
        a.click();
    }else{
        // console.log("toExecl error");
    }
    function base64 (content) {
        return window.btoa(unescape(encodeURIComponent(content)));
    }
}
