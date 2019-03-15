let schedule=require('node-schedule');
function f() {
    schedule.scheduleJob('*/1 * * * * *',()=>{
        let newDate=new Date().getHours();
        console.log('core 进入 定时任务 检测是否存在超时任务:'+newDate);
        if(newDate==8||newDate==19){
            console.log("准备执行任务")
        }else{
            console.log("不需要执行任务")
        }

    });


    
}


f();