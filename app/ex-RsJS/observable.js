import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/* 
const source$ = Observable.of(1, 2, 3);
source$.subscribe(console.log); */

exports.learn = function() {
    // pruduce data
    const onSubscribe = observer => {
        //observer.next(1);
        //observer.next(2);
        //observer.next(3);

        // 这个函数传递给Observable 用于生产数据以及通知订阅者处理数据
        // 特定于某个观察者的处理逻辑则定义在各自的next函数中
        let number = 1;
        const handle = setInterval(() => {
            observer.next(number++);
            //if(number > 3) {
            //clearInterval(handle);
                // 显式调用complete方法结束流数据
                // 调用error函数就是会进入出错状态，Observable对象终结了，后续调用不起作用了
            //observer.error('Internal Server Error.');
            //observer.complete();
            //}
        }, 1000);

        // 返回一个包含取消订阅函数的对象
        return {
            unsubscribe: () => {
                clearInterval(handle);
            }
        };
    };

    const source$ = new Observable(onSubscribe);
    const theObserver = {
        // consume data
        // observer必须有一个next函数 其他没什么特别
        // 观察者不关心数据是何时产生的
        next: item => console.log(item),
        // 如果不打算处理异常 可以使用null来占位
        error: err => console.log(err),
        complete: () => console.log("Stream stops here.")
    };
    // 调用subscribe就会触发对observer的操作 observer就会去拿数据执行一些任务
    const subscription = source$.subscribe(theObserver);

    setTimeout(() => {
        // 取消订阅后无论怎么调用next 都不会有数据输出了 因为observer已经与observable断开联系
        subscription.unsubscribe();
    }, 3500);

};