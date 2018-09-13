var xlsx = require('node-xlsx');
var fs = require('fs');

var _ = process.argv.splice(2);

console.log('_one传入参数：',_[0]);
console.log('_two传入参数：',_[1]);

fs.mkdir(_[1], function(err) {
    if (err) {
        throw err;
    }
});

//读取文件内容
var obj = xlsx.parse(__dirname+'/'+_[0]);//配置excel文件的路径
for (var k = 0; k < obj.length; k++){
    var excelObj = obj[k].data;//excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
    console.log(excelObj);
    //一个sheet文档中的内容包含sheet表头 一个excelObj表示一个二维数组，excelObj[i]表示sheet文档中第i+1行的数据集（一行的数据也是数组形式，访问从索引0开始）
    var data = [];
    for(var i in excelObj){
        var arr=[];
        var value=excelObj[i];
        for(var j in value){
            arr.push(value[j]);
        }
        data.push("\n"+arr);
    }
    
    fs.writeFile(_[1] + "/" + obj[k].name + ".txt",data,{'flag':'a'}, function(err) {
        if (err) {
            throw err;
        }
    });
}



// var buffer = xlsx.build([
//     {
//         name:'日志分类(eqpt_device_type)',
//         data:data
//     }        
// ]);

//将文件内容插入新的文件中
// fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});